'use client';

import { motion } from 'framer-motion';
import { Eye, Shield, Database, Cookie, Mail, Users } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    icon: Shield,
    title: '1. Información que Recopilamos',
    content: [
      'Información personal: Nombre, email, teléfono (cuando nos proporcionas).',
      'Información de pedido: Productos comprados, cantidad, dirección de envío.',
      'Información de pago: Procesado a través de Stripe (no almacenamos datos de tarjeta).',
      'Información de navegación: Cookies, dirección IP, navegador, dispositivo.',
    ],
  },
  {
    icon: Database,
    title: '2. Cómo Recopilamos tu Información',
    content: [
      'Directamente: Cuando creas una cuenta, realizas un pedido, o te contactas.',
      'Automáticamente: Cookies y tecnologías similares para análisis.',
      'De terceros:',
      '  - Stripe: procesamiento de pagos',
      '  - Vercel: hosting',
      '  - Google Analytics: análisis (opcional)',
    ],
  },
  {
    icon: Cookie,
    title: '3. Uso de Cookies',
    content: [
      'Cookies esenciales: Sesión, carrito de compras, preferencias.',
      'Cookies analíticas: Para entender cómo usas el sitio.',
      'Puedes administrar cookies desde la configuración de tu navegador.',
    ],
  },
  {
    icon: Eye,
    title: '4. Cómo Usamos tu Información',
    content: [
      'Procesar pedidos: Enviar productos, confirmar compras.',
      'Mejorar el sitio: Análisis de comportamiento, optimización.',
      'Comunicación: Enviar actualizaciones, responder consultas.',
      'Marketing: (solo con consentimiento) Promociones, novedades.',
      'Seguridad: Prevenir fraudes, proteger transacciones.',
    ],
  },
  {
    icon: Shield,
    title: '5. Protección de Datos',
    content: [
      'Implementamos medidas de seguridad físicas, electrónicas y administrativas.',
      'Usamos HTTPS para todas las transmisiones de datos.',
      'Stripe es PCI DSS compliant para procesamiento de pagos.',
      'Nunca almacenamos datos completos de tarjetas de crédito.',
      'El acceso a tu información está limitado a personal autorizado.',
    ],
  },
  {
    icon: Users,
    title: '6. Tus Derechos (CCPA/GDPR)',
    content: [
      'Derecho de acceso: Solicitar copia de tus datos.',
      'Derecho de rectificación: Corregir información inexacta.',
      'Derecho de eliminación: Solicitar borrado de tu cuenta y datos.',
      'Derecho de portabilidad: Recibir tus datos en formato estándar.',
      'Derecho de opt-out: Oponerte al uso de cookies para marketing.',
      'Para ejercer estos derechos, contáctanos en: hola@artesana.com',
    ],
  },
  {
    icon: Mail,
    title: '7. Contacto de Privacidad',
    content: [
      'Para preguntas sobre privacidad: hola@artesana.com',
      'Responderemos dentro de 30 días hábiles.',
      'Si consideras que nuestros prácticas violan la ley, puedes contactar:',
      '  - Florida Department of Legal Consumer Complaint',
      '  - Federal Trade Commission (FTC)',
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20"
    >
      {/* Header */}
      <section className="bg-gradient-to-br from-cream to-sage/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-sage/10 text-sage text-sm font-semibold rounded-full mb-4">
              PRIVACIDAD
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Política de Privacidad
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
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl shadow-lg border border-border mb-12"
          >
            <p className="text-foreground leading-relaxed">
              En <strong>Artes_Ana</strong>, nos comprometemos a proteger tu privacidad.
              Esta Política de Privacidad explica qué información recopilamos, cómo la usamos, y qué medidas tomamos
              para protegerla cuando utilizas nuestro sitio web y servicios.
            </p>
          </motion.div>

          {/* GDPR Compliance Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-sage/50 p-6 rounded-xl border border-sage/100 mb-12"
          >
            <p className="text-sm text-sage-900">
              <strong>🇪🇺 GDPR Compliance:</strong> Si eres residente de la Unión Europea,
              tienes derechos adicionales bajo el GDPR. Puedes solicitar copia, portabilidad, eliminación y restricción del procesamiento de tus datos.
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
              className="space-y-6 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-sage/10 text-sage p-3 rounded-xl">
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.replace(/^(.*?):/, '<strong>$1:</strong>') }} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                )}
              </div>
            </motion.div>
          ))}

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-muted/30 p-6 rounded-xl"
          >
            <h3 className="font-semibold text-lg mb-3">⏰ Retención de Datos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Cuentas de usuario:</strong> Mientras tengas una cuenta activa</li>
              <li>• <strong>Historial de pedidos:</strong> 3 años (cumplimiento legal)</li>
              <li>• <strong>Datos de analytics:</strong> 26 meses (opcional, con cookies)</li>
              <li>• <strong>Cookies de sesión:</strong> 30 días o al cerrar navegador</li>
              <li>• <strong>Correo marketing:</strong> hasta que te desuscribas</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-forest/5 p-6 rounded-xl text-center"
          >
            <p className="text-foreground mb-3">
              ¿Tienes preguntas sobre tu privacidad?
            </p>
            <a
              href="mailto:hola@artesana.com"
              className="text-forest font-semibold hover:underline"
            >
              hola@artesana.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-br from-sage to-forest text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Confiamos en tu privacidad
          </h2>
          <p className="text-cream/90 mb-6 max-w-2xl mx-auto">
            Tu información está segura con nosotros. Nunca venderemos, alquilaremos ni compartiremos
            tus datos personales con terceros sin tu consentimiento, excepto según lo descrito en esta política.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/productos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cream text-forest px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Ver Productos
              </motion.button>
            </Link>
            <Link href="/terminos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-cream text-cream hover:bg-cream/10 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Ver Términos
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
