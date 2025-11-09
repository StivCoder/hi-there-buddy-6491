-- Rename teachers table to staff
ALTER TABLE IF EXISTS public.teachers RENAME TO staff;

-- Rename the teacher_id column in results table to staff_id
ALTER TABLE IF EXISTS public.results RENAME COLUMN teacher_id TO staff_id;

-- Rename the assigned_class_id in staff table
-- (keeping this as is since it makes sense for staff)

-- Update any existing policies
DROP POLICY IF EXISTS "Teachers can manage results" ON public.results;
DROP POLICY IF EXISTS "Teachers can view students in their class" ON public.students;
DROP POLICY IF EXISTS "Admins can manage teachers" ON public.staff;
DROP POLICY IF EXISTS "Anyone can delete teachers" ON public.staff;
DROP POLICY IF EXISTS "Anyone can insert teachers" ON public.staff;
DROP POLICY IF EXISTS "Anyone can update teachers" ON public.staff;
DROP POLICY IF EXISTS "Everyone can view teachers" ON public.staff;
DROP POLICY IF EXISTS "Teachers can update their own data" ON public.staff;

-- Recreate policies with updated names
CREATE POLICY "Staff and admins can manage results"
ON public.results
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Staff can view students in their class"
ON public.students
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage staff"
ON public.staff
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view staff"
ON public.staff
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Staff can update their own data"
ON public.staff
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);