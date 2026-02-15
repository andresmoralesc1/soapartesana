'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/components/CartContext';

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
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <Card className="group overflow-hidden border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white">
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
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge artesanal */}
            <div className="absolute top-3 left-3">
              {product.badge && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
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
                transition={{ delay: 0.2 + index * 0.05 }}
                className="bg-[oklch(0.62_0.16_45)] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
              >
                Artesanal
              </motion.span>
            )}

            {/* Button de like */}
            <motion.button
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition-colors"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
            >
              <Heart
                className={`h-4 w-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-700'}`}
              />
            </motion.button>

            {/* Out of stock overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium">
                  Agotado
                </span>
              </div>
            )}
          </motion.div>
        </Link>

        <CardContent className="p-5">
          <Link href={`/productos/${product.slug}`}>
            <motion.h3
              className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-[oklch(0.62_0.16_45)] transition-colors"
              whileHover={{ x: 2 }}
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
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {product.price.toFixed(2)}€
              {product.weight && (
                <span className="text-sm font-normal text-gray-500"> / {product.weight}</span>
              )}
            </motion.p>
            {product.benefits && product.benefits[0] && (
              <span className="text-xs text-[oklch(0.55_0.14_155)] bg-green-50 px-2 py-1 rounded-full font-medium">
                ✓ {product.benefits[0]}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 gap-3">
          <Link href={`/productos/${product.slug}`} className="flex-1">
            <button
              className="w-full bg-[oklch(0.62_0.16_45)] hover:bg-[oklch(0.57_0.16_45)] text-white shadow-md hover:shadow-lg transition-all font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!product.inStock}
            >
              Ver detalles
            </button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 hover:bg-[oklch(0.68_0.10_165)] text-gray-700 p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <AnimatePresence>
              {showCartSuccess ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
            </AnimatePresence>
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
