'use client';

import { motion } from 'framer-motion';
import { Heart, Globe, Award, Users, Sparkles, Leaf } from 'lucide-react';
import Image from 'next/image';

const values = [
  {
    icon: Globe,
    title: 'Orígenes Colombianos',
    description: 'Nuestras raíces están en la rica biodiversidad de Colombia, donde aprendimos a valorar cada ingrediente natural.',
    color: 'text-forest',
    bg: 'bg-forest/10',
  },
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Utilizamos ingredientes puros, sin químicos ni conservantes artificiales. Lo mejor de la tierra para tu piel.',
    color: 'text-sage',
    bg: 'bg-sage/10',
  },
  {
    icon: Heart,
    title: 'Hecho con Amor',
    description: 'Cada producto es elaborado a mano con dedicación, pensando en el bienestar de quienes nos eligen.',
    color: 'text-lavender',
    bg: 'bg-lavender/10',
  },
  {
    icon: Award,
    title: 'Calidad Artesanal',
    description: 'Métodos tradicionales combinados con estándares de calidad modernos para productos excepcionales.',
    color: 'text-forest',
    bg: 'bg-forest/10',
  },
];

const timeline = [
  { year: '2018', title: 'El Sueño Comienza', description: 'Ana Isabel deja su carrera corporativa para seguir su pasión por lo artesanal.' },
  { year: '2019', title: 'Primer Taller', description: 'Se instala el primer taller en Bogotá con métodos tradicionales de saponificación.' },
  { year: '2021', title: 'Expansión Natural', description: 'Incorporamos velas y cerámica al catálogo, siempre con ingredientes naturales.' },
  { year: '2024', title: 'SoapArtesana Nace', description: 'Lanzamiento de nuestra plataforma online para compartir nuestra pasión con el mundo.' },
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
      <section className="relative bg-gradient-to-br from-cream via-cream to-terracotta/10 py-20 md:py-32 overflow-hidden">
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
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
                Nuestra Historia
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                Del corazón de Colombia para el mundo
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-12 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.pexels.com/photos/6634715/pexels-photo-6634715.jpeg"
                alt="Ana Isabel Morales trabajando"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                <p className="text-cream text-xl font-serif italic">
                  "Cada producto que creo lleva una parte de mi corazón y de mi tierra colombiana"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Ana Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <Image
                    src="https://images.pexels.com/photos/9736908/pexels-photo-9736908.jpeg"
                    alt="Ingredientes naturales"
                    width={600}
                    height={700}
                    className="rounded-2xl shadow-xl"
                  />
                  <motion.div
                    className="absolute -bottom-6 -right-6 bg-forest text-cream p-6 rounded-xl shadow-xl"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <p className="font-serif text-lg font-bold">5+ Años</p>
                    <p className="text-sm">Creando arte natural</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-6">
                  Ana Isabel Morales
                </h2>
                <p className="text-foreground/80 text-lg mb-4">
                  Fundadora & Artesana
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Nací en las montañas de Colombia, rodeada de una biodiversidad que el mundo entero envidia. Desde niña, mi abuela me enseñó que la naturaleza nos regala todo lo que necesitamos para cuidarnos.
                  </p>
                  <p>
                    Después de años en el mundo corporativo, sentí que había perdido mi esencia. En 2018 tomé la decisión más difícil y mejor de mi vida: dejar todo y volver a mis raíces.
                  </p>
                  <p>
                    En un pequeño taller de Bogotá, comencé a experimentar con jabones naturales. Cada fallida era una lección, cada éxito una celebración. Hoy, SoapArtesana es el resultado de esa pasión inagotable.
                  </p>
                </div>
                <motion.div
                  className="flex items-center gap-3 mt-6 p-4 bg-muted/50 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-forest/20 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-forest" />
                  </div>
                  <p className="font-medium">
                    +2,000 clientes satisfechos en toda España
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
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

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Nuestro Camino
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De un sueño a una realidad que crece cada día
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-forest/20 transform md:-translate-x-1/2" />

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
                          <span className="text-forest font-bold text-sm">
                            {item.year}
                          </span>
                          <h3 className="font-serif text-xl font-bold mt-2 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-6 md:left-1/2 w-5 h-5 bg-forest rounded-full border-4 border-cream transform md:-translate-x-1/2 z-10" />
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-forest text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Únete a Nuestra Familia
            </h2>
            <p className="text-cream/90 max-w-2xl mx-auto mb-8 text-lg">
              Cada producto que compras nos ayuda a continuar con este sueño. Te invitamos a descubrir nuestra colección y ser parte de esta historia.
            </p>
            <motion.a
              href="/productos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-cream text-forest px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Ver Productos
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
