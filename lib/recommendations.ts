import { useRef } from 'react';
import { Product, ProductCategory } from './products';

export interface RecommendationScore {
  product: Product;
  score: number;
  reasons: string[];
}

interface RecommendationContext {
  recentlyViewed: Product[];
  cartItems: Product[];
  favorites: string[];
  currentProduct?: Product;
  userSkinType?: string[];
}

/**
 * Advanced product recommendation algorithm
 * Based on:
 * 1. Category affinity
 * 2. Skin type compatibility
 * 3. Frequently bought together
 * 4. Trending/popularity
 */
export function getRecommendedProducts(
  allProducts: Product[],
  context: RecommendationContext,
  limit: number = 4
): Product[] {
  const scored: RecommendationScore[] = allProducts
    .filter(p => {
      // Exclude current product
      if (context.currentProduct && p.id === context.currentProduct.id) {
        return false;
      }
      // Exclude items already in cart or favorites
      if (context.cartItems.some(item => item.id === p.id)) {
        return false;
      }
      if (context.favorites.includes(p.id as string)) {
        return false;
      }
      return true;
    })
    .map(product => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Category affinity (40 points max)
      if (context.currentProduct) {
        if (product.category === context.currentProduct.category) {
          score += 30;
          reasons.push('Misma categoría');
        } else if (isRelatedCategory(product.category, context.currentProduct.category)) {
          score += 15;
          reasons.push('Categoría relacionada');
        }
      }

      // 2. Skin type compatibility (30 points max)
      if (context.userSkinType && context.userSkinType.length > 0) {
        const matchingSkinTypes = product.skinType?.filter(s =>
          context.userSkinType!.some(ust => s.toLowerCase().includes(ust.toLowerCase()))
        );
        if (matchingSkinTypes && matchingSkinTypes.length > 0) {
          score += 10 * matchingSkinTypes.length;
          reasons.push(`Compatible con tu tipo de piel: ${matchingSkinTypes.join(', ')}`);
        }
      }

      // 3. Recently viewed affinity (20 points max)
      const relatedToViewed = context.recentlyViewed.some(viewed => {
        if (viewed.category === product.category) {
          score += 10;
          return true;
        }
        return false;
      });
      if (relatedToViewed) {
        reasons.push('Basado en tu historial');
      }

      // 4. Featured products boost (10 points)
      if (product.featured) {
        score += 10;
        reasons.push('Producto destacado');
      }

      // 5. In stock boost (5 points)
      if (product.inStock) {
        score += 5;
      }

      // 6. Badge boost (15 points)
      if (product.badge) {
        score += 15;
        reasons.push(`Producto ${product.badge}`);
      }

      // 7. New products (5 points) - for products created recently
      // (This would be based on createdAt field)

      return { product, score, reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(s => s.product);
}

/**
 * Check if two categories are related
 */
function isRelatedCategory(cat1: ProductCategory, cat2: ProductCategory): boolean {
  const relatedCategories: Record<ProductCategory, ProductCategory[]> = {
    'facial': ['terapeutico', 'jabones'],
    'terapeutico': ['facial', 'jabones'],
    'pet-care': ['jabones'],
    'energetico': ['terapeutico', 'jabones'],
    'jabones': ['facial', 'terapeutico', 'energetico', 'pet-care'],
  };

  return relatedCategories[cat1]?.includes(cat2) || false;
}

/**
 * Get "Frequently Bought Together" products
 */
export function getFrequentlyBoughtTogether(
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 3
): Product[] {
  // Mock frequently bought together logic
  // In production, this would be based on actual purchase data
  const categoryProducts = allProducts.filter(
    p => p.category === currentProduct.category && p.id !== currentProduct.id
  );

  // Also include related categories
  const relatedProducts = allProducts.filter(p => {
    if (p.id === currentProduct.id) return false;
    return isRelatedCategory(currentProduct.category, p.category);
  });

  return [...categoryProducts.slice(0, 2), ...relatedProducts.slice(0, 1)].slice(0, limit);
}

/**
 * Get product recommendations based on a specific skin type
 */
export function getProductsForSkinType(
  allProducts: Product[],
  skinType: string,
  limit: number = 6
): Product[] {
  const skinTypeLower = skinType.toLowerCase();

  return allProducts
    .filter(p =>
      p.skinType?.some(s => s.toLowerCase().includes(skinTypeLower)) ||
      p.benefits?.some(b => b.toLowerCase().includes(skinTypeLower))
    )
    .slice(0, limit);
}

/**
 * Get trending products (based on some algorithm)
 * For now, returns featured products
 */
export function getTrendingProducts(
  allProducts: Product[],
  limit: number = 4
): Product[] {
  return allProducts.filter(p => p.featured).slice(0, limit);
}

/**
 * Get new arrivals (would be based on createdAt field)
 */
export function getNewArrivals(
  allProducts: Product[],
  limit: number = 4
): Product[] {
  // Mock implementation - would sort by createdAt
  return allProducts.slice(0, limit);
}

/**
 * Recommendation context for tracking user behavior
 */
export class RecommendationEngine {
  private recentlyViewed: Product[] = [];
  private maxRecentlyViewed = 10;

  addViewedProduct(product: Product) {
    // Remove if already exists
    this.recentlyViewed = this.recentlyViewed.filter(p => p.id !== product.id);
    // Add to front
    this.recentlyViewed.unshift(product);
    // Limit size
    this.recentlyViewed = this.recentlyViewed.slice(0, this.maxRecentlyViewed);
  }

  getRecentlyViewed(): Product[] {
    return this.recentlyViewed;
  }

  clearRecentlyViewed() {
    this.recentlyViewed = [];
  }

  getRecommendations(
    allProducts: Product[],
    context: Partial<RecommendationContext>,
    limit: number = 4
  ): Product[] {
    return getRecommendedProducts(allProducts, {
      recentlyViewed: this.recentlyViewed,
      cartItems: context.cartItems || [],
      favorites: context.favorites || [],
      currentProduct: context.currentProduct,
      userSkinType: context.userSkinType,
    }, limit);
  }

  /**
   * Get "You might also like" recommendations
   */
  getYouMightAlsoLike(
    allProducts: Product[],
    currentProduct: Product,
    limit: number = 4
  ): Product[] {
    return this.getRecommendations(allProducts, { currentProduct }, limit);
  }

  /**
   * Get "Complete your routine" recommendations
   */
  getCompleteYourRoutine(
    allProducts: Product[],
    category: ProductCategory,
    limit: number = 3
  ): Product[] {
    const categoryProducts = allProducts.filter(p => p.category === category);
    const relatedProducts = allProducts.filter(p =>
      isRelatedCategory(category, p.category) && p.category !== category
    );

    return [
      ...categoryProducts.filter(p => !p.featured).slice(0, 2),
      ...relatedProducts.slice(0, 1)
    ].slice(0, limit);
  }

  /**
   * Get "Best rated" recommendations
   */
  getBestRated(allProducts: Product[], limit: number = 4): Product[] {
    // In production, this would be based on actual ratings
    return allProducts.filter(p => p.badge && (
      p.badge === 'BESTSELLER' || p.badge === 'POPULAR'
    )).slice(0, limit);
  }
}

/**
 * Hook to use recommendation engine
 */
export function useRecommendationEngine() {
  const engine = useRef(new RecommendationEngine());

  return {
    addViewedProduct: (product: Product) => {
      engine.current.addViewedProduct(product);
    },
    getRecommendations: (allProducts: Product[], context: Partial<RecommendationContext>, limit?: number) => {
      return engine.current.getRecommendations(allProducts, context, limit);
    },
    getRecentlyViewed: () => {
      return engine.current.getRecentlyViewed();
    },
    clearRecentlyViewed: () => {
      engine.current.clearRecentlyViewed();
    },
  };
}
