import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Gallery = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [images] = useState([
    { id: 1, title: 'Science Fair 2024', category: 'Events', url: '/placeholder.svg' },
    { id: 2, title: 'Music Recital', category: 'Music', url: '/placeholder.svg' },
    { id: 3, title: 'Sports Day', category: 'Sports', url: '/placeholder.svg' },
    { id: 4, title: 'Graduation Ceremony', category: 'Events', url: '/placeholder.svg' },
    { id: 5, title: 'Art Exhibition', category: 'Arts', url: '/placeholder.svg' },
    { id: 6, title: 'Field Trip', category: 'Academics', url: '/placeholder.svg' },
    { id: 7, title: 'School Assembly', category: 'Events', url: '/placeholder.svg' },
    { id: 8, title: 'Library Session', category: 'Academics', url: '/placeholder.svg' },
    { id: 9, title: 'Drama Performance', category: 'Arts', url: '/placeholder.svg' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Events', 'Music', 'Sports', 'Arts', 'Academics'];

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

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
            Capturing moments and memories at Alber School
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  <ImageIcon className="w-16 h-16 text-muted-foreground group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-primary">{image.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No images found in this category</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Note: This is a demo gallery. In production, images would be loaded from backend storage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
