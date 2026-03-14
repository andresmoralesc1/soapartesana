'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product, getPriceNumber, categoryInfo } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, ChevronRight, X, Sparkles } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useFavorites } from '@/components/FavoritesContext';
import { useState } from 'react';

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ product, open, onOpenChange }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setShowCartSuccess(true);
      setTimeout(() => setShowCartSuccess(false), 2000);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      toggleFavorite(product.id);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-0"
        >
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-cream">
            <Image
              src={product.image}
              alt={`Jabón artesanal ${product.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-[oklch(0.62_0.16_45)] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
                >
                  {product.badge}
                </motion.span>
              )}
              {product.handmade && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
                >
                  Hecho a mano
                </motion.span>
              )}
            </div>

            {/* Favorite button */}
            <motion.button
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <AnimatePresence mode="wait">
                {isFavorite(product.id) ? (
                  <motion.div
                    key="liked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unliked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Heart className="h-5 w-5 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Stock indicator */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium">
                  Agotado
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Category link */}
            <Link
              href={`/productos?categoria=${product.category}`}
              className="text-sm text-muted-foreground hover:text-forest transition-colors mb-2"
            >
              {categoryInfo[product.category].name}
            </Link>

            {/* Title */}
            <DialogTitle className="font-serif text-2xl md:text-3xl font-bold mb-3">
              {product.name}
            </DialogTitle>

            {/* Price */}
            <DialogDescription asChild>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-[oklch(0.62_0.16_45)]">
                  ${getPriceNumber(product.price).toFixed(2)}
                </span>
                {product.weight && (
                  <span className="text-sm text-muted-foreground">/ {product.weight}</span>
                )}
              </div>
            </DialogDescription>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.fullDescription || product.description}
            </p>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[oklch(0.62_0.16_45)]" />
                  Beneficios
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-sage/20 text-forest px-3 py-1 rounded-full"
                    >
                      ✓ {benefit}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <h4 className="font-semibold mb-2">Ingredientes</h4>
                <p className="text-sm text-muted-foreground">
                  {product.ingredients.join(', ')}
                </p>
              </motion.div>
            )}

            {/* Skin type */}
            {product.skinType && product.skinType.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h4 className="font-semibold mb-2">Tipo de piel</h4>
                <div className="flex flex-wrap gap-2">
                  {product.skinType.map((skin, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-rose-50 text-rose-700 px-3 py-1 rounded-full"
                    >
                      {skin}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="mt-auto space-y-3">
              {/* Add to cart button */}
              <Button
                size="lg"
                className="w-full bg-[oklch(0.62_0.16_45)] text-white hover:bg-[oklch(0.62_0.16_45)]/90 font-semibold"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <AnimatePresence mode="wait">
                  {showCartSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center gap-2"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Agregado
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cart"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      Agregar al carrito
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* View details button */}
              <Link href={`/productos/${product.slug}`} onClick={() => onOpenChange(false)}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-forest text-forest hover:bg-forest hover:text-white font-semibold"
                >
                  Ver detalles completos
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/13524979992?text=${encodeURIComponent(
                  `Hola Artes_Ana! 🌿 Me interesa el producto: ${product.name}. ¿Podrían darme más información?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full text-[#25D366] hover:bg-[#25D366]/10 font-semibold"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
