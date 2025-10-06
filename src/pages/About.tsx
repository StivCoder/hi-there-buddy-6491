import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Heart, Users, BookOpen, Music } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Heart, title: 'Respect', color: 'text-red-500' },
    { icon: Award, title: 'Integrity', color: 'text-blue-500' },
    { icon: Users, title: 'Discipline', color: 'text-purple-500' },
    { icon: BookOpen, title: 'Creativity', color: 'text-green-500' },
    { icon: Target, title: 'Academic Excellence', color: 'text-orange-500' },
    { icon: Heart, title: 'Compassion', color: 'text-pink-500' },
    { icon: Users, title: 'Responsibility', color: 'text-indigo-500' },
    { icon: Users, title: 'Teamwork', color: 'text-teal-500' },
  ];

  const management = [
    { name: 'Dr. Sarah Kamau', position: 'School Director', bio: 'Over 20 years of experience in education leadership' },
    { name: 'Mr. John Mwangi', position: 'Headteacher', bio: 'Dedicated to fostering academic excellence' },
  ];

  const teachers = [
    { name: 'Mrs. Grace Wanjiru', subject: 'Mathematics & Sciences', grade: 'Grade 6-9' },
    { name: 'Mr. David Kariuki', subject: 'Languages (English & Kiswahili)', grade: 'Grade 4-7' },
    { name: 'Miss Lucy Njeri', subject: 'Creative Arts & Music', grade: 'All Grades' },
    { name: 'Mrs. Anne Muthoni', subject: 'Early Childhood Education', grade: 'Playgroup - Grade 3' },
    { name: 'Mr. Peter Githinji', subject: 'Physical Education', grade: 'All Grades' },
    { name: 'Miss Faith Wambui', subject: 'Religious Studies & Social Studies', grade: 'Grade 4-9' },
  ];

  const studentCouncil = [
    { name: 'Brian Kimani', position: 'Head Boy', grade: 'Grade 9' },
    { name: 'Sharon Wairimu', position: 'Head Girl', grade: 'Grade 9' },
    { name: 'Kevin Njoroge', position: 'Sports Captain', grade: 'Grade 8' },
    { name: 'Mary Wangari', position: 'Music Captain', grade: 'Grade 8' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">About Albert School</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A leading centre in Kirinyaga for holistic primary education
          </p>
        </div>

        {/* School Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Our School</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Albert School is a distinguished private day school located in Kutus, next to the County Government Headquarters in Kirinyaga County, Kenya. Since our establishment, we have been committed to providing quality education from Playgroup to Grade 9 under the Competency Based Curriculum (CBC).
            </p>
            <p>
              Our school is designed to nurture the whole child—academically, socially, emotionally, and physically. We believe in creating a safe, inclusive, and stimulating environment where every student can discover and develop their unique talents.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg">
                <Music className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Music Education</h3>
                  <p className="text-sm">Dedicated music rooms for both Junior and Upper Primary students</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Digital Learning</h3>
                  <p className="text-sm">Modern digital learning tools and resources</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision, Mission, Motto */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become a leading centre in Kirinyaga for holistic primary education that nurtures every child's talents and character.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-secondary">
            <CardHeader>
              <CardTitle className="text-xl text-secondary">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide a safe, inclusive, and stimulating learning environment where children from Playgroup to Grade 9 grow academically, socially, emotionally and physically under the CBC framework.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-accent">
            <CardHeader>
              <CardTitle className="text-xl text-accent-foreground">Motto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary text-center py-4">
                "Nurturing Talents, Building Character"
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary text-center">Our Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${value.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <p className="font-semibold text-sm">{value.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Management */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">School Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {management.map((person, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-center mb-1">{person.name}</h3>
                  <p className="text-primary text-center mb-3">{person.position}</p>
                  <p className="text-sm text-muted-foreground text-center">{person.bio}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teachers */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Our Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {teachers.map((teacher, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-center mb-1">{teacher.name}</h3>
                  <p className="text-sm text-primary text-center mb-1">{teacher.subject}</p>
                  <p className="text-xs text-muted-foreground text-center">{teacher.grade}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Council */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Student Council</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {studentCouncil.map((student, index) => (
                <div key={index} className="text-center border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-1">{student.name}</h3>
                  <p className="text-sm text-primary mb-1">{student.position}</p>
                  <p className="text-xs text-muted-foreground">{student.grade}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Classes Offered */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Classes Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-primary">Early Years</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Playgroup</li>
                  <li>• Pre-Primary 1 (PP1)</li>
                  <li>• Pre-Primary 2 (PP2)</li>
                </ul>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-secondary">Lower Primary</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Grade 1</li>
                  <li>• Grade 2</li>
                  <li>• Grade 3</li>
                </ul>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-primary">Upper Primary</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Grade 4</li>
                  <li>• Grade 5</li>
                  <li>• Grade 6</li>
                </ul>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-secondary">Junior Secondary</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Grade 7</li>
                  <li>• Grade 8</li>
                  <li>• Grade 9</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
