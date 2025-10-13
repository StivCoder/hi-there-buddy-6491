import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '254720720659'; // Kenya country code + number
    const message = 'Hello, I would like to inquire about Albert School, Kutus.';
    
    // Try both mobile and web WhatsApp URLs
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile 
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.location.href = whatsappUrl;
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
