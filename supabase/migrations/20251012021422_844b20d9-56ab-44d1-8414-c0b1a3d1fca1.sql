-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;
DROP POLICY IF EXISTS "Users can update their own events" ON public.events;

-- Create new public policies
CREATE POLICY "Anyone can insert events"
ON public.events
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can delete events"
ON public.events
FOR DELETE
TO public
USING (true);

CREATE POLICY "Anyone can update events"
ON public.events
FOR UPDATE
TO public
USING (true);

-- Update storage policies for event-images bucket to be public
DROP POLICY IF EXISTS "Authenticated users can upload event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete event images" ON storage.objects;

CREATE POLICY "Anyone can upload event images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Anyone can update event images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'event-images');

CREATE POLICY "Anyone can delete event images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'event-images');