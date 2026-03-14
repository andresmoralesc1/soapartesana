'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Package, CreditCard, Mail } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    icon: Users,
    title: '1. Aceptación de Términos',
    content: [
      'Al acceder y utilizar el sitio web de Artes_Ana ("el Sitio"), aceptas estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, por favor no utilices nuestro Sitio.',
      'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor tan pronto como se publiquen en el Sitio.',
      'El uso continuado del Sitio después de dichos cambios constituye tu aceptación de los nuevos términos.',
    ],
  },
  {
    icon: Shield,
    title: '2. Productos y Servicios',
    content: [
      'Todos nuestros jabones artesanales son elaborados a mano con ingredientes naturales. Puede haber variaciones leves en color, aroma y forma entre diferentes lotes.',
      'Hacemos todo lo posible para asegurar la calidad de nuestros productos. Sin embargo, debido a la naturaleza artesanal de nuestros procesos, no podemos garantizar que todos los productos sean idénticos.',
      'Los precios pueden cambiar sin previo aviso. Nos reservamos el derecho de limitar cantidades por compra.',
    ],
  },
  {
    icon: Package,
    title: '3. Pedidos y Pagos',
    content: [
      'Aceptamos pagos mediante:',
      '  - Tarjeta de crédito/débito (procesado por Stripe)',
      '  - WhatsApp (para pedidos personalizados)',
      '  Todos los precios están en USD.',
      'Una vez realizado un pedido, se enviará un email de confirmación con los detalles.',
      'Nos reservamos el derecho de cancelar pedidos en caso de: (a) producto agotado, (b) error en el precio, (c) imposible de entregar.',
    ],
  },
  {
    icon: CreditCard,
    title: '4. Envíos y Entregas',
    content: [
      'Enviamos a todo Estados Unidos.',
      'Tiempos de entrega estimados:',
      '  - Envío estándar: 5-7 días hábiles',
      '  - Envío exprés: 2-3 días hábiles',
      'No somos responsables por retrasos causados por servicios de mensajería.',
      'El cliente es responsable de proporcionar una dirección de entrega precisa.',
    ],
  },
  {
    icon: Mail,
    title: '5. Política de Devoluciones',
    content: [
      'Debido a la naturaleza de nuestros productos (artesanales y personales), no aceptamos devoluciones de productos utilizados.',
      'Si recibes un producto dañado o incorrecto, contáctanos dentro de 48 horas con:',
      '  - Foto del daño',
      '  - Descripción del problema',
      '  - Número de pedido',
      'Evaluaremos cada caso individualmente.',
    ],
  },
  {
    icon: Shield,
    title: '6. Propiedad Intelectual',
    content: [
      'Todo el contenido del Sitio (imágenes, texto, diseños) es propiedad de Artes_Ana o de sus licenciantes.',
      'Está prohibido copiar, reproducir, distribuir o modificar cualquier contenido sin permiso previo por escrito.',
      'El uso indebido del contenido puede dar lugar a acciones legales.',
    ],
  },
];

export default function TerminosPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20"
    >
      {/* Header */}
      <section className="bg-gradient-to-br from-cream to-terracotta/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
              LEGAL
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground">
              Última actualización: Marzo 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none space-y-12">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl shadow-lg border border-border"
            >
              <p className="text-foreground leading-relaxed">
                Bienvenido a <strong>Artes_Ana</strong>. Al utilizar nuestro sitio web y servicios,
                aceptas y estás de acuerdo con estos Términos y Condiciones. Por favor léelos detenidamente
                antes de realizar cualquier compra.
              </p>
            </motion.div>

            {/* Sections */}
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-terracotta/10 text-terracotta p-3 rounded-xl">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {section.title}
                  </h2>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground leading-relaxed">
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/  /g, '  <br className="mb-2">').replace(/\n/g, '<br />') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-muted/30 p-8 rounded-2xl text-center"
          >
            <h3 className="font-semibold text-lg mb-3">¿Tienes preguntas?</h3>
            <p className="text-muted-foreground mb-4">
              Si tienes alguna duda sobre estos términos, contáctanos.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contáctanos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-br from-forest to-sage text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            ¿Listo para comenzar tu ritual botánico?
          </h2>
          <p className="text-cream/90 mb-6 max-w-2xl mx-auto">
            Explora nuestra colección de jabones artesanales para ti y tu mascota.
          </p>
          <Link href="/productos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cream text-forest px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Ver Productos
            </motion.button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
