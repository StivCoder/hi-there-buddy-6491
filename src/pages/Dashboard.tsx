import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  Image, 
  Calendar, 
  UserPlus, 
  Award,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const stats = [
    { title: 'Total Students', value: '248', icon: Users, color: 'text-blue-500' },
    { title: 'Teachers', value: '18', icon: UserPlus, color: 'text-green-500' },
    { title: 'Events This Month', value: '5', icon: Calendar, color: 'text-purple-500' },
    { title: 'Gallery Images', value: '156', icon: Image, color: 'text-orange-500' },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'Add, edit, or remove user accounts',
      icon: Users,
      action: () => toast({ title: "User Management", description: "Would open user management interface" }),
    },
    {
      title: 'Post Announcement',
      description: 'Create news and announcements',
      icon: FileText,
      action: () => toast({ title: "Announcements", description: "Would open announcement editor" }),
    },
    {
      title: 'Manage Gallery',
      description: 'Upload and organize photos',
      icon: Image,
      action: () => navigate('/gallery'),
    },
    {
      title: 'Add Event',
      description: 'Create calendar events',
      icon: Calendar,
      action: () => navigate('/calendar'),
    },
    {
      title: 'Manage Teachers',
      description: 'Edit teacher profiles and subjects',
      icon: Award,
      action: () => toast({ title: "Teacher Management", description: "Would open teacher management" }),
    },
    {
      title: 'Student Council',
      description: 'Update student council information',
      icon: Users,
      action: () => toast({ title: "Student Council", description: "Would open student council editor" }),
    },
  ];

  const recentActivity = [
    { action: 'New event added', detail: 'Sports Day - March 28', time: '2 hours ago' },
    { action: 'Gallery updated', detail: '5 new photos uploaded', time: '5 hours ago' },
    { action: 'Announcement posted', detail: 'Term 1 Registration Open', time: '1 day ago' },
    { action: 'User created', detail: 'New parent account', time: '2 days ago' },
  ];

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Quick Actions</CardTitle>
                <CardDescription>Manage your school website content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <action.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4 pb-4 last:pb-0">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.detail}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">System Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium capitalize">{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-xs">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Login:</span>
                  <span className="font-medium">Today</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-6">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Backend Integration Points:</strong> This dashboard simulates admin functionality. 
                In production, all actions (user management, announcements, content updates) would connect to a backend API 
                for data persistence and real-time updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
