'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/components/ComparisonContext';
import { Product, getPriceNumber } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Scale } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ComparisonSidebar() {
  const { compareList, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useComparison();

  // Get all unique features to compare
  const getAllFeatures = () => {
    const features = new Set<string>();
    compareList.forEach(product => {
      product.benefits?.forEach(b => features.add(b));
      product.skinType?.forEach(s => features.add(`Piel: ${s}`));
    });
    return Array.from(features);
  };

  const features = getAllFeatures();

  return (
    <Sheet open={isCompareOpen} onOpenChange={setIsCompareOpen}>
      <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-terracotta" />
                Comparar Productos ({compareList.length}/3)
              </SheetTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Compara hasta 3 productos lado a lado
              </p>
            </div>
            {compareList.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                Limpiar todo
              </Button>
            )}
          </div>
        </SheetHeader>

        <AnimatePresence>
          {compareList.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Scale className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay productos para comparar</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Agrega productos desde la lista para comparar sus características
              </p>
              <Link href="/productos" onClick={() => setIsCompareOpen(false)}>
                <Button>Ver Productos</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              {/* Products grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {compareList.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative"
                  >
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Eliminar de comparación"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="bg-gray-50 rounded-lg p-4 h-full">
                      <div className="relative aspect-square bg-cream rounded-lg overflow-hidden mb-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-terracotta text-white text-xs px-2 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</h4>
                      <p className="text-terracotta font-bold">${getPriceNumber(product.price).toFixed(2)}</p>

                      <Link
                        href={`/productos/${product.slug}`}
                        onClick={() => setIsCompareOpen(false)}
                        className="block mt-3 text-xs text-center bg-white border border-gray-200 rounded-md py-2 hover:bg-gray-50 transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Comparison table */}
              <div className="border rounded-lg overflow-hidden">
                {/* Price row */}
                <div className="grid grid-cols-4 border-b bg-gray-50">
                  <div className="p-3 font-semibold text-sm">Precio</div>
                  {compareList.map((product) => (
                    <div key={`price-${product.id}`} className="p-3 text-sm">
                      <span className="font-bold text-terracotta">
                        ${getPriceNumber(product.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Category row */}
                <div className="grid grid-cols-4 border-b">
                  <div className="p-3 font-semibold text-sm">Categoría</div>
                  {compareList.map((product) => (
                    <div key={`category-${product.id}`} className="p-3 text-sm capitalize">
                      {product.category}
                    </div>
                  ))}
                </div>

                {/* Weight row */}
                <div className="grid grid-cols-4 border-b bg-gray-50">
                  <div className="p-3 font-semibold text-sm">Peso</div>
                  {compareList.map((product) => (
                    <div key={`weight-${product.id}`} className="p-3 text-sm">
                      {product.weight || '-'}
                    </div>
                  ))}
                </div>

                {/* Benefits rows */}
                {features.slice(0, 5).map((feature) => (
                  <div key={feature} className="grid grid-cols-4 border-b last:border-b-0">
                    <div className="p-3 font-semibold text-sm text-xs">{feature}</div>
                    {compareList.map((product) => {
                      const hasFeature = product.benefits?.some(b => b.includes(feature.replace('Piel: ', ''))) ||
                                        product.skinType?.some(s => feature.includes(s));
                      return (
                        <div key={`${product.id}-${feature}`} className="p-3 text-sm">
                          {hasFeature ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {compareList.length > 0 && (
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsCompareOpen(false)}
            >
              Seguir comparando
            </Button>
            <Button
              onClick={() => {
                setIsCompareOpen(false);
                // Redirect to products page or open WhatsApp
              }}
              className="bg-terracotta text-white hover:bg-terracotta/90"
            >
              Consultar por WhatsApp
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

/**
 * CompareCheckbox - Checkbox to add products to comparison
 */
interface CompareCheckboxProps {
  product: Product;
}

export function CompareCheckbox({ product }: CompareCheckboxProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (isInCompare(product.id)) {
          removeFromCompare(product.id);
        } else {
          addToCompare(product);
        }
      }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        isInCompare(product.id)
          ? 'bg-terracotta text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      aria-label={isInCompare(product.id) ? 'Eliminar de comparación' : 'Agregar a comparación'}
    >
      <Scale className="h-3 w-3" />
      {isInCompare(product.id) ? 'Comparando' : 'Comparar'}
    </motion.button>
  );
}
