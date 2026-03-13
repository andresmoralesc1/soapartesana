'use client';

import { motion } from 'framer-motion';
import { Heart, Globe, Award, Users, Sparkles, Leaf, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const values = [
  {
    icon: Globe,
    title: 'Raíces Colombianas',
    description: 'El alma de Artes_Ana está en la rica biodiversidad de Colombia, aprendiendo a valorar cada ingrediente natural.',
    color: 'text-forest',
    bg: 'bg-forest/10',
  },
  {
    icon: Leaf,
    title: 'Respeto por la Naturaleza',
    description: 'Estudiamos con mimo el beneficio de cada planta para crear jabones que aprovechan el poder de la tierra.',
    color: 'text-sage',
    bg: 'bg-sage/10',
  },
  {
    icon: Heart,
    title: 'Hecho con las Manos',
    description: 'Las mejores cosas de la vida se hacen con las manos. Cada jabón es creado con dedicación y amor.',
    color: 'text-lavender',
    bg: 'bg-lavender/10',
  },
  {
    icon: Sparkles,
    title: 'Ritual de Bienestar',
    description: 'Más que productos de limpieza, pequeñas dosis de cuidado diario para tu cuerpo y rostro.',
    color: 'text-terracotta',
    bg: 'bg-terracotta/10',
  },
];

const quotes = [
  {
    text: '"Artes_Ana: donde la tradición de lo hecho a mano se encuentra con el cuidado botánico."',
    context: 'Nuestra esencia',
  },
  {
    text: '"No es solo un jabón, es un pequeño ritual de calma para tu piel."',
    context: 'Filosofía',
  },
  {
    text: '"De mis manos a tu hogar. Descubre el equilibrio natural en cada burbuja."',
    context: 'Artesanía',
  },
  {
    text: '"¿Sabías que tu piel también \'come\'? Aliméntala con lo mejor de la naturaleza."',
    context: 'Bienestar',
  },
];

const timeline = [
  { year: 'El Inicio', title: 'Pasión por lo Artesanal', description: 'Entre aromas de cocina y el detalle de la pintura en madera, siempre supe que las mejores cosas se hacen con las manos.' },
  { year: 'El Descubrimiento', title: 'Cosmética Botánica', description: 'Una búsqueda personal de bienestar se transformó en el descubrimiento del fascinante mundo de la cosmética natural.' },
  { year: 'Artes_Ana', title: 'El Proyecto', description: 'Nació como una línea de jabones suaves y delicados que aprovechan el poder de la tierra para limpiar, sanar y equilibrar.' },
  { year: 'Hoy', title: 'Compartiendo el Amor', description: 'Te invito a transformar tu rutina en un ritual de bienestar natural con productos nobles para cuerpo y rostro.' },
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream via-green-50/50 to-terracotta/10 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-lavender/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-900 text-sm font-semibold rounded-full mb-6">
                SOBRE MÍ
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
                El alma detrás de{' '}
                <span className="text-gradient-forest">Artes_Ana</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                Ana Isabel Morales
              </p>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Fundadora & Artesana
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Ana Section - Her Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-lg border border-green-100">
                <p className="text-2xl md:text-3xl font-serif text-forest mb-6 leading-relaxed">
                  ¡Hola! Soy Ana, y siempre he creído que <strong>las mejores cosas de la vida se hacen con las manos</strong>.
                </p>

                <p className="text-slate-700 mb-4 leading-relaxed">
                  Mi camino empezó entre aromas de cocina y el detalle de la pintura en madera, creando desde mermeladas caseras hasta piezas artesanales llenas de color. Esa pasión por lo auténtico me llevó, de forma natural, a descubrir el fascinante mundo de la cosmética botánica.
                </p>

                <p className="text-slate-700 mb-4 leading-relaxed">
                  Lo que comenzó como una <strong>búsqueda personal de bienestar</strong> para mi rostro y cuerpo, se transformó en <strong>Artes_Ana</strong>. Aquí, el ingrediente principal es el respeto por la naturaleza. He dedicado tiempo a estudiar con mimo el beneficio de cada planta para crear una línea de jabones suaves y delicados que aprovechan el poder de la tierra para limpiar, sanar y equilibrar nuestra piel.
                </p>

                <div className="bg-white/60 rounded-2xl p-6 my-8 border-l-4 border-terracotta">
                  <p className="text-xl md:text-2xl font-serif text-terracotta leading-relaxed">
                    "Mis jabones no son solo productos de limpieza; son <strong>pequeñas dosis de cuidado diario</strong>, formulados para ser tan nobles que puedes usarlos con total confianza tanto en el cuerpo como en el rostro."
                  </p>
                </div>

                <p className="text-slate-700 leading-relaxed text-xl font-medium">
                  Te invito a transformar tu rutina en un <strong>ritual de bienestar natural</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
              INSPIRACIÓN
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Palabras que nos definen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Frases inspiradoras para acompañar tus momentos de cuidado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-sage-100"
              >
                <p className="text-lg md:text-xl font-serif text-forest mb-4 leading-relaxed">
                  {quote.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
                    {quote.context}
                  </span>
                  <span className="text-2xl">🌿</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Lo Que Nos Define
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estos son los pilares que guían cada producto que creamos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-border/50 h-full">
                  <div className={`${value.bg} ${value.color} p-4 rounded-xl w-fit mb-4`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Mi Camino
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De la pasión artesanal al bienestar botánico
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-forest via-terracotta to-sage transform md:-translate-x-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center md:justify-center"
                  >
                    <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 w-full ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="ml-16 md:ml-0 md:w-1/2">
                        <div className="bg-card p-6 rounded-xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow">
                          <span className="text-forest font-bold text-sm mb-2 block">
                            {item.year}
                          </span>
                          <h3 className="font-serif text-xl font-bold mt-2 mb-2 text-forest">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-terracotta rounded-full border-4 border-cream transform md:-translate-x-1/2 z-10" />
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 md:py-20 bg-forest text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Instagram className="h-8 w-8" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Sígueme en Instagram
              </h2>
            </div>
            <p className="text-cream/90 max-w-2xl mx-auto mb-8 text-lg">
              Comparte el ritual del bienestar natural con nuestra comunidad
            </p>
            <a
              href="https://instagram.com/artes_ana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cream text-forest px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              @artes_ana
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-terracotta/10 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-forest">
              Comienza tu ritual botánico
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Descubre nuestra colección completa de jabones artesanales y transforma tu rutina diaria en un momento de bienestar.
            </p>
            <Link href="/productos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-forest text-cream px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
              >
                Ver Productos
                <Leaf className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
