'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory, categoryInfo } from '@/lib/products';
import { PawPrint, Sparkles, Leaf, Shield, Droplet, ChevronRight, Instagram, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ComparisonSection } from '@/components/ComparisonSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';

export default function HomePage() {
  const petProducts = getProductsByCategory('pet-care');
  const facialProducts = getProductsByCategory('facial');
  const terapeuticoProducts = getProductsByCategory('terapeutico');
  const energeticoProducts = getProductsByCategory('energetico');

  const ingredients = [
    { icon: '🫒', title: 'Oleatos en Aceite de Oliva Extra Virgen', desc: 'Base premium que nutre profundamente' },
    { icon: '⚠️', title: '0% Químicos Tóxicos', desc: 'Sin sulfatos, parabenos ni detergentes' },
    { icon: '⚖️', title: 'pH Balanceado', desc: 'Respeto total por la barrera cutánea' },
    { icon: '🌱', title: '100% Biodegradable', desc: 'No contamina el agua ni el medio ambiente' },
  ];

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero/hero-soap-natural.jpg"
            alt="Jabones artesanales naturales con ingredientes orgánicos"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-cream/70" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm text-forest text-sm font-medium rounded-full mb-6 border border-forest/20">
                <Leaf className="h-4 w-4" />
                Botánica + Ciencia
              </span>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
                Bienestar botánico para ti y tu{' '}
                <span className="text-gradient-forest">compañero más fiel</span>
              </h1>

              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Jabones medicinales 100% artesanales. Cuidamos la barrera cutánea de los que más quieres
                con el poder regenerativo de las plantas orgánicas.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/productos?categoria=pet-care">
                  <Button
                    size="lg"
                    className="bg-terracotta text-white hover:bg-terracotta/90 shadow-lg hover:shadow-xl text-lg px-8 font-semibold"
                  >
                    <PawPrint className="mr-2 h-5 w-5" />
                    Cuidado para Mascotas
                  </Button>
                </Link>
                <Link href="/productos?categoria=facial">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-forest text-forest hover:bg-forest hover:text-white text-lg px-8 font-semibold"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Línea Humana
                  </Button>
                </Link>
              </div>

              {/* Quick trust badges */}
              <div className="flex flex-wrap gap-6 mt-10 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Seguro si se lame</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-green-600" />
                  <span>Hecho a mano</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image/Illustration Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-green-100 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🐕</div>
                    <div className="text-6xl mb-4">🧼</div>
                    <div className="text-5xl">🌿</div>
                    <p className="mt-6 font-serif text-2xl text-forest">Cuidado Botánico Integral</p>
                  </div>
                </div>

                {/* Floating product preview cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100"
                >
                  <div className="text-3xl mb-1">🐾</div>
                  <p className="text-xs font-semibold text-amber-900">Pet Care</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-green-100"
                >
                  <div className="text-3xl mb-1">✨</div>
                  <p className="text-xs font-semibold text-green-900">Línea Humana</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== PET CARE SECTION (FEATURED) ==================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-orange-50 rounded-3xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-9xl mb-4">🐕‍🦺</div>
                  <div className="flex justify-center gap-4 text-5xl">
                    <span>🧴</span>
                    <span>🌿</span>
                    <span>✨</span>
                  </div>
                </div>
                <div className="mt-6 bg-white/60 rounded-2xl p-4">
                  <p className="text-center text-amber-900 font-medium">
                    "Su piel es más fina que la tuya"
                  </p>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-terracotta text-white rounded-2xl p-6 shadow-xl">
                <p className="text-4xl font-bold">pH 7.0</p>
                <p className="text-sm opacity-90">Balanceado</p>
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-900 text-sm font-semibold rounded-full mb-4">
                <PawPrint className="h-4 w-4" />
                ESPECIALISTA EN MASCOTAS
              </span>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                ¿Sabías que su piel es{' '}
                <span className="text-terracotta">más fina que la tuya</span>?
              </h2>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                No es solo higiene, es <strong>salud preventiva</strong>. Mientras los jabones comerciales
                irritan y eliminan aceites naturales, nuestra fórmula de{' '}
                <strong>Avena y Manzanilla</strong> crea una barrera protectora que retiene la humedad.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Shield, title: 'Seguridad Total', desc: 'Sin riesgo de toxicidad si tu mascota se lame tras el baño' },
                  { icon: Sparkles, title: 'Alivio Inmediato', desc: 'Propiedades analgésicas que calman el picor y la dermatitis' },
                  { icon: Leaf, title: 'Eco-Consciente', desc: 'Fórmula 100% biodegradable que no contamina el agua' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100"
                  >
                    <div className="bg-amber-100 text-amber-700 rounded-lg p-3 h-fit">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/productos?categoria=pet-care">
                <Button
                  size="lg"
                  className="bg-terracotta text-white hover:bg-terracotta/90 shadow-lg font-semibold"
                >
                  Ver Línea Pet Care
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Pet Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {petProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMPARISON SECTION ==================== */}
      <ComparisonSection />

      {/* ==================== HUMAN CARE RITUAL SECTION ==================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-900 text-sm font-semibold rounded-full mb-4">
              LÍNEA HUMANA
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Naturaleza empaquetada para tu piel
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Desde la regeneración celular con Aloe Vera hasta la relajación profunda con Lavanda.
              Jabones libres de químicos, creados para el rostro y el cuerpo.
            </p>
          </motion.div>

          {/* Bento Grid for Human Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Facial - Larger card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 h-full border border-rose-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-4xl mb-2 block">✨</span>
                    <h3 className="font-serif text-2xl font-bold text-rose-900">Facial</h3>
                    <p className="text-rose-700">Cuidado especial para tu rostro</p>
                  </div>
                  <span className="bg-rose-200 text-rose-900 text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="font-semibold text-rose-900 mb-1">Carbón Activado</p>
                    <p className="text-sm text-rose-700">Para acné y piel grasa</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="font-semibold text-rose-900 mb-1">Arroz con Leche</p>
                    <p className="text-sm text-rose-700">Aclarante natural</p>
                  </div>
                </div>
                <Link href="/productos?categoria=facial">
                  <Button variant="outline" className="mt-6 border-rose-300 text-rose-900 hover:bg-rose-100">
                    Ver Facial
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Terapéutico */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-3xl p-6 h-full border border-lime-100">
                <span className="text-3xl mb-2 block">🌿</span>
                <h3 className="font-serif text-xl font-bold text-lime-900 mb-2">Terapéutico</h3>
                <p className="text-lime-700 text-sm mb-4">Para pieles sensibles</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white/60 rounded-lg p-2">• Caléndula y Miel</p>
                  <p className="bg-white/60 rounded-lg p-2">• Aloe Vera Puro</p>
                </div>
              </div>
            </motion.div>

            {/* Energético */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 h-full border border-purple-100">
                <span className="text-3xl mb-2 block">🌙</span>
                <h3 className="font-serif text-xl font-bold text-purple-900 mb-2">Energético</h3>
                <p className="text-purple-700 text-sm mb-4">Cuerpo y espíritu</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white/60 rounded-lg p-2">• Sal Rosada y Ruda</p>
                  <p className="bg-white/60 rounded-lg p-2">• Lavanda Francesa</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Human Products Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...facialProducts.slice(0, 2), ...terapeuticoProducts.slice(0, 1), ...energeticoProducts.slice(0, 1)].map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <TestimonialsSection />

      {/* ==================== HONEST INGREDIENTS SECTION ==================== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
              TRANSPARENCIA
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Ingredientes Honestos
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Lo que lees es lo que hay. Sin secretos, sin ingredientes ocultos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredients.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all border border-slate-200 group h-full"
              >
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <FAQSection />

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-forest to-sage text-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-4h4v-4h4v-4h2v-4h4v-4h4v-4h2v-4h4h4v-4h4v-4h2v-4h4h2v-4h4v-4h4v-4h4h4v-4h2v-4h4h2v-4h4h2z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-6xl mb-6">🌿</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Comienza el ritual botánico
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Explora nuestra colección completa o escríbenos por WhatsApp para una recomendación
              personalizada según tus necesidades.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-white text-forest hover:bg-white/90 shadow-2xl px-8 font-semibold"
                >
                  Ver Catálogo Completo
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/13051234567?text=Hola!%20Quiero%20más%20información%20sobre%20los%20jabones%20artesanales."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 font-semibold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF ==================== */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2 text-slate-600">
              <Instagram className="h-5 w-5" />
              <span className="font-medium">@artes_ana</span>
            </div>
            <div className="text-slate-600">
              <span className="font-bold text-2xl text-terracotta">1000+</span>
              <span className="ml-2">clientes felices</span>
            </div>
            <div className="text-slate-600">
              <span className="font-bold text-2xl text-terracotta">5.0</span>
              <span className="ml-2">★ valoración</span>
            </div>
            <div className="text-slate-600">
              <span className="font-bold text-2xl text-terracotta">100%</span>
              <span className="ml-2">natural</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
