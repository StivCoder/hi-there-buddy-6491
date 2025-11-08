import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, User, GraduationCap, BookOpen, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Student {
  student_id: string;
  admission_number: string;
  full_name: string;
  dob: string;
  gender: string;
  class_id: string | null;
}

interface Result {
  result_id: string;
  subject: string;
  marks: number;
  grade: string;
  term: string;
  year: number;
  remarks: string | null;
  created_at: string;
}

const ParentDashboard = () => {
  const [parent, setParent] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const parentData = localStorage.getItem('portal_parent');
    if (!parentData) {
      navigate('/portal/login');
      return;
    }

    const parsedParent = JSON.parse(parentData);
    setParent(parsedParent);
    setStudents(parsedParent.students || []);
    if (parsedParent.students && parsedParent.students.length > 0) {
      setSelectedStudent(parsedParent.students[0].student_id);
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (selectedStudent) {
      fetchResults(selectedStudent);
    }
  }, [selectedStudent]);

  const fetchResults = async (studentId: string) => {
    try {
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('student_id', studentId)
        .order('year', { ascending: false })
        .order('term', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load results",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portal_parent');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/portal/login');
  };

  const downloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your report card is being downloaded",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const currentStudent = students.find(s => s.student_id === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Parent Portal</h1>
            <p className="text-muted-foreground">Welcome, {parent?.full_name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Student Selector */}
        {students.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Student</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {students.map((student) => (
                  <Button
                    key={student.student_id}
                    onClick={() => setSelectedStudent(student.student_id)}
                    variant={selectedStudent === student.student_id ? "default" : "outline"}
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    {student.full_name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Student Profile */}
        {currentStudent && (
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold">{currentStudent.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Admission Number</p>
                  <p className="font-semibold">{currentStudent.admission_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-semibold">{currentStudent.gender}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Academic Results</CardTitle>
                <CardDescription>View your child's performance</CardDescription>
              </div>
              <Button onClick={downloadReport} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No results available yet</p>
              </div>
            ) : (
              <Tabs defaultValue={`${results[0].year}-${results[0].term}`}>
                <TabsList>
                  {Array.from(new Set(results.map(r => `${r.year}-${r.term}`))).map((period) => (
                    <TabsTrigger key={period} value={period}>
                      {period.replace('-', ' ')}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Array.from(new Set(results.map(r => `${r.year}-${r.term}`))).map((period) => (
                  <TabsContent key={period} value={period} className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Subject</th>
                            <th className="text-center p-2">Marks</th>
                            <th className="text-center p-2">Grade</th>
                            <th className="text-left p-2">Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results
                            .filter(r => `${r.year}-${r.term}` === period)
                            .map((result) => (
                              <tr key={result.result_id} className="border-b">
                                <td className="p-2">{result.subject}</td>
                                <td className="text-center p-2">{result.marks}</td>
                                <td className="text-center p-2">
                                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                    {result.grade}
                                  </span>
                                </td>
                                <td className="p-2">{result.remarks || '-'}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
