-- Create enum for user roles (if not exists)
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'parent', 'student');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for admission status
DO $$ BEGIN
  CREATE TYPE public.admission_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for terms
DO $$ BEGIN
  CREATE TYPE public.term_type AS ENUM ('term_1', 'term_2', 'term_3');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create classes table (if not exists)
CREATE TABLE IF NOT EXISTS public.classes (
  class_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name TEXT NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table for RBAC
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create parents table
CREATE TABLE IF NOT EXISTS public.parents (
  parent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
  student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  class_id UUID REFERENCES public.classes(class_id) ON DELETE SET NULL,
  parent_id UUID REFERENCES public.parents(parent_id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add user_id and assigned_class_id to teachers table if they don't exist
DO $$ 
BEGIN
  ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE;
  ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS assigned_class_id UUID REFERENCES public.classes(class_id) ON DELETE SET NULL;
  ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS email TEXT;
  ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
  ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

-- Make email unique in teachers
DO $$
BEGIN
  ALTER TABLE public.teachers ADD CONSTRAINT teachers_email_key UNIQUE (email);
EXCEPTION
  WHEN duplicate_table THEN null;
END $$;

-- Create results table
CREATE TABLE IF NOT EXISTS public.results (
  result_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(student_id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID,
  subject TEXT NOT NULL,
  marks INTEGER NOT NULL CHECK (marks >= 0 AND marks <= 100),
  grade TEXT NOT NULL,
  term term_type NOT NULL,
  year INTEGER NOT NULL,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admissions table
CREATE TABLE IF NOT EXISTS public.admissions (
  application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  address TEXT,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  class_applied TEXT NOT NULL,
  documents_url TEXT,
  status admission_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create OTP logins table
CREATE TABLE IF NOT EXISTS public.otp_logins (
  otp_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  otp_code_hash TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  attempt_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Everyone can view classes" ON public.classes;
  DROP POLICY IF EXISTS "Only admins can manage classes" ON public.classes;
  DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
  DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
  DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
  DROP POLICY IF EXISTS "Parents can view their own data" ON public.parents;
  DROP POLICY IF EXISTS "Admins can manage parents" ON public.parents;
  DROP POLICY IF EXISTS "Parents can view their own children" ON public.students;
  DROP POLICY IF EXISTS "Teachers can view students in their class" ON public.students;
  DROP POLICY IF EXISTS "Admins can manage students" ON public.students;
  DROP POLICY IF EXISTS "Anyone can view teachers" ON public.teachers;
  DROP POLICY IF EXISTS "Everyone can view teachers" ON public.teachers;
  DROP POLICY IF EXISTS "Teachers can update their own data" ON public.teachers;
  DROP POLICY IF EXISTS "Admins can manage teachers" ON public.teachers;
  DROP POLICY IF EXISTS "Parents can view their children's results" ON public.results;
  DROP POLICY IF EXISTS "Teachers can manage results" ON public.results;
  DROP POLICY IF EXISTS "Anyone can submit admissions" ON public.admissions;
  DROP POLICY IF EXISTS "Admins can view and manage admissions" ON public.admissions;
  DROP POLICY IF EXISTS "Service role can manage OTP" ON public.otp_logins;
  DROP POLICY IF EXISTS "Only admins can view audit logs" ON public.audit_logs;
END $$;

-- RLS Policies for classes
CREATE POLICY "Everyone can view classes"
  ON public.classes FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage classes"
  ON public.classes FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for parents
CREATE POLICY "Parents can view their own data"
  ON public.parents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage parents"
  ON public.parents FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for students
CREATE POLICY "Parents can view their own children"
  ON public.students FOR SELECT
  USING (
    parent_id IN (
      SELECT parent_id FROM public.parents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view students in their class"
  ON public.students FOR SELECT
  USING (
    public.has_role(auth.uid(), 'teacher') OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can manage students"
  ON public.students FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for teachers
CREATE POLICY "Everyone can view teachers"
  ON public.teachers FOR SELECT
  USING (true);

CREATE POLICY "Teachers can update their own data"
  ON public.teachers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage teachers"
  ON public.teachers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for results
CREATE POLICY "Parents can view their children's results"
  ON public.results FOR SELECT
  USING (
    student_id IN (
      SELECT student_id FROM public.students 
      WHERE parent_id IN (
        SELECT parent_id FROM public.parents WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Teachers can manage results"
  ON public.results FOR ALL
  USING (
    public.has_role(auth.uid(), 'teacher') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for admissions
CREATE POLICY "Anyone can submit admissions"
  ON public.admissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage admissions"
  ON public.admissions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for OTP logins
CREATE POLICY "Service role can manage OTP"
  ON public.otp_logins FOR ALL
  USING (true);

-- RLS Policies for audit logs
CREATE POLICY "Only admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_parents_phone ON public.parents(phone_number);
CREATE INDEX IF NOT EXISTS idx_students_admission ON public.students(admission_number);
CREATE INDEX IF NOT EXISTS idx_students_parent ON public.students(parent_id);
CREATE INDEX IF NOT EXISTS idx_results_student ON public.results(student_id);
CREATE INDEX IF NOT EXISTS idx_otp_phone ON public.otp_logins(phone_number);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON public.otp_logins(expires_at);

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_classes_updated_at ON public.classes;
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_parents_updated_at ON public.parents;
CREATE TRIGGER update_parents_updated_at
  BEFORE UPDATE ON public.parents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_students_updated_at ON public.students;
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON public.teachers;
CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_results_updated_at ON public.results;
CREATE TRIGGER update_results_updated_at
  BEFORE UPDATE ON public.results
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_admissions_updated_at ON public.admissions;
CREATE TRIGGER update_admissions_updated_at
  BEFORE UPDATE ON public.admissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();