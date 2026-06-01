import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppInquiry({ saree, className = '' }) {
  const phoneNumber = '919363745680'; // Replace with actual business number
  
  const getWhatsAppLink = () => {
    const pageUrl = `${window.location.origin}/saree/${saree.id}`;
    const text = `Hello Golden Yellow Boutique, I am interested in inquiring about the following saree from your online heritage catalog:\n\n*Saree Name:* ${saree.name}\n*Product ID:* ${saree.id}\n*Material:* ${saree.material}\n*Color:* ${saree.color}\n*Price Quote:* ${saree.price || 'Requesting Price'}\n\n*Product Link:* ${pageUrl}\n\nPlease let me know about its availability and details for ordering. Thank you!`;
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-700 text-cream-50 font-sans font-semibold tracking-widest uppercase text-xs hover:bg-emerald-800 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 rounded-sm ${className}`}
    >
      <MessageSquare size={16} className="shrink-0" />
      <span>Inquire on WhatsApp</span>
    </a>
  );
}
