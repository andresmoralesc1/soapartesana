'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, type CartItem } from './CartContext';

export function Cart() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="relative hover:bg-terracotta/10 p-2 rounded-lg transition-colors"
        aria-label={`Ver carrito (${totalItems} artículos)`}
      >
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-terracotta text-cream text-xs h-5 w-5 rounded-full flex items-center justify-center font-bold"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Offcanvas */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-terracotta/20">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Tu Carrito
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-terracotta/10 rounded-lg transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <span className="text-sm">Cerrar</span>
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-16 w-16 text-terracotta/30 mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Agrega algunos productos artesanales
                    </p>
                    <Link
                      href="/productos"
                      onClick={() => setIsOpen(false)}
                      className="bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Ver Productos
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-border"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <Link
                                  href={`/productos/${item.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="font-semibold text-foreground hover:text-terracotta transition-colors line-clamp-1"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  {item.price.toFixed(2)}€
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors"
                                aria-label={`Eliminar ${item.name} del carrito`}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-muted rounded-lg">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1.5 hover:bg-terracotta/10 rounded transition-colors disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                  aria-label="Reducir cantidad"
                                >
                                  <Minus className="h-3 w-3" />
                                </motion.button>
                                <span className="w-8 text-center font-semibold text-sm">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1.5 hover:bg-terracotta/10 rounded transition-colors"
                                  aria-label="Aumentar cantidad"
                                >
                                  <Plus className="h-3 w-3" />
                                </motion.button>
                              </div>
                              <p className="font-semibold text-terracotta">
                                {(item.price * item.quantity).toFixed(2)}€
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-terracotta/20 p-6 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-terracotta text-2xl">
                      {totalPrice.toFixed(2)}€
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/13524979992?text=${encodeURIComponent(
                      `Hola, me gustaría hacer un pedido:\n\n${items.map(item =>
                        `• ${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toFixed(2)}€`
                      ).join('\n')}\n\nTotal: ${totalPrice.toFixed(2)}€`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-terracotta hover:bg-terracotta/90 text-white py-4 rounded-xl font-semibold text-center transition-colors"
                  >
                    Finalizar Pedido por WhatsApp
                  </a>
                  <p className="text-xs text-center text-muted-foreground">
                    Envíos a toda Argentina • Pago contra entrega
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
