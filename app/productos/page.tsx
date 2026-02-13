'use client';

import { useState, useMemo, Suspense } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products, categoryInfo, type ProductCategory } from '@/lib/products';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todos'>(
    categoryParam || 'todos'
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'todos') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección completa de productos artesanales,
            cada pieza hecha con amor y dedicación.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('todos')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === 'todos'
                ? 'bg-terracotta text-cream'
                : 'bg-card border border-border hover:border-terracotta'
            }`}
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
            >
              {category.icon} {category.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No hay productos en esta categoría.
            </p>
          </div>
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
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
