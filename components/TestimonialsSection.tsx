'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Testimonial {
  name: string;
  location: string;
  pet: string;
  petType: 'perro' | 'gato' | 'otro';
  avatar: string;
  rating: number;
  text: string;
  date: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'María González',
    location: 'Miami, FL',
    pet: 'Max',
    petType: 'perro',
    avatar: '👩',
    rating: 5,
    text: 'El jabón de avena y manzanilla salvó la piel de mi Golden. Tenía dermatitis desde hace meses y después de 3 baños ya no se raspa. ¡Increíble!',
    date: 'Hace 2 semanas',
    product: 'Jabón Mascotas Avena & Manzanilla',
  },
  {
    name: 'Carlos Rodríguez',
    location: 'Orlando, FL',
    pet: 'Luna',
    petType: 'gato',
    avatar: '👨',
    rating: 5,
    text: 'Mi gatita es muy sensible a los químicos. Probamos muchos jabones "hipoalergénicos" pero solo el de Artes_Ana no le causó irritación. Ahora usa solo este.',
    date: 'Hace 1 mes',
    product: 'Jabón Mascotas Avena & Manzanilla',
  },
  {
    name: 'Ana Martínez',
    location: 'Tampa, FL',
    pet: 'Rocky',
    petType: 'perro',
    avatar: '👩',
    rating: 5,
    text: 'El jabón de neem funciona de verdad para las pulgas. Vivimos en zona húmeda y desde que lo usamos hemos reducido mucho el uso de químicos.',
    date: 'Hace 3 semanas',
    product: 'Jabón Neem & Árbol de Té',
  },
  {
    name: 'Laura Sánchez',
    location: 'Dallas, TX',
    pet: 'Coco',
    petType: 'perro',
    avatar: '👩',
    rating: 4,
    text: 'Me encanta que sea seguro si se lame. Mi perro se intenta lamer después del baño y ahora no me preocupó. El pH balanceado marca la diferencia.',
    date: 'Hace 1 semana',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-[oklch(0.62_0.16_45)] text-sm font-semibold rounded-full mb-4">
            TESTIMONIOS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Lo que dicen los dueños
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Más de 1,000+ familias confían en Artes_Ana para el cuidado de sus mascotas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl bg-[oklch(0.68_0.10_165)] p-3 rounded-full">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    {testimonial.petType === 'perro' ? '🐕' : testimonial.petType === 'gato' ? '🐈' : '🐾'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>{testimonial.location}</span>
                    <span>•</span>
                    <span>{testimonial.pet}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[oklch(0.62_0.16_45)]" />
                ))}
              </div>

              {/* Testimonial */}
              <p className="text-slate-600 text-sm mb-4 line-clamp-4">
                <Quote className="h-4 w-4 inline-block text-[oklch(0.62_0.16_45)] mr-1 opacity-50" />
                {testimonial.text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{testimonial.date}</span>
                {testimonial.product && (
                  <span className="text-[oklch(0.55_0.14_155)] font-medium">
                    Usó: {testimonial.product.split(' ').slice(0, 3).join(' ')}...
                </span>
              )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          <div className="flex items-center gap-2 text-slate-600">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 5).map((t, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[oklch(0.62_0.16_45)] border-2 border-white flex items-center justify-center text-white text-xs">
                  {t.avatar}
                </div>
              ))}
            </div>
            <span className="text-sm">+1,000 reseñas verificadas</span>
          </div>
          <div className="flex items-center gap-2 text-[oklch(0.55_0.14_155)] font-semibold">
            <span className="text-2xl">4.8</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
