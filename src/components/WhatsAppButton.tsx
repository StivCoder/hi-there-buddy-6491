import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '254720720659';
  const message = encodeURIComponent('Hello, I would like to inquire about Albert School, Kutus.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50"
    >
      <Button
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BA5A]"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </a>
  );
};

export default WhatsAppButton;
