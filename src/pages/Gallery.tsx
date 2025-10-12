import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  type: string;
  image_url: string | null;
}

const Gallery = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'exam', 'function', 'festival', 'holiday', 'other'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.type === selectedCategory);

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "In production, this would open a file upload dialog and save to backend storage.",
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">School Gallery</h1>
          <p className="text-xl text-muted-foreground">
            Capturing moments and memories at Albert School
          </p>
        </div>

        {/* Upload Button (Admin Only) */}
        {user?.role === 'admin' && (
          <div className="mb-8 flex justify-end">
            <Button onClick={handleUpload} className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Images
            </Button>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                      {event.image_url ? (
                        event.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                          <video 
                            src={event.image_url} 
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img 
                            src={event.image_url} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        )
                      ) : (
                        <ImageIcon className="w-16 h-16 text-muted-foreground group-hover:scale-110 transition-transform" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                      <p className="text-sm text-primary capitalize">{event.type}</p>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No images found in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
