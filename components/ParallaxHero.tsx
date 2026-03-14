'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Sparkles, Shield, Droplet, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations for different layers
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const products = [
    {
      name: 'Facial',
      emoji: '✨',
      color: 'from-rose-500 to-pink-500',
      y: useTransform(scrollYProgress, [0, 1], [0, -50]),
    },
    {
      name: 'Terapéutico',
      emoji: '🌿',
      color: 'from-green-500 to-emerald-500',
      y: useTransform(scrollYProgress, [0, 1], [0, -80]),
    },
    {
      name: 'Energético',
      emoji: '🌙',
      color: 'from-purple-500 to-indigo-500',
      y: useTransform(scrollYProgress, [0, 1], [0, -60]),
    },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        style={{ y: yImage, scale: scaleImage }}
        className="absolute inset-0"
      >
        <Image
          src="/hero/hero-soap-natural.jpg"
          alt="Jabones artesanales naturales con ingredientes orgánicos"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-cream/70"
        />
      </motion.div>

      {/* Decorative floating elements with parallax */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="absolute top-20 right-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content with parallax */}
          <motion.div style={{ y: yText }}>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm text-forest text-sm font-medium rounded-full mb-6 border border-forest/20"
            >
              <Leaf className="h-4 w-4" />
              Botánica + Ciencia
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight"
            >
              Jabones artesanales para{' '}
              <span className="text-gradient-forest">tu bienestar diario</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed"
            >
              Descubre el poder de las plantas orgánicas en cada barra. Cuidado natural para tu piel,
              tratamientos terapéuticos, y productos seguros para toda tu familia incluyendo tus mascotas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-terracotta text-white hover:bg-terracotta/90 shadow-lg hover:shadow-xl text-lg px-8 font-semibold"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Ver Catálogo
                </Button>
              </Link>
            </motion.div>

            {/* Quick trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6 mt-10 text-sm text-slate-500"
            >
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
            </motion.div>
          </motion.div>

          {/* Right side - Product showcase with parallax layers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main display card */}
            <motion.div
              style={{ y: yImage }}
              className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 via-amber-50 to-rose-100 flex items-center justify-center overflow-hidden relative">
                {/* Layered product images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
                    className="text-center p-8"
                  >
                    <div className="text-7xl mb-4">🧼</div>
                    <div className="text-5xl mb-4">🌿</div>
                    <div className="text-4xl">✨</div>
                    <p className="mt-6 font-serif text-2xl text-forest">Artesanía Natural</p>
                  </motion.div>
                </div>
              </div>

              {/* Floating product cards with different parallax speeds */}
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  style={{ y: product.y }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute ${index === 0 ? '-top-4 -right-4' : index === 1 ? '-bottom-4 -left-4' : 'top-1/2 -right-8'} bg-white rounded-2xl shadow-xl p-4 border border-white/50`}
                >
                  <div className={`bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                    <div className="text-3xl mb-1">{product.emoji}</div>
                    <p className="text-xs font-semibold text-slate-800">{product.name}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
