'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts, categoryInfo } from '@/lib/products';
import { Sparkles, Heart, Leaf, Truck, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section - Rediseñado */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Imagen de fondo de alta calidad */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="Productos artesanales naturales"
            className="w-full h-full object-cover"
          />
          {/* Overlay elegante para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium rounded-full mb-6 border border-white/20">
                ✨ Hecho a mano con amor
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Productos Artesanales
              <span className="block text-3xl md:text-5xl mt-2 text-sage/80">
                de la Naturaleza
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-xl text-white/90 mb-10 max-w-2xl leading-relaxed"
            >
              Descubre jabones, vélas, cerámica y tejidos elaborados artesanalmente con ingredientes 100% naturales y sostenibles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-white text-terracotta hover:bg-white/90 shadow-2xl hover:shadow-3xl text-lg px-8 font-semibold"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 backdrop-blur-sm font-semibold"
                >
                  Nuestra Historia
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Rediseñado */}
      <section className="py-16 bg-white border-y border-sage-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Hecho a Mano', desc: 'Cada pieza es única', color: 'text-rose-500', bg: 'bg-rose-50' },
              { icon: Leaf, title: '100% Natural', desc: 'Ingredientes puros', color: 'text-terracotta', bg: 'bg-terracotta/10' },
              { icon: Sparkles, title: 'Eco-Friendly', desc: 'Envases sostenibles', color: 'text-teal-600', bg: 'bg-teal-50' },
              { icon: Truck, title: 'Envío Rápido', desc: '24-48h península', color: 'text-slate-700', bg: 'bg-slate-50' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-1 text-slate-800">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Rediseñado */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-forest/10 text-forest text-sm font-semibold rounded-full mb-4">
              Favoritos
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Productos Destacados
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Nuestra selección de productos artesanales más especiales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard key={product.id} product={product} index={index} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/productos">
              <Button
                size="lg"
                variant="outline"
                className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-8 font-semibold"
              >
                Ver Todos los Productos
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Rediseñado */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-sage/10 text-sage text-sm font-semibold rounded-full mb-4">
              Colecciones
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Explora todas nuestras colecciones artesanales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryInfo).map(([key, category], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/productos?categoria=${key}`} className="block">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all border border-slate-200 group h-full">
                    <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <h3 className="font-semibold text-xl mb-2 text-slate-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview - Rediseñado */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-forest to-sage text-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-4h4v-4h4v-4h2v-4h4v-4h4v-4h2v-4h4h4v-4h4v-4h2v-4h4h2v-4h4v-4h4v-4h4h2v-4h4h2v-4h4v-4h4v-4h4h4v-4h2v-4h4h2v-4h4h2z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Pasión por lo Artesanal
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              SoapArtesana nació de la pasión por lo artesanal y el respeto por la naturaleza.
              En nuestro taller, elaboramos cada producto con métodos tradicionales, utilizando
              ingredientes que la tierra nos regala.
            </p>
            <Link href="/about">
              <Button
                size="lg"
                className="bg-white text-terracotta hover:bg-white/90 shadow-2xl px-8 font-semibold"
              >
                Conocer Más
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section Final */}
      <section className="py-20 md:py-28 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              ¿Lista para Descubrir?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Explora nuestro catálogo completo o escríbenos por WhatsApp para recomendaciones personalizadas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-terracotta text-white hover:bg-terracotta/90 shadow-2xl px-8 font-semibold"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
