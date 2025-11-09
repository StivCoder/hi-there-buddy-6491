import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Phone, Shield } from 'lucide-react';

const ParentLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const sendOTP = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phoneNumber },
      });

      if (error) throw error;

      toast({
        title: "OTP Sent",
        description: "Check your phone for the verification code",
      });
      setOtpSent(true);
      setExpiresAt(data.expiresAt);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
      return;
    }

    if (isSignup && (!fullName || !email)) {
      toast({
        title: "Error",
        description: "Please provide your full name and email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { 
          phoneNumber, 
          otpCode,
          isSignup,
          fullName: isSignup ? fullName : undefined,
          email: isSignup ? email : undefined
        },
      });

      if (error) throw error;

      if (data.verified) {
        localStorage.setItem('portal_parent', JSON.stringify(data.parent));
        toast({
          title: "Success",
          description: isSignup ? "Account created successfully!" : "Login successful!",
        });
        navigate('/portal/parent-dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid OTP code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Parent Portal Login</CardTitle>
          <CardDescription>
            Secure access to your child's academic information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {isSignup ? 'Enter your phone number to create an account' : 'Enter your registered phone number'}
                </p>
              </div>
              
              {isSignup && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </>
              )}
              
              <Button
                onClick={sendOTP}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </Button>
              
              <Button
                onClick={() => setIsSignup(!isSignup)}
                variant="ghost"
                className="w-full"
                disabled={loading}
              >
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  disabled={loading}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Code expires in 5 minutes
                </p>
              </div>
              <Button
                onClick={verifyOTP}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </Button>
              <Button
                onClick={() => {
                  setOtpSent(false);
                  setOtpCode('');
                }}
                variant="outline"
                className="w-full"
                disabled={loading}
              >
                Change Phone Number
              </Button>
            </>
          )}
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Need help? Contact the school office</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentLogin;
