'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryInfo, getFeaturedProductsForCategory } from '@/lib/categories';
import { Product } from '@/lib/products';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface MegaMenuProps {
  trigger: React.ReactNode;
  category: string;
}

export function MegaMenu({ trigger, category }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoryInfo = getCategoryInfo(category);
  const products = getFeaturedProductsForCategory(category, 3);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-pointer">{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${categoryInfo.color} p-6`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{categoryInfo.icon}</span>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-800">
                    {categoryInfo.name}
                  </h3>
                  <p className="text-sm text-slate-600">{categoryInfo.description}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/productos/${product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block group"
                    >
                      <div className="relative aspect-square bg-cream rounded-xl overflow-hidden mb-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="200px"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-terracotta text-white text-xs px-2 py-1 rounded-full font-medium">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-sm text-slate-800 group-hover:text-terracotta transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-terracotta font-bold text-sm">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View all link */}
              <Link
                href={`/productos?categoria=${category}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors font-medium text-slate-700"
              >
                Ver todos los productos de {categoryInfo.name}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * MegaMenuNav - Complete navigation with mega menus for all categories
 */
export function MegaMenuNav() {
  const categories = [
    { id: 'pet-care', label: 'Pet Care' },
    { id: 'facial', label: 'Línea Facial' },
    { id: 'terapeutico', label: 'Terapéutico' },
    { id: 'jabones', label: 'Jabones' },
    { id: 'energetico', label: 'Energético' },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {categories.map((category) => (
        <MegaMenu
          key={category.id}
          category={category.id}
          trigger={
            <button className="text-foreground/80 hover:text-foreground transition-colors font-medium px-4 py-2 rounded-lg hover:bg-terracotta/10 relative group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus-visible:ring-2 focus-visible:ring-terracotta/30">
              <span className="flex items-center gap-2">
                {category.label}
                <motion.svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    d="M5 7l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
            </button>
          }
        />
      ))}
    </nav>
  );
}
