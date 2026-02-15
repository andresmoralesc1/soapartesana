'use client';

import { ChevronDown, Shield, Dog, Cat, Leaf, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  icon: any;
  category: 'pet' | 'general' | 'shipping';
}

const faqs: FAQ[] = [
  {
    id: 'pet-safe',
    question: '¿Realmente es seguro si mi mascota se lame el jabón?',
    answer: '¡Sí, completamente! Nuestros jabones están hechos con ingredientes 100% naturales y comestibles como avena, manzanilla, aceite de oliva y aloe vera. No contienen químicos tóxicos ni detergentes que puedan dañar a tu mascota si se lamen después del baño.',
    icon: Shield,
    category: 'pet',
  },
  {
    id: 'ph-balance',
    question: '¿Qué pH tiene el jabón para mascotas?',
    answer: 'Nuestro jabón Pet Care tiene pH 7.0 neutro, ideal para la piel de perros y gatos. A diferencia de los jabones humanos (que son ácidos), el pH neutro no irrita la piel más fina y sensible de las mascotas.',
    icon: Dog,
    category: 'pet',
  },
  {
    id: 'dermatitis',
    question: '¿Ayuda con dermatitis y picor?',
    answer: 'Sí, la combinación de avena coloidal y manzanilla tiene propiedades antiinflamatorias y calmantes. La avena alivia el picor inmediato y la manzanilla reduce la roje e irritación. Muchos clientes reportan mejoras visibles en 3-4 baños.',
    icon: Leaf,
    category: 'pet',
  },
  {
    id: 'frequency',
    question: '¿Con qué frecuencia puedo bañar a mi mascota?',
    answer: 'Para perros: 1-2 veces por semana como máximo. Para gatos: solo cuando sea necesario (baños secos) o cada 2 semanas. El sobre-baño puede eliminar los aceites naturales que protegen la piel.',
    icon: Cat,
    category: 'pet',
  },
  {
    id: 'ingredients',
    question: '¿No usan aceites esenciales?',
    answer: 'Usamos aceites esenciales puros en concentraciones bajas seguras para mascotas (lavanda, árbol de té). Todos nuestros productos son libres de fenol, árbol de té sin desnaturalizar, y otros aceites esenciales tóxicos para perros y gatos.',
    icon: Shield,
    category: 'pet',
  },
  {
    id: 'puppies',
    question: '¿Puedo usar en cachorros?',
    answer: 'Sí, nuestros jabones son suaves y seguros para cachorros de 8 semanas en adelante. Para cachorros más jóvenes, recomendamos consultar con tu veterinario primero y usar una cantidad mínima de jabón.',
    icon: Dog,
    category: 'pet',
  },
  {
    id: 'shipping',
    question: '¿Hacen envíos a toda Estados Unidos?',
    answer: '¡Sí! Enviamos a todo Estados Unidos con envío estándar (5-7 días hábiles) y envío exprés (2-3 días hábiles). Todos los pedidos incluyen tracking para que sepas dónde está tu paquete.',
    icon: Package,
    category: 'shipping',
  },
  {
    id: 'payment',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos pago contra entrega (efectivo al recibir) y pago anticipado por PayPal. También estamos integrados con WhatsApp para facilitar tu pedido directly.',
    icon: Shield,
    category: 'general',
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pet' | 'general' | 'shipping'>('all');

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[oklch(0.68_0.10_165)] text-[oklch(0.55_0.14_155)] text-sm font-semibold rounded-full mb-4">
            PREGUNTAS FRECUENTES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            ¿Tienes dudas? Aquí las respuestas
          </h2>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[oklch(0.62_0.16_45)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedCategory('pet')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === 'pet'
                  ? 'bg-[oklch(0.62_0.16_45)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🐾 Mascotas
            </button>
            <button
              onClick={() => setSelectedCategory('shipping')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === 'shipping'
                  ? 'bg-[oklch(0.62_0.16_45)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📦 Envíos
            </button>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[oklch(0.68_0.10_165)] text-[oklch(0.55_0.14_155)] p-2 rounded-lg">
                    <faq.icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-slate-800">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-[oklch(0.98_0.01_120)] p-8 rounded-2xl border border-[oklch(0.68_0.10_165)]"
        >
          <p className="text-slate-700 mb-4">
            ¿No encuentras la respuesta a tu pregunta?
          </p>
          <a
            href="https://wa.me/13051234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297.15-1.255.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52.074-.074.05-.149.124-.223.223-.074.099-.149.223-.223.371-.074.149-.273.223-.422.074-.149-.149.273-.223.422-.074.149-.149.298-.223.496-.074.199-.149.422-.223.645-.074.223-.149.447-.223.67-.074.223-.149.447-.223.67-.074.223-.149.447-.223.67z" />
            </svg>
            Preguntar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
