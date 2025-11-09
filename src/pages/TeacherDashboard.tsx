import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, BookOpen, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  
  // Form state
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState<'term_1' | 'term_2' | 'term_3'>('term_1');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    checkAccess();
    fetchData();
  }, [user]);

  const checkAccess = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['teacher', 'admin']);

    if (!roles || roles.length === 0) {
      toast({
        title: 'Access Denied',
        description: 'You need teacher or admin access to view this page',
        variant: 'destructive',
      });
      navigate('/');
    }
  };

  const fetchData = async () => {
    try {
      const [studentsRes, classesRes] = await Promise.all([
        supabase.from('students').select('*, parents(full_name)'),
        supabase.from('classes').select('*'),
      ]);

      if (studentsRes.data) setStudents(studentsRes.data);
      if (classesRes.data) setClasses(classesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmitResult = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !subject || !marks || !grade) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const marksNum = parseInt(marks);
    if (marksNum < 0 || marksNum > 100) {
      toast({
        title: 'Error',
        description: 'Marks must be between 0 and 100',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('manage-results', {
        body: {
          action: 'create',
          result: {
            student_id: selectedStudent,
            teacher_id: user?.id,
            subject,
            marks: marksNum,
            grade,
            term,
            year: parseInt(year),
            remarks,
          },
        },
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Result uploaded successfully',
      });

      // Reset form
      setSelectedStudent('');
      setSubject('');
      setMarks('');
      setGrade('');
      setRemarks('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload result',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Upload and manage student results</p>
        </div>

        <div className="grid gap-6 mb-8">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{students.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{classes.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Term</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold capitalize">{term.replace('_', ' ')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Results Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Upload className="w-6 h-6" />
                Upload Student Results
              </CardTitle>
              <CardDescription>Enter student exam or test results</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitResult} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Student *</Label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.student_id} value={student.student_id}>
                            {student.full_name} - {student.admission_number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Mathematics"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marks">Marks (0-100) *</Label>
                    <Input
                      id="marks"
                      type="number"
                      min="0"
                      max="100"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      placeholder="85"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade *</Label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A (80-100)</SelectItem>
                        <SelectItem value="B">B (70-79)</SelectItem>
                        <SelectItem value="C">C (60-69)</SelectItem>
                        <SelectItem value="D">D (50-59)</SelectItem>
                        <SelectItem value="E">E (0-49)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="term">Term *</Label>
                    <Select value={term} onValueChange={(val) => setTerm(val as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term_1">Term 1</SelectItem>
                        <SelectItem value="term_2">Term 2</SelectItem>
                        <SelectItem value="term_3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    min="2020"
                    max="2030"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks (Optional)</Label>
                  <Textarea
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Teacher's comments on student performance..."
                    rows={3}
                  />
                </div>

                <Alert>
                  <AlertDescription>
                    All fields marked with * are required. Results will be visible to parents through the parent portal.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Uploading...' : 'Upload Result'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
