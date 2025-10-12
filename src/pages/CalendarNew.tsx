import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

type EventType = 'exam' | 'function' | 'festival' | 'holiday' | 'other';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string | null;
  type: EventType;
  image_url: string | null;
  created_by: string | null;
}

const CalendarNew = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchEvents();
  }, [selectedMonth, selectedYear]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching events",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setEvents((data as Event[]) || []);
    }
  };

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case 'exam': return 'bg-destructive/10 text-destructive border-destructive';
      case 'function': return 'bg-primary/10 text-primary border-primary';
      case 'festival': return 'bg-accent/10 text-accent-foreground border-accent';
      case 'holiday': return 'bg-secondary/10 text-secondary border-secondary';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Image upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      return null;
    }

    const { data } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        setIsLoading(false);
        return;
      }
    }

    const { error } = await supabase
      .from('events')
      .insert([
        {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          date: formData.get('date') as string,
          type: formData.get('type') as EventType,
          image_url: imageUrl,
          created_by: null,
        },
      ]);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Failed to add event",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Event added successfully",
      });
      setIsDialogOpen(false);
      setImageFile(null);
      setImagePreview(null);
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Failed to delete event",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Event deleted",
        description: "The event has been removed",
      });
      fetchEvents();
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary flex items-center justify-center gap-2">
            <CalendarIcon className="w-10 h-10" />
            School Calendar
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with all school events and activities
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex gap-4">
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {[2024, 2025, 2026].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Event</Button>
            </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" name="title" required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="function">Function</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="holiday">Holiday</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image">Event Media (Image or Video - Optional)</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      imageFile?.type.startsWith('video/') ? (
                        <video src={imagePreview} controls className="mt-2 w-full h-40 rounded" />
                      ) : (
                        <img src={imagePreview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />
                      )
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Event'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className={`border-l-4 ${getEventTypeColor(event.type)}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.date), 'MMMM dd, yyyy')} • {event.type.toUpperCase()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              {(event.description || event.image_url) && (
                <CardContent>
                  {event.image_url && (
                    event.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        src={event.image_url}
                        controls
                        className="w-full h-48 rounded mb-4"
                      />
                    ) : (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    )
                  )}
                  {event.description && <p className="text-muted-foreground">{event.description}</p>}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No events scheduled for this month</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CalendarNew;
