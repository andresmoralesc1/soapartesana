'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, Instagram, Facebook, Clock } from 'lucide-react';
import { useState } from 'react';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+34 612 345 678',
    description: 'Respuesta en minutos',
    color: 'text-green-600',
    bg: 'bg-green-100',
    link: 'https://wa.me/34612345678',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hola@soapartesana.com',
    description: 'Respuesta en 24h',
    color: 'text-forest',
    bg: 'bg-forest/10',
    link: 'mailto:hola@soapartesana.com',
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    value: 'Argentina D.C, Argentina',
    description: 'Envíos a toda la península',
    color: 'text-sage',
    bg: 'bg-sage/10',
  },
  {
    icon: Clock,
    title: 'Horario',
    value: 'Lun - Vie: 9:00 - 18:00',
    description: 'Atención personalizada',
    color: 'text-moss',
    bg: 'bg-moss/10',
  },
];

const socialLinks = [
  {
    name: 'Instagram',
    icon: Instagram,
    username: '@soapartesana',
    url: 'https://instagram.com/soapartesana',
    color: 'hover:text-pink-600',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    username: 'SoapArtesana',
    url: 'https://facebook.com/soapartesana',
    color: 'hover:text-blue-600',
  },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('¡Mensaje enviado! Te responderemos pronto.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream via-terracotta/5 to-sage/10 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 right-20 w-64 h-64 bg-forest/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-20 w-80 h-80 bg-lavender/10 rounded-full blur-3xl"
            animate={{ scale: [1.3, 1, 1.3], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Contacta Con Nosotros
            </h1>
            <p className="text-xl text-muted-foreground">
              Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24 -mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.link || '#'}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${!method.link ? 'pointer-events-none' : ''}`}
              >
                <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-border/50 h-full group">
                  <motion.div
                    className={`${method.bg} ${method.color} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all`}
                  >
                    <method.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-1">
                    {method.title}
                  </h3>
                  <p className="font-bold text-foreground mb-1">
                    {method.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-card p-8 rounded-2xl shadow-xl border border-border/50">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                  Envíanos un Mensaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all outline-none"
                        placeholder="Tu nombre"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all outline-none"
                        placeholder="tu@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-forest focus:ring-2 focus:ring-terracotta/20 transition-all outline-none"
                      placeholder="+34 600 000 000"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Asunto *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-forest focus:ring-2 focus:ring-terracotta/20 transition-all outline-none"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="pedido">Información sobre pedidos</option>
                      <option value="producto">Consulta sobre productos</option>
                      <option value="wholesale">Ventas al por mayor</option>
                      <option value="otro">Otro</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-forest focus:ring-2 focus:ring-terracotta/20 transition-all outline-none resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-terracotta hover:bg-terracotta/90 text-cream font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Enviar Mensaje
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                  ¿Por Qué SoapArtesana?
                </h2>
                <p className="text-muted-foreground mb-6">
                  No solo vendemos productos, creamos experiencias. Cada jabón, véla y pieza de cerámica tiene una historia y está hecho con dedicación.
                </p>
                <ul className="space-y-3">
                  {[
                    '🌿 Ingredientes 100% naturales y orgánicos',
                    '🧼 Métodos artesanales tradicionales',
                    '♻️ Envases eco-friendly y reciclables',
                    '🚚 Envío rápido toda Argentina',
                    '💬 Atención personalizada',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <span className="text-forest">{item.split(' ')[0]}</span>
                      <span className="text-sm">{item.split(' ').slice(1).join(' ')}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest/5 p-6 rounded-xl border border-forest/20">
                <h3 className="font-semibold text-lg mb-4 text-forest">
                  Síguenos en Redes
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border/50 ${social.color} transition-colors`}
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{social.username}</span>
                    </motion.a>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Comparte tus experiencias con nuestros productos usando el hashtag <span className="text-forest font-medium">#SoapArtesana</span>
                </p>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-sage/10 to-lavender/10 p-6 rounded-xl text-center"
              >
                <Phone className="h-8 w-8 text-sage mx-auto mb-3" />
                <h3 className="font-semibold mb-2">¿Prefieres llamarnos?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Lunes a Viernes, 9:00 - 18:00
                </p>
                <a
                  href="tel:+34612345678"
                  className="text-forest font-bold hover:underline"
                >
                  +34 612 345 678
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
