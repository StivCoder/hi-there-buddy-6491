import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '254720720659';
  const message = 'Hello, I would like to inquire about Albert School, Kutus.';
  
  const handleClick = () => {
    // Use direct WhatsApp URL that works on all platforms
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </button>
  );
};

export default WhatsAppButton;
