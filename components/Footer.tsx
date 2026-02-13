import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-terracotta mb-4">SoapArtesana</h3>
            <p className="text-cream/80 text-sm">
              Productos artesanales hechos con amor y ingredientes naturales.
              Cada pieza cuenta una historia de tradición y cuidado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/productos" className="text-cream/80 hover:text-cream transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-cream transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-cream/80 hover:text-cream transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Conectemos</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:hola@soapartesana.com" className="text-cream/80 hover:text-cream transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-cream/60 text-sm">
              Envíos a toda Argentina
            </p>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60 text-sm">
          <p>&copy; {new Date().getFullYear()} SoapArtesana. Hecho a mano con ❤️</p>
        </div>
      </div>
    </footer>
  );
}
