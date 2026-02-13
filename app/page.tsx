'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts, categoryInfo } from '@/lib/products';
import { Sparkles, Heart, Leaf, Truck, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
      {/* Hero Section */}
      <section className="relative bg-cream py-20 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-lavender/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1
              className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Productos Artesanales
              <motion.span
                className="block text-terracotta mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Hechos con Amor
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Descubre nuestra colección de jabones, velas, cerámica y tejidos.
              Cada pieza es única, elaborada a mano con ingredientes naturales y
              mucho cariño.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-cream shadow-lg hover:shadow-xl transition-all group"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:border-terracotta hover:text-terracotta transition-colors"
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
                color: 'text-sage',
                bg: 'bg-sage/20',
              },
              {
                icon: Leaf,
                title: '100% Natural',
                desc: 'Ingredientes puros',
                color: 'text-terracotta',
                bg: 'bg-terracotta/20',
              },
              {
                icon: Sparkles,
                title: 'Sin Plásticos',
                desc: 'Envases eco',
                color: 'text-lavender',
                bg: 'bg-lavender/20',
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
                className="hover:border-terracotta hover:text-terracotta group"
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
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-terracotta transition-colors">
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
                className="hover:border-terracotta hover:text-terracotta group"
              >
                Conocer Más
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-terracotta text-cream relative overflow-hidden">
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
