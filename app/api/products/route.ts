import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// GET all products (public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const slug = searchParams.get('slug');

    let result;

    if (slug) {
      // Get single product by slug
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.slug, slug))
        .limit(1);
      return NextResponse.json(product || null);
    }

    if (category) {
      // Get products by category
      result = await db
        .select()
        .from(products)
        .where(eq(products.category, category))
        .orderBy(products.createdAt);
    } else if (featured === 'true') {
      // Get featured products
      result = await db
        .select()
        .from(products)
        .where(eq(products.featured, true))
        .orderBy(products.createdAt);
    } else {
      // Get all products
      result = await db.select().from(products).orderBy(products.createdAt);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
