'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/EmptyState';
import { products, categoryInfo, type Product, type ProductCategory } from '@/lib/products';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todos'>(
    categoryParam || 'todos'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Apply URL params on mount
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Base filtered products from category and search
  const baseFilteredProducts = useMemo(() => {
    let results = selectedCategory === 'todos'
      ? products
      : products.filter(p => p.category === selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.benefits?.some(b => b.toLowerCase().includes(query)) ||
        p.ingredients?.some(i => i.toLowerCase().includes(query))
      );
    }

    return results;
  }, [selectedCategory, searchQuery]);

  // Sync filtered products with base filtered products
  useEffect(() => {
    setFilteredProducts(baseFilteredProducts);
  }, [baseFilteredProducts]);

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="py-4 md:py-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-terracotta via-terracotta/90 to-forest/80 py-8 md:py-12 mb-6">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-cream drop-shadow-sm">
              Catálogo de Productos
            </h1>
            <p className="text-cream/90 text-base md:text-lg mb-6 max-w-2xl mx-auto">
              Explora nuestra colección completa de productos artesanales,
              cada pieza hecha con amor y dedicación.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-terracotta/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, ingrediente o beneficio..."
                  className="w-full pl-14 pr-12 py-4 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-white/50 focus:bg-white outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  aria-label="Buscar productos"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-cream/80 transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              {searchQuery && baseFilteredProducts.length > 0 && (
                <p className="text-sm text-cream/80 mt-3 text-center font-medium">
                  {baseFilteredProducts.length} {baseFilteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Products Section */}
        <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedCategory('todos')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === 'todos'
                    ? 'bg-terracotta text-black border-2 border-black shadow-md hover:shadow-lg hover:scale-105'
                    : 'bg-card border border-border hover:border-terracotta hover:bg-terracotta/5'
                }`}
                aria-label="Ver todos los productos"
              >
                Todos
              </button>
              {Object.entries(categoryInfo).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as ProductCategory)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === key
                      ? 'bg-terracotta text-black border-2 border-black shadow-md hover:shadow-lg hover:scale-105'
                      : 'bg-card border border-border hover:border-terracotta hover:bg-terracotta/5'
                  }`}
                  aria-label={`Filtrar por ${category.name}`}
                >
                  {category.icon} {category.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                type="products"
                title={searchQuery ? "No hay resultados de búsqueda" : "No hay productos en esta categoría"}
                description={searchQuery
                  ? `No encontramos productos que coincidan con "${searchQuery}". Intenta con otros términos o explora todas las categorías.`
                  : "No encontramos productos con los filtros seleccionados. Por intenta con otros filtros."
                }
                action={
                  <div className="flex gap-3 justify-center flex-wrap">
                    {searchQuery && (
                      <Button onClick={clearSearch} variant="outline">
                        Limpiar búsqueda
                      </Button>
                    )}
                    <Button onClick={() => {
                      setSelectedCategory('todos');
                      setSearchQuery('');
                    }}>
                      Ver todos los productos
                    </Button>
                  </div>
                }
              />
            )}

            {/* Category Info */}
            {selectedCategory !== 'todos' && categoryInfo[selectedCategory] && (
              <div className="mt-16 bg-muted/30 rounded-xl p-8 text-center">
                <span className="text-6xl mb-4 block">
                  {categoryInfo[selectedCategory].icon}
                </span>
                <h2 className="font-serif text-2xl font-bold mb-2">
                  {categoryInfo[selectedCategory].name}
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {categoryInfo[selectedCategory].description}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
