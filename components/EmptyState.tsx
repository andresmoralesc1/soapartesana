'use client';

import { Package, Search, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type?: 'products' | 'search' | 'cart' | 'default';
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const icons = {
  products: Package,
  search: Search,
  cart: ShoppingBag,
  default: Package,
};

const defaultMessages = {
  products: {
    title: 'No hay productos disponibles',
    description: 'No encontramos productos en esta categoría. Por favor intenta con otra categoría o vuelve más tarde.',
  },
  search: {
    title: 'No encontramos resultados',
    description: 'Tu búsqueda no arrojó ningún resultado. Intenta con otros términos o navega por nuestras categorías.',
  },
  cart: {
    title: 'Tu carrito está vacío',
    description: 'Parece que aún no has agregado productos. ¡Explora nuestro catálogo y encuentra tus favoritos!',
  },
  default: {
    title: 'No hay contenido disponible',
    description: 'No encontramos información para mostrar en este momento.',
  },
};

export function EmptyState({
  type = 'default',
  title,
  description,
  action,
}: EmptyStateProps) {
  const Icon = icons[type];
  const messages = defaultMessages[type];
  const displayTitle = title || messages.title;
  const displayDescription = description || messages.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-terracotta/10 rounded-full blur-3xl scale-150" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative bg-terracotta/10 w-24 h-24 rounded-full flex items-center justify-center mb-6"
        >
          <Icon className="h-10 w-10 text-terracotta" />
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-serif text-2xl font-bold text-foreground mb-3"
      >
        {displayTitle}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground max-w-md mb-6"
      >
        {displayDescription}
      </motion.p>

      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
