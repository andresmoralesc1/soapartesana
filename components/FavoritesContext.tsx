'use client';

import * as React from 'react';

const FAVORITES_KEY = 'artes_ana_favorites';

export interface FavoritesContextValue {
  favorites: Set<string | number>;
  toggleFavorite: (productId: string | number) => void;
  removeFavorite: (productId: string | number) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string | number) => boolean;
  getFavoriteCount: () => number;
}

const FavoritesContext = React.createContext<FavoritesContextValue | undefined>(undefined);

export function useFavorites() {
  const context = React.useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}

// Safe localStorage operations (SSR compatible)
const storage = {
  get: (): Set<string | number> => {
    if (typeof window === 'undefined') return new Set();
    try {
      const item = localStorage.getItem(FAVORITES_KEY);
      return item ? new Set(JSON.parse(item)) : new Set();
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return new Set();
    }
  },
  set: (favorites: Set<string | number>) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  },
};

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<Set<string | number>>(() => storage.get());
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initialize on mount (client-side only)
  React.useEffect(() => {
    setFavorites(storage.get());
    setIsInitialized(true);
  }, []);

  // Persist to localStorage whenever favorites change
  React.useEffect(() => {
    if (isInitialized) {
      storage.set(favorites);
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = React.useCallback((productId: string | number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = React.useCallback((productId: string | number) => {
    return favorites.has(productId);
  }, [favorites]);

  const getFavoriteCount = React.useCallback(() => {
    return favorites.size;
  }, [favorites]);

  const removeFavorite = React.useCallback((productId: string | number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(productId);
      return newFavorites;
    });
  }, []);

  const clearFavorites = React.useCallback(() => {
    setFavorites(new Set());
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
        getFavoriteCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
