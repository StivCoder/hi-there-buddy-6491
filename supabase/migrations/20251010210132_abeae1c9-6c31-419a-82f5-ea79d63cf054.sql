-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('exam', 'function', 'festival', 'holiday', 'other')),
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read events
CREATE POLICY "Anyone can view events"
  ON public.events
  FOR SELECT
  USING (true);

-- Only authenticated users can insert events
CREATE POLICY "Authenticated users can insert events"
  ON public.events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Users can update their own events
CREATE POLICY "Users can update their own events"
  ON public.events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Users can delete their own events
CREATE POLICY "Users can delete their own events"
  ON public.events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Storage policies for event images
CREATE POLICY "Anyone can view event images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated users can upload event images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Users can update event images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-images');

CREATE POLICY "Users can delete event images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-images');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();