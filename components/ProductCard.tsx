'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product, getPriceNumber } from '@/lib/products';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartContext';

export { ProductCardSkeleton } from './ProductCardSkeleton';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Colores directos oklch
const colors = {
  terracotta: 'oklch(0.62 0.16 45)',
  terracottaLight: 'oklch(0.62 0.16_45)',
  forest: 'oklch(0.55 0.14 155)',
  forestLight: 'oklch(0.55_0.14_155)',
  slate: '#64748b',
  slateLight: '#f1f5f9',
  white: '#ffffff',
  cream: 'oklch(0.98 0.01 120)',
  rose: '#f43f5e',
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const { addItem } = useCart();

  // Detect touch device
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Mouse tracking for 3D tilt effect (disabled on touch devices)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return; // Disable on touch devices
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = () => {
    addItem(product);
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
    >
      <Card className={`group overflow-hidden border-gray-200 ${isTouch ? '' : 'hover:shadow-2xl'} transition-all duration-300 bg-white relative`}>
        {/* Sparkle effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-terracotta rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0,
                opacity: 0,
              }}
              whileHover={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <Link href={`/productos/${product.slug}`}>
          <motion.div
            className="relative aspect-square overflow-hidden bg-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product.image}
              alt={`Jabón artesanal ${product.name}. ${product.description}`}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsImageLoaded(true)}
            />
            {/* Loading skeleton */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
            )}

            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.8 }}
            />

            {/* Badge artesanal */}
            <div className="absolute top-3 left-3">
              {product.badge && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[oklch(0.62_0.16_45)] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
                >
                  {product.badge}
                </motion.span>
              )}
            </div>

            {/* Badge HANDMADE */}
            {product.handmade && !product.badge && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[oklch(0.62_0.16_45)] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
              >
                Artesanal
              </motion.span>
            )}

            {/* Like button con micro interacción */}
            <motion.button
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-20 min-h-[44px] min-w-[44px]"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200 }}
              whileHover={isTouch ? {} : { scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              aria-label={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <AnimatePresence mode="wait">
                {isLiked ? (
                  <motion.div
                    key="liked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unliked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Heart className="h-4 w-4 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Out of stock overlay */}
            {!product.inStock && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-slate-900/70 flex items-center justify-center backdrop-blur-sm"
              >
                <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium">
                  Agotado
                </span>
              </motion.div>
            )}
          </motion.div>
        </Link>

        <CardContent className="p-5">
          <Link href={`/productos/${product.slug}`}>
            <motion.h3
              className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-[oklch(0.62_0.16_45)] transition-colors"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {product.name}
            </motion.h3>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <motion.p
              className="text-2xl font-bold text-[oklch(0.62_0.16_45)]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              ${getPriceNumber(product.price).toFixed(2)}
              {product.weight && (
                <span className="text-sm font-normal text-gray-500"> / {product.weight}</span>
              )}
            </motion.p>
            {product.benefits && product.benefits[0] && (
              <motion.span
                className="text-xs text-[oklch(0.55_0.14_155)] bg-green-50 px-2 py-1 rounded-full font-medium inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                ✓ {product.benefits[0]}
              </motion.span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 gap-3">
          <Link href={`/productos/${product.slug}`} className="flex-1">
            <Button
              variant="default"
              className="w-full"
              disabled={!product.inStock}
            >
              Ver detalles
            </Button>
          </Link>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="secondary"
              size="icon"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <AnimatePresence mode="wait">
                {showCartSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cart"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </CardFooter>

        {/* Bottom accent bar on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-terracotta to-amber-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
}
