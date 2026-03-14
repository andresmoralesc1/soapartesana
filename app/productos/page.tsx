'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/EmptyState';
import { FilterSidebar } from '@/components/FilterSidebar';
import { products, categoryInfo, type Product, type ProductCategory } from '@/lib/products';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todos'>(
    categoryParam || 'todos'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply URL params on mount
  useState(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  });

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

  // Update when filters change
  const handleFilterChange = (filtered: Product[]) => {
    setFilteredProducts(filtered);
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección completa de productos artesanales,
            cada pieza hecha con amor y dedicación.
          </p>
        </div>

        {/* Search Bar and Filter Toggle */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, ingrediente o beneficio..."
              className="w-full pl-12 pr-12 py-3 rounded-full border border-border bg-card focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none transition-all"
              aria-label="Buscar productos"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          {searchQuery && baseFilteredProducts.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {baseFilteredProducts.length} {baseFilteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} productos
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar
              products={baseFilteredProducts}
              onFilter={handleFilterChange}
              isOpen={true}
              onClose={() => {}}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedCategory('todos')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === 'todos'
                    ? 'bg-terracotta text-cream'
                    : 'bg-card border border-border hover:border-terracotta'
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
                      ? 'bg-terracotta text-cream'
                      : 'bg-card border border-border hover:border-terracotta'
                  }`}
                  aria-label={`Filtrar por ${category.name}`}
                >
                  {category.icon} {category.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredProducts.length} de {baseFilteredProducts.length} productos
              </p>
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

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        products={baseFilteredProducts}
        onFilter={handleFilterChange}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
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
