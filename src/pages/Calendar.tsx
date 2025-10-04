import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar as CalendarIcon, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  type: 'exam' | 'function' | 'festival' | 'holiday' | 'other';
}

const Calendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Term 1 Opening',
      date: '2025-01-06',
      description: 'First day of Term 1, 2025',
      type: 'other',
    },
    {
      id: 2,
      title: 'Mid-Term Exams',
      date: '2025-02-10',
      description: 'Grade 4-9 mid-term assessments',
      type: 'exam',
    },
    {
      id: 3,
      title: 'Music Day',
      date: '2025-02-28',
      description: 'Annual music showcase and performances',
      type: 'festival',
    },
    {
      id: 4,
      title: 'Parents Day',
      date: '2025-03-15',
      description: 'Meeting with parents and academic review',
      type: 'function',
    },
    {
      id: 5,
      title: 'Sports Day',
      date: '2025-03-28',
      description: 'Inter-house sports competition',
      type: 'function',
    },
    {
      id: 6,
      title: 'Easter Break',
      date: '2025-04-18',
      description: 'School closes for Easter holidays',
      type: 'holiday',
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventTypeColor = (type: Event['type']) => {
    const colors = {
      exam: 'bg-destructive/10 text-destructive border-destructive',
      function: 'bg-primary/10 text-primary border-primary',
      festival: 'bg-accent/10 text-accent-foreground border-accent',
      holiday: 'bg-secondary/10 text-secondary border-secondary',
      other: 'bg-muted text-muted-foreground border-border',
    };
    return colors[type];
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddEvent = () => {
    toast({
      title: "Add Event Feature",
      description: "In production, this would save the event to the backend database.",
    });
    setIsAddEventOpen(false);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been removed from the calendar.",
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">School Calendar</h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with school events, exams, and activities
          </p>
        </div>

        {/* Month/Year Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-4 py-2 border rounded-md bg-background"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-4 py-2 border rounded-md bg-background"
            >
              {[2024, 2025, 2026].map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {user?.role === 'admin' && (
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event for the school calendar
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Enter event title" />
                  </div>
                  <div>
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="event-type">Event Type</Label>
                    <select id="event-type" className="w-full px-3 py-2 border rounded-md">
                      <option value="exam">Exam</option>
                      <option value="function">School Function</option>
                      <option value="festival">Festival</option>
                      <option value="holiday">Holiday</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="event-desc">Description</Label>
                    <Textarea id="event-desc" placeholder="Event description" />
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Events List */}
        <div className="max-w-4xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className={`border-l-4 ${getEventTypeColor(event.type)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                      {user?.role === 'admin' && (
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-muted">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No events scheduled for {months[selectedMonth]} {selectedYear}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Note: This is a demo calendar. In production, events would be stored in a backend database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
