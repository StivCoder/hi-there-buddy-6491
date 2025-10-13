import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Clean phone number (remove any spaces or special characters)
    const phoneNumber = '254720720659';
    const message = 'Hello, I would like to inquire about Albert School, Kutus.';
    
    // Create WhatsApp URL - works on both mobile and desktop
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Contact us on WhatsApp"
      type="button"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </button>
  );
};

export default WhatsAppButton;
