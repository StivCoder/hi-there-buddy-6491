-- Create assignments table for teachers to upload assignments and notes
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  class_id UUID REFERENCES public.classes(class_id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  file_url TEXT,
  type TEXT NOT NULL DEFAULT 'assignment', -- 'assignment', 'notes', 'revision'
  due_date DATE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Everyone can view assignments
CREATE POLICY "Anyone can view assignments"
ON public.assignments
FOR SELECT
USING (true);

-- Teachers and admins can manage assignments
CREATE POLICY "Teachers and admins can insert assignments"
ON public.assignments
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers and admins can update assignments"
ON public.assignments
FOR UPDATE
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers and admins can delete assignments"
ON public.assignments
FOR DELETE
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for assignment files
INSERT INTO storage.buckets (id, name, public) VALUES ('assignments', 'assignments', true)
ON CONFLICT DO NOTHING;

-- Storage policies for assignments bucket
CREATE POLICY "Anyone can view assignment files"
ON storage.objects FOR SELECT
USING (bucket_id = 'assignments');

CREATE POLICY "Teachers can upload assignment files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'assignments' AND (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role)));

CREATE POLICY "Teachers can delete assignment files"
ON storage.objects FOR DELETE
USING (bucket_id = 'assignments' AND (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role)));