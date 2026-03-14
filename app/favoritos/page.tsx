'use client';

import { useFavorites } from '@/components/FavoritesContext';
import { ProductCard } from '@/components/ProductCard';
import { Heart, Share2, Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getPriceNumber } from '@/lib/products';
import { useState } from 'react';

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  // Get full product details from slugs
  // Note: In a real implementation, you'd fetch this from your products API
  // For now, we'll show a placeholder for the implementation

  const handleShare = async () => {
    const shareText = `¡Mi lista de deseos de Artes_Ana! 🌿\n\n${Array.from(favorites).map(slug => {
      // This would need to fetch actual product details
      return `• Producto: ${slug}`;
    }).join('\n')}\n\nVer más en: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi lista de deseos - Artes_Ana',
          text: shareText,
          url: window.location.href,
        });
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-800">
              Mis Favoritos
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {favorites.size === 0
              ? 'Aún no tienes productos favoritos. Explora nuestro catálogo y guarda los que más te gusten.'
              : `Tienes ${favorites.size} producto${favorites.size === 1 ? '' : 's'} guardado${favorites.size === 1 ? '' : 's'} en tu lista de deseos.`
            }
          </p>
        </motion.div>

        {/* Empty State */}
        {favorites.size === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="bg-rose-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-12 w-12 text-rose-300" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-3">
                  Tu lista de favoritos está vacía
                </h3>
                <p className="text-muted-foreground mb-6">
                  Explora nuestra colección de jabones artesanales y guarda tus favoritos para encontrarlos fácilmente más tarde.
                </p>
                <Link href="/productos">
                  <Button className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Explorar Productos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Actions Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Compartir lista
                </Button>
                <Button
                  variant="ghost"
                  onClick={clearFavorites}
                  className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Limpiar todo
                </Button>
              </div>

              {showShareSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  ✓ Lista copiada al portapapeles
                </motion.div>
              )}
            </motion.div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from(favorites).map((slug, index) => (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Placeholder - In real implementation, you'd render ProductCard */}
                  <Card className="overflow-hidden">
                    <div className="relative aspect-square bg-cream">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Producto: {slug}
                      </div>
                      <button
                        onClick={() => removeFavorite(slug)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        aria-label="Eliminar de favoritos"
                      >
                        <Trash2 className="h-4 w-4 text-rose-500" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    ¿Tienes dudas sobre tus favoritos?
                  </h3>
                  <p className="text-green-800 mb-6">
                    Escríbenos por WhatsApp y te ayudaremos a elegir el producto perfecto para ti.
                  </p>
                  <a
                    href={`https://wa.me/13524979992?text=${encodeURIComponent(
                      `Hola Artes_Ana! 🌿 Tengo ${favorites.size} productos en mi lista de favoritos y me gustaría recibir asesoría.\n\nMis favoritos:\n${Array.from(favorites).join('\n')}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2 bg-[#25D366] hover:bg-[#20BA5A]">
                      <Share2 className="h-4 w-4" />
                      Consultar por WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
