import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts, categoryInfo } from '@/lib/products';
import { Sparkles, Heart, Leaf, Truck } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cream py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Productos Artesanales
              <span className="block text-terracotta mt-2">Hechos con Amor</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Descubre nuestra colección de jabones, velas, cerámica y tejidos.
              Cada pieza es única, elaborada a mano con ingredientes naturales y
              mucho cariño.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/productos">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta/90">
                  Ver Catálogo
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Nuestra Historia
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-card border-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start space-x-3">
              <div className="bg-sage/20 p-3 rounded-full">
                <Heart className="h-6 w-6 text-sage" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Hecho a Mano</h3>
                <p className="text-sm text-muted-foreground">Cada pieza es única</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-terracotta/20 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-terracotta" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">100% Natural</h3>
                <p className="text-sm text-muted-foreground">Ingredientes puros</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-lavender/20 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-lavender" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Sin Plásticos</h3>
                <p className="text-sm text-muted-foreground">Envases eco</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-foreground/10 p-3 rounded-full">
                <Truck className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Envío Rápido</h3>
                <p className="text-sm text-muted-foreground">24-48h península</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Productos Destacados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestra selección favorita de productos artesanales
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/productos">
              <Button size="lg" variant="outline">
                Ver Todos los Productos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora todas nuestras colecciones artesanales
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(categoryInfo).map(([key, category]) => (
              <Link
                key={key}
                href={`/productos?categoria=${key}`}
                className="group bg-card p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <span className="text-5xl mb-4 block">{category.icon}</span>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-terracotta transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Nuestra Historia
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              SoapArtesana nació de la pasión por lo artesanal y el respeto
              por la naturaleza. En nuestro taller, elaboramos cada producto
              con métodos tradicionales, utilizando ingredientes que la tierra
              nos regala.
            </p>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Conocer Más
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-terracotta text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            ¿Lista para Descubrir?
          </h2>
          <p className="text-cream/90 max-w-2xl mx-auto mb-8">
            Explora nuestro catálogo completo o escríbenos por WhatsApp
            para recomendaciones personalizadas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/productos">
              <Button size="lg" variant="secondary" className="bg-cream text-terracotta hover:bg-cream/90">
                Ver Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
