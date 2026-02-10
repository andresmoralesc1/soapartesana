'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-terracotta transition-all duration-300 hover:shadow-lg">
      <Link href={`/productos/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-cream">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.handmade && (
            <span className="absolute top-3 left-3 bg-terracotta text-cream text-xs px-2 py-1 rounded-full font-medium">
              Artesanal
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
              <span className="bg-foreground text-cream px-4 py-2 rounded font-medium">
                Agotado
              </span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold mb-1 group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>
        <p className="text-lg font-bold text-terracotta">
          {product.price.toFixed(2)}€
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/productos/${product.slug}`} className="w-full">
          <Button className="w-full bg-terracotta hover:bg-terracotta/90" disabled={!product.inStock}>
            {product.inStock ? 'Ver detalles' : 'Agotado'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
