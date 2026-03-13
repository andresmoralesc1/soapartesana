'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory, categoryInfo } from '@/lib/products';
import { Sparkles, Leaf, Shield, Droplet, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ComparisonSection } from '@/components/ComparisonSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';

export default function HomePage() {
  const petProducts = getProductsByCategory('pet-care');
  const facialProducts = getProductsByCategory('facial');
  const terapeuticoProducts = getProductsByCategory('terapeutico');
  const energeticoProducts = getProductsByCategory('energetico');
  const jabonesProducts = getProductsByCategory('jabones');

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
                Jabones artesanales para{' '}
                <span className="text-gradient-forest">tu bienestar diario</span>
              </h1>

              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Descubre el poder de las plantas orgánicas en cada barra. Cuidado natural para tu piel,
                tratamientos terapéuticos, y productos seguros para toda tu familia incluyendo tus mascotas.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/productos">
                  <Button
                    size="lg"
                    className="bg-terracotta text-white hover:bg-terracotta/90 shadow-lg hover:shadow-xl text-lg px-8 font-semibold"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Ver Catálogo
                  </Button>
                </Link>
              </div>

              {/* Quick trust badges */}
              <div className="flex flex-wrap gap-6 mt-10 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Hecho a mano</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-green-600" />
                  <span>Cruelty Free</span>
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
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 via-amber-50 to-rose-100 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="text-7xl mb-4">🧼</div>
                    <div className="text-5xl mb-4">🌿</div>
                    <div className="text-4xl">✨</div>
                    <p className="mt-6 font-serif text-2xl text-forest">Artesanía Natural</p>
                  </div>
                </div>

                {/* Floating product preview cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-rose-100"
                >
                  <div className="text-3xl mb-1">✨</div>
                  <p className="text-xs font-semibold text-rose-900">Facial</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-green-100"
                >
                  <div className="text-3xl mb-1">🌿</div>
                  <p className="text-xs font-semibold text-green-900">Terapéutico</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== HUMAN CARE RITUAL SECTION (FEATURED) ==================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-green-50 to-white">
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
              Cuidado natural para tu piel
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Jabones artesanales creados con ingredientes botánicos de primer calidad.
              Desde el cuidado facial hasta tratamientos terapéuticos, cada barra está formulada para nutrir y sanar.
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
                    <h3 className="font-serif text-2xl font-bold text-rose-900">Línea Facial</h3>
                    <p className="text-rose-700">Cuidado especial para tu rostro</p>
                  </div>
                  <span className="bg-rose-200 text-rose-900 text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
                <p className="text-rose-800 mb-4">Formuladas específicamente para las necesidades únicas de la piel del rostro.</p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="font-semibold text-rose-900 mb-1">Arroz y Leche</p>
                    <p className="text-sm text-rose-700">Aclarante natural</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="font-semibold text-rose-900 mb-1">Carbón Activado</p>
                    <p className="text-sm text-rose-700">Para acné y poros</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="font-semibold text-rose-900 mb-1">Pepino y Coco</p>
                    <p className="text-sm text-rose-700">Refrescante diario</p>
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
                <p className="text-lime-700 text-sm mb-4">Para pieles sensibles y problemáticas</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white/60 rounded-lg p-2">• Caléndula y Miel</p>
                  <p className="bg-white/60 rounded-lg p-2">• Aloe Vera y Menta</p>
                  <p className="bg-white/60 rounded-lg p-2">• Romero y Salvia</p>
                  <p className="bg-white/60 rounded-lg p-2">• Lavanda Francesa</p>
                </div>
                <Link href="/productos?categoria=terapeutico" className="text-xs text-lime-700 hover:text-lime-900 mt-4 inline-block font-semibold">
                  Ver todos →
                </Link>
              </div>
            </motion.div>

            {/* Jabones Especiales */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 h-full border border-emerald-100">
                <span className="text-3xl mb-2 block">🧼</span>
                <h3 className="font-serif text-xl font-bold text-emerald-900 mb-2">Jabones Especiales</h3>
                <p className="text-emerald-700 text-sm mb-4">Tratamientos botánicos únicos</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white/60 rounded-lg p-2">• Chocolate y Cacao</p>
                  <p className="bg-white/60 rounded-lg p-2">• Vino Tinto</p>
                  <p className="bg-white/60 rounded-lg p-2">• Zanahoria</p>
                  <p className="bg-white/60 rounded-lg p-2">• Naranja y Estropajo ⭐</p>
                </div>
                <Link href="/productos?categoria=jabones" className="text-xs text-emerald-700 hover:text-emerald-900 mt-4 inline-block font-semibold">
                  Ver todos →
                </Link>
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
                <p className="text-purple-700 text-sm mb-4">Limpieza de cuerpo y espíritu</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white/60 rounded-lg p-2">• Sal Rosada y Ruda</p>
                  <p className="bg-white/60 rounded-lg p-2">• Café, Clavos y Canela</p>
                  <p className="bg-white/60 rounded-lg p-2">• Limpieza Energética</p>
                </div>
                <Link href="/productos?categoria=energetico" className="text-xs text-purple-700 hover:text-purple-900 mt-4 inline-block font-semibold">
                  Ver todos →
                </Link>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="md:col-span-2 lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-terracotta/10 to-amber-50 rounded-3xl p-8 h-full border border-terracotta/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-4xl font-bold text-terracotta">17+</p>
                    <p className="text-sm text-slate-600">Productos Únicos</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-terracotta">100%</p>
                    <p className="text-sm text-slate-600">Natural</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-terracotta">5+</p>
                    <p className="text-sm text-slate-600">Años de Arte</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-terracotta">0%</p>
                    <p className="text-sm text-slate-600">Químicos</p>
                  </div>
                </div>
                <p className="text-center text-slate-600 mt-6 font-medium">
                  Cada barra es elaborada a mano con amor y dedicación
                </p>
              </div>
            </motion.div>
          </div>

          {/* Human Products Preview */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {facialProducts.slice(0, 2).map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
            {terapeuticoProducts.slice(0, 1).map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} index={index + 2} />
              </motion.div>
            ))}
            {jabonesProducts.slice(0, 1).map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} index={index + 3} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/productos?categoria=facial">
              <Button
                size="lg"
                variant="outline"
                className="border-forest text-forest hover:bg-forest hover:text-white font-semibold"
              >
                Ver Toda la Línea Humana
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PET CARE SECTION ==================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-amber-100 to-orange-50 rounded-3xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-9xl mb-4">🐕</div>
                  <div className="flex justify-center gap-4 text-5xl">
                    <span>🐈</span>
                    <span>🧴</span>
                    <span>🌿</span>
                  </div>
                </div>
                <div className="mt-6 bg-white/60 rounded-2xl p-4">
                  <p className="text-center text-amber-900 font-medium">
                    "Productos seguros para toda la familia"
                  </p>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-terracotta text-white rounded-2xl p-6 shadow-xl">
                <p className="text-4xl font-bold">pH 7.0</p>
                <p className="text-sm opacity-90">Balanceado</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-900 text-sm font-semibold rounded-full mb-4">
                🐾 LÍNEA PET CARE
              </span>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Cuidado seguro para tus{' '}
                <span className="text-terracotta">mascotas</span>
              </h2>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                La piel de tu mascota es más fina que la tuya. Nuestros jabones están formulados específicamente
                para perros y gatos, con ingredientes seguros si se lame tras el baño.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Shield, title: '100% Seguro', desc: 'Sin riesgo de toxicidad si tu mascota se lame' },
                  { icon: Sparkles, title: 'Alivio Natural', desc: 'Avena y Manzanilla calman picor y dermatitis' },
                  { icon: Leaf, title: 'pH Balanceado', desc: 'Formulado específicamente para piel canina y felina' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
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
                  variant="outline"
                  className="border-amber-500 text-amber-700 hover:bg-amber-50 font-semibold"
                >
                  Ver Línea Pet Care
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Pet Products Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {petProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== COMPARISON SECTION ==================== */}
      <ComparisonSection />

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
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-4h4v-4h4v-4h2v-4h4v-4h4v-4h2v-4h4h4v-4h4v-4h2v-4h4v-4h4v-4h4h4v-4h2v-4h4h2v-4h4h2z'/%3E%3C/g%3E%3C/svg%3E")`,
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
              Comienza tu ritual botánico
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Explora nuestra colección completa de jabones artesanales o escríbenos por WhatsApp
              para una recomendación personalizada según tu tipo de piel.
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
                href="https://wa.me/13524979992?text=Hola!%20Quiero%20más%20información%20sobre%20los%20jabones%20artesanales."
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
              <span className="text-2xl">📸</span>
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
