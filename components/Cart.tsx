'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

export function Cart() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, isOpen, setIsOpen } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Close cart on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, setIsOpen]);

  // Prevent body scroll when cart is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
              aria-hidden="true"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-50 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-terracotta/20">
                <div>
                  <h2 id="cart-title" className="font-serif text-2xl font-bold text-foreground">
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
                  <span className="text-sm mr-1">Cerrar</span>
                  <X className="h-5 w-5 inline" />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="bg-terracotta/10 p-6 rounded-full mb-4">
                      <ShoppingBag className="h-16 w-16 text-terracotta/50" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-xs">
                      Agrega algunos productos artesanales para comenzar tu cuidado botánico
                    </p>
                    <Link
                      href="/productos"
                      onClick={() => setIsOpen(false)}
                      className="bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
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
                                  {item.price.toFixed(2)}€{item.weight && ` • ${item.weight}`}
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

                  {/* Savings message */}
                  {totalItems >= 2 && (
                    <div className="bg-green-50 text-green-800 text-sm px-4 py-2 rounded-lg text-center">
                      ✓ Estás ahorrando en envío combinado
                    </div>
                  )}

                  <a
                    href={`https://wa.me/13051234567?text=${encodeURIComponent(
                      `Hola Artes_Ana! 🌿 Me gustaría hacer un pedido:\n\n${items.map(item =>
                        `• ${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toFixed(2)}€`
                      ).join('\n')}\n\n💰 Total: ${totalPrice.toFixed(2)}€\n\n¿Me podrían confirmar disponibilidad y tiempo de entrega?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl font-semibold text-center transition-colors"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52.075-.149.669-1.612.916-2.207.242-.599.448-1.136.632-1.536.198-.422.236-.626.348-1.075.198-.448.198-1.224.246-1.224.246-.823.149-1.224.149-1.224.149-.075.001-.148.025-.223.074-.074.05-.149.124-.223.223-.074.099-.149.223-.223.371-.074.149-.149.273-.223.422-.074.149-.149.273-.223.422-.074.149-.149.298-.223.496-.074.199-.149.422-.223.645-.074.223-.149.447-.223.67-.074.223-.149.447-.223.67-.074.223-.149.447-.223.67z" />
                      </svg>
                      Finalizar por WhatsApp
                    </span>
                  </a>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Envíos a toda Estados Unidos
                    </span>
                    <span>•</span>
                    <span>Pago contra entrega</span>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
