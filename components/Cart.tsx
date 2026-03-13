'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle, CreditCard, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { Button } from '@/components/ui/button';
import { getPriceNumber } from '@/lib/products';

export function Cart() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, isOpen, setIsOpen } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleStripeCheckout = async () => {
    if (!customerEmail || !customerName) {
      alert('Por favor completa tu nombre y email');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerEmail,
          customerName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Error al procesar el pago');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

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
      {/* Trigger Button con micro interacciones mejoradas */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="relative hover:bg-terracotta/10 p-2 rounded-lg transition-colors group"
        aria-label={`Ver carrito (${totalItems} artículos)`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={
            totalItems > 0
              ? { rotate: [0, -10, 10, -10, 0] }
              : {}
          }
          transition={{ duration: 0.5, repeat: totalItems > 0 ? Infinity : 0, repeatDelay: 2 }}
        >
          <ShoppingBag className="h-5 w-5" />
        </motion.div>

        {/* Badge con animación mejorada */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute -top-1 -right-1 bg-terracotta text-cream text-xs h-5 w-5 rounded-full flex items-center justify-center font-bold shadow-md"
            >
              {totalItems}
              {/* Pulse effect */}
              <motion.span
                className="absolute inset-0 rounded-full bg-terracotta"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ opacity: 0.5 }}
              />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Mini sparkle cuando hay items */}
        {totalItems > 0 && (
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ rotate: 180 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0L14.59 8H24L16.41 14L20 24L12 17L4 24L7.59 14L0 8H9.41L12 0Z"
                fill="#fbbf24"
              />
            </svg>
          </motion.div>
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
                      <ShoppingBag className="h-12 w-12 text-terracotta" />
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
                      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus-visible:ring-2 focus-visible:ring-terracotta/30 rounded-lg"
                    >
                      <Button className="gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Ver Productos
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -100, scale: 0.9 }}
                          transition={{
                            layout: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }}
                          className="bg-white p-4 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
                        >
                          <div className="flex gap-4">
                            {/* Image con hover */}
                            <Link
                              href={`/productos/${item.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted group"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="80px"
                              />
                              {/* Shine effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                              />
                            </Link>

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
                                    ${getPriceNumber(item.price).toFixed(2)}{item.weight && ` • ${item.weight}`}
                                  </p>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1, rotate: 90 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeItem(item.id)}
                                  className="p-1 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors"
                                  aria-label={`Eliminar ${item.name} del carrito`}
                                  transition={{ type: 'spring', stiffness: 200 }}
                                >
                                  <X className="h-4 w-4" />
                                </motion.button>
                              </div>

                              {/* Quantity Controls con micro interacciones */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1.5 hover:bg-terracotta/10 rounded-md transition-colors disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                    aria-label="Reducir cantidad"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </motion.button>

                                  {/* Quantity badge con animación */}
                                  <AnimatePresence mode="wait">
                                    <motion.span
                                      key={item.quantity}
                                      className="w-8 text-center font-semibold text-sm"
                                      initial={{ scale: 0.8, rotate: -90 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      exit={{ scale: 0.8, rotate: 90 }}
                                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                      {item.quantity}
                                    </motion.span>
                                  </AnimatePresence>

                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1.5 hover:bg-terracotta/10 rounded-md transition-colors"
                                    aria-label="Aumentar cantidad"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </motion.button>
                                </div>

                                {/* Price con animación */}
                                <motion.p
                                  key={`${item.id}-${item.quantity}`}
                                  className="font-semibold text-terracotta"
                                  initial={{ scale: 1 }}
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 0.2 }}
                                >
                                  ${(getPriceNumber(item.price) * item.quantity).toFixed(2)}
                                </motion.p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-terracotta/20 p-6 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-terracotta text-2xl">
                      ${getPriceNumber(totalPrice).toFixed(2)} USD
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="cart-name" className="block text-sm font-medium mb-1.5 text-foreground">
                        Tu nombre *
                      </label>
                      <input
                        id="cart-name"
                        type="text"
                        placeholder="Ej: Ana García"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="cart-email" className="block text-sm font-medium mb-1.5 text-foreground">
                        Tu email *
                      </label>
                      <input
                        id="cart-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Savings message */}
                  {totalItems >= 2 && (
                    <div className="bg-green-50 text-green-800 text-sm px-4 py-2 rounded-lg text-center">
                      ✓ Estás ahorrando en envío combinado
                    </div>
                  )}

                  {/* Stripe Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStripeCheckout}
                    disabled={isProcessing}
                    className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Pagar con Tarjeta
                      </>
                    )}
                  </motion.button>

                  {/* WhatsApp Option */}
                  <a
                    href={`https://wa.me/13051234567?text=${encodeURIComponent(
                      `Hola Artes_Ana! 🌿 Me gustaría hacer un pedido:\n\n${items.map(item =>
                        `• ${item.name} (x${item.quantity}) - $${(getPriceNumber(item.price) * item.quantity).toFixed(2)}`
                      ).join('\n')}\n\n💰 Total: $${getPriceNumber(totalPrice).toFixed(2)}\n\n¿Me podrían confirmar disponibilidad y tiempo de entrega?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Button variant="whatsapp" size="lg" className="w-full gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Ordenar por WhatsApp
                    </Button>
                  </a>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pagos seguros con Stripe
                    </span>
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
