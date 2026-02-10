'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  productName?: string;
}

const WHATSAPP_NUMBER = '34600123456'; // Replace with actual number

export function WhatsAppButton({ phoneNumber = WHATSAPP_NUMBER, message, productName }: WhatsAppButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultMessage = productName
    ? `Hola, me interesa el producto: ${productName}. ¿Podrían darme más información?`
    : 'Hola, me gustaría obtener más información sobre sus productos artesanales.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-cream px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Pedir por WhatsApp
      </span>
    </a>
  );
}
