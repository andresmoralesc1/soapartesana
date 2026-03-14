'use client';

import Link from 'next/link';
import { Home, Search, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-terracotta/5 to-sage/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-8"
        >
          <h1 className="font-serif text-9xl md:text-[200px] font-bold text-terracotta leading-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¡Ups! Página no encontrada
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Lo sentimos, pero la página que buscas no existe o ha sido movida.
            No te preocupes, ¡tenemos muchos jabones artesanales esperándote!
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              <Home className="h-5 w-5" />
              Volver al Inicio
            </motion.button>
          </Link>

          <Link href="/productos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-forest text-forest hover:bg-forest hover:text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
            >
              <Package className="h-5 w-5" />
              Ver Productos
            </motion.button>
          </Link>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-border/50"
        >
          <p className="text-sm text-muted-foreground mb-3">
            ¿Buscas algo específico? Aquí tienes algunas opciones:
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/productos?categoria=pet-care" className="text-forest hover:underline">
              🐾 Pet Care
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/productos?categoria=facial" className="text-forest hover:underline">
              ✨ Línea Facial
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/productos?categoria=terapeutico" className="text-forest hover:underline">
              🌿 Terapéutica
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/contacto" className="text-forest hover:underline">
              💬 Contáctanos
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
