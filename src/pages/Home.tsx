import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Music } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'CBC Curriculum',
      description: 'Comprehensive Competency Based Curriculum from Playgroup to Grade 9',
    },
    {
      icon: Users,
      title: 'Qualified Teachers',
      description: 'Experienced and dedicated educators committed to excellence',
    },
    {
      icon: Award,
      title: 'Character Building',
      description: 'Holistic education focusing on values, integrity, and discipline',
    },
    {
      icon: Music,
      title: 'Talent Nurturing',
      description: 'Music rooms and programs for both Junior and Upper Primary',
    },
  ];

  const announcements = [
    {
      title: 'Term 1 2025 Registration Open',
      date: 'January 5, 2025',
      content: 'We are now accepting applications for Term 1, 2025. Visit our office or contact us for more information.',
    },
    {
      title: 'Annual Science Fair',
      date: 'December 15, 2024',
      content: 'Our students showcased amazing projects at the annual science fair. Congratulations to all participants!',
    },
    {
      title: 'Music Recital Success',
      date: 'November 20, 2024',
      content: 'The music department held a spectacular recital featuring performances from students across all grades.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Albert School, Kutus
            </h1>
            <p className="text-xl mb-2 opacity-95">Nurturing Talents, Building Character</p>
            <p className="text-lg mb-8 opacity-90">
              A leading center in Kirinyaga for holistic primary education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Why Choose Albert School?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become a leading centre in Kirinyaga for holistic primary education that nurtures every child's talents and character.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide a safe, inclusive, and stimulating learning environment where children from Playgroup to Grade 9 grow academically, socially, emotionally and physically under the CBC framework.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Latest News & Announcements</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {announcements.map((announcement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{announcement.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Albert School?</h2>
          <p className="text-lg mb-8 opacity-95">
            Enroll your child in a nurturing environment focused on excellence
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
