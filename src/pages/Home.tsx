import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Music } from 'lucide-react';
import { HeroCarousel } from '@/components/HeroCarousel';

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
      {/* Hero Section with Carousel */}
      <HeroCarousel>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight">
              Albert School
            </h1>
            <p className="text-2xl md:text-3xl font-display mb-2 opacity-95">Kutus, Kirinyaga</p>
          </div>
          <p className="text-xl md:text-2xl mb-4 opacity-95 font-semibold">Nurturing Talents, Building Character</p>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            A leading center in Kirinyaga for holistic primary education from Playgroup to Grade 9
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/about">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 shadow-elegant hover:shadow-glow transition-all">
                Learn More About Us
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary transition-all">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </HeroCarousel>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-gradient">Why Choose Albert School?</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Excellence in education, character, and holistic development</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 group">
                <CardHeader>
                  <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-display">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-muted/20 relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-l-4 border-l-primary shadow-elegant hover:shadow-glow transition-all">
              <CardHeader>
                <CardTitle className="text-3xl font-display text-primary mb-2">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-lg leading-relaxed">
                  To become a leading centre in Kirinyaga for holistic primary education that nurtures every child's talents and character.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary shadow-elegant hover:shadow-glow transition-all">
              <CardHeader>
                <CardTitle className="text-3xl font-display text-secondary mb-2">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-lg leading-relaxed">
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
