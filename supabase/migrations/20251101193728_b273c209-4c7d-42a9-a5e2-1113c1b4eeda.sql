-- Create table for site-wide settings and statistics
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_type TEXT NOT NULL DEFAULT 'text',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for features
CREATE TABLE IF NOT EXISTS public.features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for announcements
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for core values
CREATE TABLE IF NOT EXISTS public.core_values (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color_class TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for management team
CREATE TABLE IF NOT EXISTS public.management_team (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for teachers
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for student council
CREATE TABLE IF NOT EXISTS public.student_council (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  grade TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for classes offered
CREATE TABLE IF NOT EXISTS public.classes_offered (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for hero content
CREATE TABLE IF NOT EXISTS public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_primary_text TEXT,
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.management_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_council ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes_offered ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view features" ON public.features FOR SELECT USING (true);
CREATE POLICY "Anyone can view announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Anyone can view core_values" ON public.core_values FOR SELECT USING (true);
CREATE POLICY "Anyone can view management_team" ON public.management_team FOR SELECT USING (true);
CREATE POLICY "Anyone can view teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Anyone can view student_council" ON public.student_council FOR SELECT USING (true);
CREATE POLICY "Anyone can view classes_offered" ON public.classes_offered FOR SELECT USING (true);
CREATE POLICY "Anyone can view hero_content" ON public.hero_content FOR SELECT USING (true);

-- Create policies for admin management (anyone can manage for now)
CREATE POLICY "Anyone can insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update site_settings" ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete site_settings" ON public.site_settings FOR DELETE USING (true);

CREATE POLICY "Anyone can insert features" ON public.features FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update features" ON public.features FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete features" ON public.features FOR DELETE USING (true);

CREATE POLICY "Anyone can insert announcements" ON public.announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update announcements" ON public.announcements FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete announcements" ON public.announcements FOR DELETE USING (true);

CREATE POLICY "Anyone can insert core_values" ON public.core_values FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update core_values" ON public.core_values FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete core_values" ON public.core_values FOR DELETE USING (true);

CREATE POLICY "Anyone can insert management_team" ON public.management_team FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update management_team" ON public.management_team FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete management_team" ON public.management_team FOR DELETE USING (true);

CREATE POLICY "Anyone can insert teachers" ON public.teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update teachers" ON public.teachers FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete teachers" ON public.teachers FOR DELETE USING (true);

CREATE POLICY "Anyone can insert student_council" ON public.student_council FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update student_council" ON public.student_council FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete student_council" ON public.student_council FOR DELETE USING (true);

CREATE POLICY "Anyone can insert classes_offered" ON public.classes_offered FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update classes_offered" ON public.classes_offered FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete classes_offered" ON public.classes_offered FOR DELETE USING (true);

CREATE POLICY "Anyone can insert hero_content" ON public.hero_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update hero_content" ON public.hero_content FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete hero_content" ON public.hero_content FOR DELETE USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON public.features FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_core_values_updated_at BEFORE UPDATE ON public.core_values FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_management_team_updated_at BEFORE UPDATE ON public.management_team FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_council_updated_at BEFORE UPDATE ON public.student_council FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_classes_offered_updated_at BEFORE UPDATE ON public.classes_offered FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.site_settings (setting_key, setting_value, setting_type) VALUES
  ('school_name', 'Albert School Kutus', 'text'),
  ('student_count', '1000', 'number'),
  ('teacher_count', '60', 'number'),
  ('years_excellence', '12', 'number'),
  ('school_phone', '+254 720 720 659', 'text'),
  ('school_email', 'info@alberschool.ac.ke', 'text'),
  ('school_address', 'Next to County Government HQ, Kutus, Kirinyaga County, Kenya', 'text'),
  ('headteacher_name', 'Mr. John Mwangi', 'text'),
  ('headteacher_message', 'Welcome to Albert School Kutus, where we believe that every child has the potential to achieve greatness...', 'textarea');

INSERT INTO public.hero_content (title, subtitle, description, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, is_active) VALUES
  ('Albert School Kutus', 'Best School in Kirinyaga County', 'Leading private school in Kutus, Kirinyaga offering premium CBC curriculum education from Playgroup to Grade 9. Join the best educational institution in Kirinyaga County for quality primary education.', 'Learn More About Us', '/about', 'Get in Touch', '/contact', true);

INSERT INTO public.features (title, description, icon_name, display_order) VALUES
  ('CBC Curriculum', 'Comprehensive Competency Based Curriculum from Playgroup to Grade 9', 'BookOpen', 1),
  ('Qualified Teachers', 'Experienced and dedicated educators committed to excellence', 'Users', 2),
  ('Character Building', 'Holistic education focusing on values, integrity, and discipline', 'Award', 3),
  ('Talent Nurturing', 'Music rooms and programs for both Junior and Upper Primary', 'Music', 4);

INSERT INTO public.announcements (title, content, date, display_order) VALUES
  ('Term 1 2025 Registration Open', 'We are now accepting applications for Term 1, 2025. Visit our office or contact us for more information.', '2025-01-05', 1),
  ('Annual Science Fair', 'Our students showcased amazing projects at the annual science fair. Congratulations to all participants!', '2024-12-15', 2),
  ('Music Recital Success', 'The music department held a spectacular recital featuring performances from students across all grades.', '2024-11-20', 3);