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
                    >
                      <Button className="gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Ver Productos
                      </Button>
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
                                  ${getPriceNumber(item.price).toFixed(2)}{item.weight && ` • ${item.weight}`}
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
                                ${(getPriceNumber(item.price) * item.quantity).toFixed(2)}
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
                      ${getPriceNumber(totalPrice).toFixed(2)} USD
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Tu nombre *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Tu email *"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                    />
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
