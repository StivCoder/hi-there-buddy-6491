import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  image_url: string | null;
}

export const HeroCarousel = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('id, title, image_url')
      .not('image_url', 'is', null)
      .limit(10);

    if (data) {
      setEvents(data);
    }
  };

  if (events.length === 0) {
    return (
      <section className="gradient-hero text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {children}
        </div>
      </section>
    );
  }

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={event.id}>
              <section className="relative text-primary-foreground py-24 md:py-32 overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 animate-[scale-in_0.8s_ease-out]">
                    <img
                      src={event.image_url || ''}
                      alt={event.title}
                      className="w-full h-full object-cover scale-110 animate-[zoom_20s_ease-in-out_infinite]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/80 to-primary/95"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_hsl(var(--secondary))_0%,_transparent_50%)] opacity-20"></div>
                </div>

                {/* Animated Decorative Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-glow rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,_#ffffff_1px,_transparent_1px),_linear-gradient(to_bottom,_#ffffff_1px,_transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10">
                  {children}
                </div>

                {/* Event Title Badge */}
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 shadow-gold">
                    <p className="text-white text-sm font-semibold">{event.title}</p>
                  </div>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                current === index 
                  ? "w-8 bg-secondary shadow-gold" 
                  : "w-2 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};
