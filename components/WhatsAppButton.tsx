'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  productName?: string;
}

const WHATSAPP_NUMBER = '13524979992'; // +1 (352) 497-9992

export function WhatsAppButton({ phoneNumber = WHATSAPP_NUMBER, message, productName }: WhatsAppButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultMessage = productName
    ? `Hola Artes_Ana! 🌿 Me interesa el producto: ${productName}. ¿Podrían darme más información?`
    : 'Hola Artes_Ana! 🌿 Me gustaría obtener más información sobre sus productos artesanales.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
      <span className="absolute right-full mr-2 md:mr-3 top-1/2 -translate-y-1/2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Pedir por WhatsApp
      </span>
    </a>
  );
}
