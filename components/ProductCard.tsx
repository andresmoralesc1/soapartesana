'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <Card className="group overflow-hidden border-border/50 hover:border-terracotta transition-all duration-300 hover:shadow-2xl bg-card">
        <Link href={`/productos/${product.slug}`}>
          <motion.div
            className="relative aspect-square overflow-hidden bg-cream"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.handmade && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-terracotta text-cream text-xs px-3 py-1.5 rounded-full font-medium shadow-lg"
                >
                  Artesanal
                </motion.span>
              )}
            </div>

            {/* Quick actions overlay */}
            <motion.div
              className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: 20, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
                />
              </motion.button>
            </motion.div>

            {!product.inStock && (
              <div className="absolute inset-0 bg-foreground/70 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-foreground text-cream px-4 py-2 rounded-lg font-medium">
                  Agotado
                </span>
              </div>
            )}
          </motion.div>
        </Link>

        <CardContent className="p-4">
          <Link href={`/productos/${product.slug}`}>
            <motion.h3
              className="font-serif text-lg font-semibold mb-1 group-hover:text-terracotta transition-colors"
              whileHover={{ x: 2 }}
            >
              {product.name}
            </motion.h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[40px]">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <motion.p
              className="text-2xl font-bold text-terracotta"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {product.price.toFixed(2)}€
            </motion.p>
            {product.weight && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {product.weight}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 gap-2">
          <Link href={`/productos/${product.slug}`} className="flex-1">
            <Button
              className="w-full bg-terracotta hover:bg-terracotta/90 text-cream shadow-md hover:shadow-lg transition-all"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Ver detalles' : 'Agotado'}
            </Button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-sage/20 hover:bg-sage/30 text-sage p-3 rounded-lg transition-colors disabled:opacity-50"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
