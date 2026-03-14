'use client';

import { use, useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Sparkles, TrendingUp, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, type Product } from '@/lib/products';
import { useRecommendationEngine } from '@/lib/recommendations';
import { useFavorites } from '@/components/FavoritesContext';
import { useCart } from '@/components/CartContext';

interface RecommendedProductsProps {
  currentProduct?: Product;
  title?: string;
  subtitle?: string;
  limit?: number;
  variant?: 'related' | 'trending' | 'routine' | 'best-rated';
}

export function RecommendedProducts({
  currentProduct,
  title,
  subtitle,
  limit = 4,
  variant = 'related',
}: RecommendedProductsProps) {
  const { addViewedProduct, getRecommendations, getRecentlyViewed } = useRecommendationEngine();
  const { favorites } = useFavorites();
  const { items: cartItems } = useCart();
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    if (currentProduct) {
      addViewedProduct(currentProduct);
    }
  }, [currentProduct, addViewedProduct]);

  useEffect(() => {
    let recs: Product[] = [];

    switch (variant) {
      case 'related':
        recs = getRecommendations(products, {
          currentProduct,
          cartItems,
          favorites: Array.from(favorites).map(String),
        }, limit);
        break;
      case 'trending':
        recs = products.filter(p => p.featured).slice(0, limit);
        break;
      case 'routine':
        if (currentProduct) {
          const engine = (useRecommendationEngine as any)();
          recs = engine.current.getCompleteYourRoutine(products, currentProduct.category, limit);
        }
        break;
      case 'best-rated':
        recs = products.filter(p => p.badge && (p.badge === 'BESTSELLER' || p.badge === 'POPULAR')).slice(0, limit);
        break;
    }

    setRecommended(recs);
  }, [currentProduct, variant, limit, favorites, cartItems]);

  if (recommended.length === 0) {
    return null;
  }

  const defaultTitles = {
    related: 'También te puede gustar',
    trending: 'Tendencias',
    routine: 'Completa tu rutina',
    'best-rated': 'Mejor valorados',
  };

  const icons = {
    related: Sparkles,
    trending: TrendingUp,
    routine: Clock,
    'best-rated': Award,
  };

  const Icon = icons[variant];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Icon className="h-5 w-5 text-terracotta" />
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
              {title || defaultTitles[variant]}
            </h3>
          </div>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {recommended.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * RecentlyViewedProducts - Shows products the user has recently viewed
 */
export function RecentlyViewedProducts() {
  const { getRecentlyViewed, clearRecentlyViewed } = useRecommendationEngine();
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
  }, [getRecentlyViewed]);

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-terracotta" />
            <h3 className="font-serif text-xl font-bold">Visto recientemente</h3>
          </div>
          <button
            onClick={() => {
              clearRecentlyViewed();
              setRecentlyViewed([]);
            }}
            className="text-sm text-terracotta hover:underline"
          >
            Limpiar
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {recentlyViewed.slice(0, 5).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 w-48"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * PersonalizedRecommendations - Shows recommendations based on user behavior
 */
export function PersonalizedRecommendations() {
  const { favorites } = useFavorites();
  const { items: cartItems } = useCart();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [userSkinType, setUserSkinType] = useState<string[]>([]);

  useEffect(() => {
    // Infer user skin type from favorites (if they have skinType info)
    const inferredSkinTypes = new Set<string>();
    favorites.forEach((favId) => {
      const product = products.find(p => p.id === favId);
      product?.skinType?.forEach(s => inferredSkinTypes.add(s));
    });

    if (inferredSkinTypes.size > 0) {
      setUserSkinType(Array.from(inferredSkinTypes));
    }

    // Get recommendations
    const { getRecommendations: getRecs } = useRecommendationEngine();
    const recs = getRecs(products, {
      favorites: Array.from(favorites).map(String),
      cartItems,
      userSkinType: Array.from(inferredSkinTypes),
    }, 4);

    setRecommendations(recs);
  }, [favorites, cartItems]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-terracotta" />
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
              Recomendado para ti
            </h3>
          </div>
          <p className="text-muted-foreground">
            Basado en tus favoritos y historial de navegación
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
