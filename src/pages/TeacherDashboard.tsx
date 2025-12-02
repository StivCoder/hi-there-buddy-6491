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
import { Upload, BookOpen, Users, FileText, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  
  // Results Form state
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState<'term_1' | 'term_2' | 'term_3'>('term_1');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [remarks, setRemarks] = useState('');

  // Assignment Form state
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentSubject, setAssignmentSubject] = useState('');
  const [assignmentType, setAssignmentType] = useState<'assignment' | 'notes' | 'revision'>('assignment');
  const [assignmentClass, setAssignmentClass] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);

  useEffect(() => {
    checkAccess();
  }, [user]);

  useEffect(() => {
    if (hasAccess) {
      fetchData();
    }
  }, [hasAccess]);

  const checkAccess = async () => {
    if (!user) {
      navigate('/portal/staff-login');
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
      return;
    }

    setHasAccess(true);
  };

  const fetchData = async () => {
    try {
      const [studentsRes, classesRes, assignmentsRes] = await Promise.all([
        supabase.from('students').select('*, parents(full_name)'),
        supabase.from('classes').select('*'),
        supabase.from('assignments').select('*, classes(class_name)').order('created_at', { ascending: false }),
      ]);

      if (studentsRes.data) setStudents(studentsRes.data);
      if (classesRes.data) setClasses(classesRes.data);
      if (assignmentsRes.data) setAssignments(assignmentsRes.data);
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
            staff_id: user?.id,
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

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignmentTitle || !assignmentSubject) {
      toast({
        title: 'Error',
        description: 'Please fill in title and subject',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      let fileUrl = null;

      // Upload file if provided
      if (assignmentFile) {
        const fileExt = assignmentFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('assignments')
          .upload(fileName, assignmentFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('assignments')
          .getPublicUrl(fileName);
        
        fileUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from('assignments').insert({
        title: assignmentTitle,
        description: assignmentDescription || null,
        subject: assignmentSubject,
        type: assignmentType,
        class_id: assignmentClass || null,
        due_date: assignmentDueDate || null,
        file_url: fileUrl,
        created_by: user?.id,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `${assignmentType === 'assignment' ? 'Assignment' : assignmentType === 'notes' ? 'Notes' : 'Revision material'} uploaded successfully`,
      });

      // Reset form
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentSubject('');
      setAssignmentClass('');
      setAssignmentDueDate('');
      setAssignmentFile(null);
      
      // Refresh assignments list
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    try {
      const { error } = await supabase.from('assignments').delete().eq('id', id);
      if (error) throw error;
      
      toast({
        title: 'Deleted',
        description: 'Item deleted successfully',
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete',
        variant: 'destructive',
      });
    }
  };

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Upload results, assignments, and learning materials</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">{assignments.filter(a => a.type === 'assignment').length}</span>
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

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Upload Results</TabsTrigger>
            <TabsTrigger value="assignments">Assignments & Notes</TabsTrigger>
            <TabsTrigger value="view">View Uploads</TabsTrigger>
          </TabsList>

          {/* Results Tab */}
          <TabsContent value="results">
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
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                  <Plus className="w-6 h-6" />
                  Upload Assignments & Notes
                </CardTitle>
                <CardDescription>Share assignments, notes, and revision materials with students</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitAssignment} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignmentTitle">Title *</Label>
                      <Input
                        id="assignmentTitle"
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                        placeholder="e.g., Week 5 Math Assignment"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignmentType">Type *</Label>
                      <Select value={assignmentType} onValueChange={(val) => setAssignmentType(val as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="notes">Class Notes</SelectItem>
                          <SelectItem value="revision">Revision Material</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignmentSubject">Subject *</Label>
                      <Input
                        id="assignmentSubject"
                        value={assignmentSubject}
                        onChange={(e) => setAssignmentSubject(e.target.value)}
                        placeholder="e.g., Mathematics"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignmentClass">Class (Optional)</Label>
                      <Select value={assignmentClass} onValueChange={setAssignmentClass}>
                        <SelectTrigger>
                          <SelectValue placeholder="All classes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Classes</SelectItem>
                          {classes.map((cls) => (
                            <SelectItem key={cls.class_id} value={cls.class_id}>
                              {cls.class_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {assignmentType === 'assignment' && (
                    <div className="space-y-2">
                      <Label htmlFor="assignmentDueDate">Due Date</Label>
                      <Input
                        id="assignmentDueDate"
                        type="date"
                        value={assignmentDueDate}
                        onChange={(e) => setAssignmentDueDate(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="assignmentDescription">Description</Label>
                    <Textarea
                      id="assignmentDescription"
                      value={assignmentDescription}
                      onChange={(e) => setAssignmentDescription(e.target.value)}
                      placeholder="Brief description or instructions..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignmentFile">Attach File (PDF, DOC, etc.)</Label>
                    <Input
                      id="assignmentFile"
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                      onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                    />
                    {assignmentFile && (
                      <p className="text-sm text-muted-foreground">Selected: {assignmentFile.name}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* View Uploads Tab */}
          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Uploaded Materials
                </CardTitle>
                <CardDescription>View and manage your uploaded assignments and notes</CardDescription>
              </CardHeader>
              <CardContent>
                {assignments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No materials uploaded yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignments.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell className="capitalize">{item.type}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.classes?.class_name || 'All'}</TableCell>
                          <TableCell>{item.due_date || '-'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {item.file_url && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                                    Download
                                  </a>
                                </Button>
                              )}
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteAssignment(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
