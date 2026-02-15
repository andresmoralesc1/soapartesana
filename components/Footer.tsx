import Link from 'next/link';
import { Instagram, Facebook, Mail, PawPrint } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-amber-300 mb-4">Artes_Ana</h3>
            <p className="text-cream/80 text-sm">
              Jabones medicinales 100% artesanales. Cuidado botánico integral para ti
              y tu compañero más fiel.
            </p>
            <div className="flex items-center gap-2 mt-4 text-amber-200">
              <PawPrint className="h-4 w-4" />
              <span className="text-sm">Pet Care Specialist</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Líneas de Producto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/productos?categoria=pet-care" className="text-cream/80 hover:text-amber-300 transition-colors">
                  Pet Care (Mascotas)
                </Link>
              </li>
              <li>
                <Link href="/productos?categoria=facial" className="text-cream/80 hover:text-amber-300 transition-colors">
                  Línea Facial
                </Link>
              </li>
              <li>
                <Link href="/productos?categoria=terapeutico" className="text-cream/80 hover:text-amber-300 transition-colors">
                  Terapéutica
                </Link>
              </li>
              <li>
                <Link href="/productos?categoria=energetico" className="text-cream/80 hover:text-amber-300 transition-colors">
                  Energética
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Conectemos</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com/artes_ana" className="text-cream/80 hover:text-amber-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-amber-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:hola@artesana.com" className="text-cream/80 hover:text-amber-300 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-cream/60 text-sm">
              Envíos a toda Argentina
            </p>
            <a
              href="https://wa.me/5491112345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <Mail className="h-4 w-4" />
              WhatsApp Directo
            </a>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Artes_Ana. Hecho a mano con 🌿 para ti y tu mascota.</p>
        </div>
      </div>
    </footer>
  );
}
