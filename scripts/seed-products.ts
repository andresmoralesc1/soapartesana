import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { products } from '../lib/db/schema';
import { products as localProducts } from '../lib/products';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { products } });

async function seedProducts() {
  console.log('🌱 Starting product migration...');

  for (const product of localProducts) {
    try {
      await db.insert(products).values({
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        fullDescription: product.fullDescription,
        image: product.image,
        images: product.images || [],
        featured: product.featured ?? false,
        inStock: product.inStock ?? true,
        handmade: product.handmade ?? true,
        ingredients: product.ingredients || [],
        benefits: product.benefits || [],
        dimensions: product.dimensions,
        weight: product.weight,
        badge: product.badge,
      });
      console.log(`✅ Migrated: ${product.name}`);
    } catch (error) {
      console.error(`❌ Error migrating ${product.name}:`, error);
    }
  }

  console.log('🎉 Product migration complete!');
}

seedProducts().catch(console.error);
