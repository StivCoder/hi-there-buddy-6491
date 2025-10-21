import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Heart, Users, BookOpen, Music, GraduationCap, UserCheck, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet';
const About = () => {
  const values = [{
    icon: Heart,
    title: 'Respect',
    color: 'text-red-500'
  }, {
    icon: Award,
    title: 'Integrity',
    color: 'text-blue-500'
  }, {
    icon: Users,
    title: 'Discipline',
    color: 'text-purple-500'
  }, {
    icon: BookOpen,
    title: 'Creativity',
    color: 'text-green-500'
  }, {
    icon: Target,
    title: 'Academic Excellence',
    color: 'text-orange-500'
  }, {
    icon: Heart,
    title: 'Compassion',
    color: 'text-pink-500'
  }, {
    icon: Users,
    title: 'Responsibility',
    color: 'text-indigo-500'
  }, {
    icon: Users,
    title: 'Teamwork',
    color: 'text-teal-500'
  }];
  const management = [{
    name: 'Dr. Sarah Kamau',
    position: 'School Director',
    bio: 'Over 20 years of experience in education leadership'
  }, {
    name: 'Mr. John Mwangi',
    position: 'Headteacher',
    bio: 'Dedicated to fostering academic excellence'
  }];
  const teachers = [{
    name: 'Mrs. Grace Wanjiru',
    subject: 'Mathematics & Sciences',
    grade: 'Grade 6-9'
  }, {
    name: 'Mr. David Kariuki',
    subject: 'Languages (English & Kiswahili)',
    grade: 'Grade 4-7'
  }, {
    name: 'Miss Lucy Njeri',
    subject: 'Creative Arts & Music',
    grade: 'All Grades'
  }, {
    name: 'Mrs. Anne Muthoni',
    subject: 'Early Childhood Education',
    grade: 'Playgroup - Grade 3'
  }, {
    name: 'Mr. Peter Githinji',
    subject: 'Physical Education',
    grade: 'All Grades'
  }, {
    name: 'Miss Faith Wambui',
    subject: 'Religious Studies & Social Studies',
    grade: 'Grade 4-9'
  }];
  const studentCouncil = [{
    name: 'Brian Kimani',
    position: 'Head Boy',
    grade: 'Grade 9'
  }, {
    name: 'Sharon Wairimu',
    position: 'Head Girl',
    grade: 'Grade 9'
  }, {
    name: 'Kevin Njoroge',
    position: 'Sports Captain',
    grade: 'Grade 8'
  }, {
    name: 'Mary Wangari',
    position: 'Music Captain',
    grade: 'Grade 8'
  }];
  return <div className="min-h-screen py-12">
      <Helmet>
        <title>About Albert School Kutus - Best School in Kirinyaga County | CBC Curriculum</title>
        <meta name="description" content="Learn about Albert School Kutus, the leading primary school in Kirinyaga County with over 1000 students and 60+ qualified teaching staff. Discover our mission, vision, and commitment to excellence in education." />
        <meta name="keywords" content="Albert School about, best school Kirinyaga, CBC curriculum Kenya, private school Kutus, quality education Kirinyaga County" />
      </Helmet>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">About Albert School Kutus</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Premier Learning Institution in Kirinyaga County - Where Excellence Meets Opportunity
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-scale-in">
          <Card className="text-center border-primary/20 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-muted-foreground">Active Students</p>
              <p className="text-sm text-muted-foreground mt-2">Thriving learning community</p>
            </CardContent>
          </Card>
          <Card className="text-center border-secondary/20 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-4xl font-bold text-secondary mb-2">60+</h3>
              <p className="text-muted-foreground">Teaching Staff</p>
              <p className="text-sm text-muted-foreground mt-2">Qualified & dedicated educators</p>
            </CardContent>
          </Card>
          <Card className="text-center border-accent/20 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-4xl font-bold text-accent mb-2">12+</h3>
              <p className="text-muted-foreground">Years of Excellence</p>
              <p className="text-sm text-muted-foreground mt-2">Proven track record</p>
            </CardContent>
          </Card>
        </div>

        {/* Headteacher's Message */}
        <Card className="mb-12 border-l-4 border-l-primary animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Quote className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl text-primary">Message from the Headteacher</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Mr. John Mwangi</h3>
                <p className="text-primary text-sm mb-4">Headteacher, Albert School Kutus</p>
                <div className="space-y-3 text-muted-foreground italic">
                  <p>
                    "Welcome to Albert School Kutus, where we believe that every child has the potential to achieve greatness. As the premier educational institution in Kirinyaga County, we are committed to nurturing not just academic excellence, but also character, creativity, and critical thinking skills."
                  </p>
                  <p>
                    "With over 1000 students and a dedicated team of more than 60 qualified teaching professionals, we have created a vibrant learning community that celebrates diversity, encourages innovation, and promotes holistic development. Our implementation of the Competency-Based Curriculum (CBC) ensures that our students are well-prepared for the challenges and opportunities of the 21st century."
                  </p>
                  <p>
                    "At Albert School, we don't just teach subjects—we shape futures. We are proud of our state-of-the-art facilities, our commitment to individualized attention, and our track record of producing well-rounded graduates who excel in academics, sports, music, and leadership."
                  </p>
                  <p>
                    "I invite you to join our growing family and experience the Albert School difference. Together, we will unlock your child's full potential."
                  </p>
                  <p className="font-semibold not-italic text-foreground mt-4">
                    Elimu ni Nguvu - Knowledge is Power
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* School Overview */}
        <Card className="mb-12 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Why Choose Albert School Kutus?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Albert School Kutus is recognized as the <strong className="text-foreground">best school in Kirinyaga County</strong>, offering exceptional primary education from Playgroup to Grade 9. Located strategically next to the County Government Headquarters in Kutus, our institution has become the preferred choice for families seeking quality education in Central Kenya.
            </p>
            <p className="leading-relaxed">
              With <strong className="text-foreground">over 1000 students</strong> and more than <strong className="text-foreground">60 highly qualified teaching professionals</strong>, Albert School has established itself as a center of educational excellence in Kirinyaga County. Our impressive student-teacher ratio ensures that every child receives personalized attention and support throughout their learning journey.
            </p>
            <p className="leading-relaxed">
              As pioneers in implementing the <strong className="text-foreground">Competency-Based Curriculum (CBC)</strong> in Kirinyaga, we go beyond traditional teaching methods. Our approach focuses on developing critical thinking, creativity, communication, and collaboration skills—preparing students not just for exams, but for life success.
            </p>
            <p className="leading-relaxed">
              Our state-of-the-art campus features modern classrooms, well-equipped science laboratories, extensive library resources, dedicated music rooms, spacious sports facilities, and digital learning centers. We provide a safe, nurturing, and stimulating environment where children can explore their interests, develop their talents, and build lasting friendships.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <Music className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Music & Arts Program</h3>
                  <p className="text-sm">Professional music education with dedicated facilities for all grade levels</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <BookOpen className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Digital Learning</h3>
                  <p className="text-sm">Modern technology integration with smart classrooms and digital resources</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Sports Excellence</h3>
                  <p className="text-sm">Comprehensive sports program developing physical fitness and teamwork</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg mt-6 border-l-4 border-l-primary">
              <h3 className="font-semibold text-foreground mb-3 text-lg">Our Commitment to Excellence</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Small class sizes ensuring individualized attention for every student</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Continuous professional development for all teaching staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Regular parent-teacher communication and progress updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Holistic approach addressing academic, social, emotional, and physical development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Safe and secure campus with 24/7 security and medical support</span>
                </li>
              </ul>
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
              <p className="text-2xl font-bold text-primary text-center py-4">'Elimu ni Nguvu'

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
              {values.map((value, index) => <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${value.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <p className="font-semibold text-sm">{value.title}</p>
                </div>)}
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
              {management.map((person, index) => <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-center mb-1">{person.name}</h3>
                  <p className="text-primary text-center mb-3">{person.position}</p>
                  <p className="text-sm text-muted-foreground text-center">{person.bio}</p>
                </div>)}
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
              {teachers.map((teacher, index) => <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-center mb-1">{teacher.name}</h3>
                  <p className="text-sm text-primary text-center mb-1">{teacher.subject}</p>
                  <p className="text-xs text-muted-foreground text-center">{teacher.grade}</p>
                </div>)}
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
              {studentCouncil.map((student, index) => <div key={index} className="text-center border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-1">{student.name}</h3>
                  <p className="text-sm text-primary mb-1">{student.position}</p>
                  <p className="text-xs text-muted-foreground">{student.grade}</p>
                </div>)}
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
    </div>;
};
export default About;