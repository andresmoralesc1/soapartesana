import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug, products, categoryInfo } from '@/lib/products';
import { ArrowLeft, Heart, Truck, RefreshCw } from 'lucide-react';
import { ProductStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Structured Data for SEO */}
      <ProductStructuredData product={product} />
      <BreadcrumbStructuredData
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Productos', href: '/productos' },
          { name: categoryInfo[product.category].name, href: `/productos?categoria=${product.category}` },
          { name: product.name, href: `/productos/${product.slug}` },
        ]}
      />

      <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link href="/productos" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-cream rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={`Fotografía del producto ${product.name}, jabón artesanal ${product.handmade ? 'hecho a mano' : ''} con ingredientes ${product.ingredients?.slice(0, 2).join(' y ') || 'naturales'}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square bg-cream rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`${product.name} - Vista adicional ${idx + 1}, mostrando detalles del jabón artesanal`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Link
                href={`/productos?categoria=${product.category}`}
                className="text-sm text-muted-foreground hover:text-forest transition-colors"
              >
                {categoryInfo[product.category].name}
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-forest">
                {product.price.toFixed(2)}€
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.fullDescription || product.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {product.handmade && (
                <span className="bg-sage/20 text-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                  Hecho a mano
                </span>
              )}
              {product.inStock ? (
                <span className="bg-sage/20 text-forest px-4 py-1.5 rounded-full text-sm font-medium">
                  En stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-4 py-1.5 rounded-full text-sm font-medium">
                  Agotado
                </span>
              )}
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6 space-y-4">
                {product.ingredients && (
                  <div>
                    <h3 className="font-semibold mb-2">Ingredientes</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.ingredients.join(', ')}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {product.dimensions && (
                    <div>
                      <span className="text-muted-foreground">Dimensiones:</span>
                      <p className="font-medium">{product.dimensions}</p>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <span className="text-muted-foreground">Peso:</span>
                      <p className="font-medium">{product.weight}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/13051234567?text=${encodeURIComponent(
                `Hola Artes_Ana! 🌿 Me interesa el producto: ${product.name}. ¿Podrían darme más información?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                disabled={!product.inStock}
              >
                Pedir por WhatsApp
              </Button>
            </a>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="bg-muted/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Heart className="h-5 w-5 text-forest" />
                </div>
                <p className="text-xs text-muted-foreground">Hecho con amor</p>
              </div>
              <div className="text-center">
                <div className="bg-muted/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-5 w-5 text-forest" />
                </div>
                <p className="text-xs text-muted-foreground">Envío rápido</p>
              </div>
              <div className="text-center">
                <div className="bg-muted/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <RefreshCw className="h-5 w-5 text-forest" />
                </div>
                <p className="text-xs text-muted-foreground">100% natural</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/productos/${p.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square bg-cream">
                      <Image
                        src={p.image}
                        alt={`${p.name} - ${p.description}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium group-hover:text-forest transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-forest font-bold mt-1">
                        {p.price.toFixed(2)}€
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
