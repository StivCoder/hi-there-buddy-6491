-- Drop overly permissive policies on events
DROP POLICY IF EXISTS "Anyone can insert events" ON events;
DROP POLICY IF EXISTS "Anyone can update events" ON events;
DROP POLICY IF EXISTS "Anyone can delete events" ON events;

-- Drop overly permissive policies on announcements
DROP POLICY IF EXISTS "Anyone can insert announcements" ON announcements;
DROP POLICY IF EXISTS "Anyone can update announcements" ON announcements;
DROP POLICY IF EXISTS "Anyone can delete announcements" ON announcements;

-- Drop overly permissive policies on site_settings
DROP POLICY IF EXISTS "Anyone can insert site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can delete site_settings" ON site_settings;

-- Drop overly permissive policies on features
DROP POLICY IF EXISTS "Anyone can insert features" ON features;
DROP POLICY IF EXISTS "Anyone can update features" ON features;
DROP POLICY IF EXISTS "Anyone can delete features" ON features;

-- Drop overly permissive policies on core_values
DROP POLICY IF EXISTS "Anyone can insert core_values" ON core_values;
DROP POLICY IF EXISTS "Anyone can update core_values" ON core_values;
DROP POLICY IF EXISTS "Anyone can delete core_values" ON core_values;

-- Drop overly permissive policies on management_team
DROP POLICY IF EXISTS "Anyone can insert management_team" ON management_team;
DROP POLICY IF EXISTS "Anyone can update management_team" ON management_team;
DROP POLICY IF EXISTS "Anyone can delete management_team" ON management_team;

-- Drop overly permissive policies on student_council
DROP POLICY IF EXISTS "Anyone can insert student_council" ON student_council;
DROP POLICY IF EXISTS "Anyone can update student_council" ON student_council;
DROP POLICY IF EXISTS "Anyone can delete student_council" ON student_council;

-- Drop overly permissive policies on classes_offered
DROP POLICY IF EXISTS "Anyone can insert classes_offered" ON classes_offered;
DROP POLICY IF EXISTS "Anyone can update classes_offered" ON classes_offered;
DROP POLICY IF EXISTS "Anyone can delete classes_offered" ON classes_offered;

-- Drop overly permissive policies on hero_content
DROP POLICY IF EXISTS "Anyone can insert hero_content" ON hero_content;
DROP POLICY IF EXISTS "Anyone can update hero_content" ON hero_content;
DROP POLICY IF EXISTS "Anyone can delete hero_content" ON hero_content;

-- Create admin-only write policies for events
CREATE POLICY "Only admins can insert events" ON events FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update events" ON events FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete events" ON events FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for announcements
CREATE POLICY "Only admins can insert announcements" ON announcements FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update announcements" ON announcements FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete announcements" ON announcements FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for site_settings
CREATE POLICY "Only admins can insert site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update site_settings" ON site_settings FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete site_settings" ON site_settings FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for features
CREATE POLICY "Only admins can insert features" ON features FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update features" ON features FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete features" ON features FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for core_values
CREATE POLICY "Only admins can insert core_values" ON core_values FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update core_values" ON core_values FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete core_values" ON core_values FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for management_team
CREATE POLICY "Only admins can insert management_team" ON management_team FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update management_team" ON management_team FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete management_team" ON management_team FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for student_council
CREATE POLICY "Only admins can insert student_council" ON student_council FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update student_council" ON student_council FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete student_council" ON student_council FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for classes_offered
CREATE POLICY "Only admins can insert classes_offered" ON classes_offered FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update classes_offered" ON classes_offered FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete classes_offered" ON classes_offered FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create admin-only write policies for hero_content
CREATE POLICY "Only admins can insert hero_content" ON hero_content FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update hero_content" ON hero_content FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete hero_content" ON hero_content FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));