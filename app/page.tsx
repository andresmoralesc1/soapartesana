'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts, categoryInfo } from '@/lib/products';
import { Sparkles, Heart, Leaf, Truck, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Floating leaf/petal SVG paths
const floatingElements = [
  { path: 'M12 2C8 2 4 6 4 10s4 8 8 8 8-4 8-8-4-8-8-8z', delay: 0, duration: 20, x: 10, y: 20 },
  { path: 'M10 2C6 2 3 6 3 9s3 6 7 6 7-3 7-6-3-6-7-6z', delay: 2, duration: 18, x: 80, y: 30 },
  { path: 'M8 2C5 2 3 5 3 8s2 5 5 5 5-2 5-5-2-5-5-5z', delay: 4, duration: 22, x: 20, y: 60 },
  { path: 'M14 3C10 3 7 7 7 11s3 7 7 7 7-3 7-7-3-7-7-7z', delay: 1, duration: 25, x: 70, y: 15 },
  { path: 'M6 2C4 2 3 4 3 7s1 4 3 4 3-1 3-4-1-4-3-4z', delay: 3, duration: 16, x: 50, y: 70 },
];

// Organic blob SVG paths
const organicBlobs = [
  'M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-7.3C81.5,5.8,70.2,17.7,59.8,28.1C49.4,38.5,39.9,47.4,28.8,53.8C17.7,60.2,5,63.7,-7.1,63.1C-19.2,62.5,-31.8,58.3,-41.4,50.3C-51,42.3,-59.2,30.5,-64.8,17.3C-70.4,4.1,-73.4,-10.5,-70.3,-24.3C-67.2,-38.1,-58,-51.1,-46.8,-60.1C-35.6,-69.1,-22.4,-74.1,-9.4,-76.4C3.6,-78.7,17.2,-78.2,30.5,-75.8Z',
  'M45.2,-76.9C59.9,-69.1,73.6,-59.2,81.6,-46.3C89.6,-33.4,91.9,-17.5,86.6,-3.2C81.3,11.1,68.4,23.8,56.3,33.5C44.2,43.2,32.9,49.9,20.5,52.9C8.1,55.9,-5.4,55.2,-18.3,51.9C-31.2,48.6,-44.5,42.7,-56.9,33.1C-69.3,23.5,-78.8,10.2,-81.8,-4.4C-84.8,-19,-81.3,-34.9,-71.9,-47.4C-62.5,-59.9,-47.2,-69,-31.6,-74.3C-16,-79.6,0,-81.2,15.8,-79.8C31.6,-78.4,47.2,-73.9,45.2,-76.9Z',
  'M39.5,-67.8C52.3,-62.1,64.5,-55.3,72.4,-45.3C80.3,-35.3,83.9,-22.1,80.9,-9.8C77.9,2.5,68.3,13.9,58.5,23.1C48.7,32.3,38.7,39.3,27.6,43.1C16.5,46.9,4.3,47.5,-7.4,45.6C-19.1,43.7,-30.3,39.3,-39.5,32.5C-48.7,25.7,-56.8,16.5,-61.9,5.9C-67,-4.7,-69.1,-16.7,-65.4,-27.5C-61.7,-38.3,-52.2,-47.9,-41.5,-55.1C-30.8,-62.3,-18.9,-67.1,-6.7,-68.3C5.5,-69.5,17.8,-67.1,39.5,-67.8Z',
];

function MouseParallax({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) / 50;
      const moveY = (e.clientY - centerY) / 50;
      x.set(moveX);
      y.set(moveY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {/* Mega Hero Section */}
      <section className="relative bg-cream min-h-[75vh] md:min-h-[85vh] overflow-hidden noise-overlay">
        {/* Organic SVG Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sage blob */}
          <MouseParallax className="absolute top-10 left-5 w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
            <motion.div
              animate={{
                rotate: [0, 15, -10, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
                <path
                  d={organicBlobs[0]}
                  fill="oklch(0.72 0.10 145)"
                  transform="translate(100, 100)"
                />
              </svg>
            </motion.div>
          </MouseParallax>

          {/* Lavender blob */}
          <MouseParallax className="absolute bottom-10 right-5 w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
            <motion.div
              animate={{
                rotate: [0, -12, 8, 0],
                scale: [1.1, 1, 1.05, 1.1],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 2,
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-15">
                <path
                  d={organicBlobs[1]}
                  fill="oklch(0.78 0.12 290)"
                  transform="translate(100, 100)"
                />
              </svg>
            </motion.div>
          </MouseParallax>

          {/* Terracotta blob */}
          <MouseParallax className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            <motion.div
              animate={{
                rotate: [0, 8, -5, 0],
                scale: [0.95, 1.05, 1, 0.95],
                opacity: [0.2, 0.35, 0.25, 0.2],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 4,
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
                <path
                  d={organicBlobs[2]}
                  fill="oklch(0.62 0.15 45)"
                  transform="translate(100, 100)"
                />
              </svg>
            </motion.div>
          </MouseParallax>

          {/* Floating leaves/petals */}
          {floatingElements.map((elem, i) => (
            <motion.div
              key={i}
              className="absolute opacity-30 text-sage"
              style={{
                left: `${elem.x}%`,
                top: `${elem.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: elem.duration,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: elem.delay,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d={elem.path} />
              </svg>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl pt-20 pb-10"
          >
            <motion.h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
            >
              <span className="text-foreground">Productos</span>
              <motion.span
                className="block text-gradient-natural"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.35 }}
              >
                Artesanales
              </motion.span>
              <motion.span
                className="block text-gradient-sage text-3xl md:text-5xl lg:text-6xl mt-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 }}
              >
                Hechos con Amor
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              Descubre nuestra colección de jabones, velas, cerámica y tejidos.
              Cada pieza es única, elaborada a mano con ingredientes naturales y
              mucho cariño.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-5"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.8 }}
            >
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-cream shadow-lg hover:shadow-xl text-lg px-8 ease-spring"
                >
                  Ver Catálogo
                  <motion.div
                    className="ml-2 inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:border-forest hover:text-terracotta text-lg px-8 ease-natural"
                >
                  Nuestra Historia
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-card border-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Heart,
                title: 'Hecho a Mano',
                desc: 'Cada pieza es única',
                color: 'text-forest',
                bg: 'bg-forest/15',
              },
              {
                icon: Leaf,
                title: '100% Natural',
                desc: 'Ingredientes puros',
                color: 'text-sage',
                bg: 'bg-sage/15',
              },
              {
                icon: Sparkles,
                title: 'Eco-Friendly',
                desc: 'Envases sostenibles',
                color: 'text-moss',
                bg: 'bg-moss/15',
              },
              {
                icon: Truck,
                title: 'Envío Rápido',
                desc: '24-48h península',
                color: 'text-foreground',
                bg: 'bg-foreground/10',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex items-start space-x-3 group"
              >
                <motion.div
                  className={`${feature.bg} ${feature.color} p-3 rounded-full group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Productos Destacados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestra selección favorita de productos artesanales
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/productos">
              <Button
                size="lg"
                variant="outline"
                className="hover:border-forest hover:text-terracotta group"
              >
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora todas nuestras colecciones artesanales
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {Object.entries(categoryInfo).map(([key, category], index) => (
              <motion.div
                key={key}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Link
                  href={`/productos?categoria=${key}`}
                  className="group bg-card p-6 rounded-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-border/50 block"
                >
                  <motion.span
                    className="text-5xl mb-4 block"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: index * 0.2,
                    }}
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-forest transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Nuestra Historia
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              SoapArtesana nació de la pasión por lo artesanal y el respeto
              por la naturaleza. En nuestro taller, elaboramos cada producto
              con métodos tradicionales, utilizando ingredientes que la tierra
              nos regala.
            </p>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="hover:border-forest hover:text-terracotta group"
              >
                Conocer Más
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-forest text-cream relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2v-2h-2v4h-4v-2h4v4h4v2h-4v-4h-4v-4h2v4h4v4h4v-2h-4v-4h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              ¿Lista para Descubrir?
            </h2>
            <p className="text-cream/90 max-w-2xl mx-auto mb-8">
              Explora nuestro catálogo completo o escríbenos por WhatsApp
              para recomendaciones personalizadas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/productos">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-cream text-terracotta hover:bg-cream/90 shadow-lg group"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
