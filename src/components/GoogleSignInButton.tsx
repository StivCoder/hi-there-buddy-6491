import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { lovable } from '@/integrations/lovable/index';
import { useToast } from '@/hooks/use-toast';

const GoogleSignInButton = ({ returnPath, disabled }: { returnPath: string; disabled?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: `${window.location.origin}${returnPath}`,
    });
    if (result.error) {
      toast({ title: 'Google sign-in failed', description: String(result.error.message ?? result.error), variant: 'destructive' });
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    // Session set in place: reload so the page runs its account check
    window.location.reload();
  };

  return (
    <Button type="button" variant="outline" className="w-full" onClick={handleClick} disabled={disabled || loading}>
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.66 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.96S8.78 6.26 12 6.26c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.68 3.7 14.56 2.75 12 2.75 6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25c6.92 0 9.2-4.86 9.2-7.36 0-.5-.05-.87-.12-1.25z" />
      </svg>
      {loading ? 'Connecting...' : 'Continue with Google'}
    </Button>
  );
};

export default GoogleSignInButton;
