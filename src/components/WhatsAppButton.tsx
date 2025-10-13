import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  // Direct WhatsApp link - this format works on all devices
  const phoneNumber = '254720720659';
  const message = 'Hello, I would like to inquire about Albert School, Kutus.';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  );
};

export default WhatsAppButton;
