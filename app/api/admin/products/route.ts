import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET all products (admin)
export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(products.createdAt);

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}

// POST create new product (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      category,
      price,
      description,
      fullDescription,
      image,
      images,
      featured,
      inStock,
      handmade,
      ingredients,
      benefits,
      dimensions,
      weight,
      badge,
    } = body;

    // Validation
    if (!name || !slug || !category || !price || !description || !image) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { error: 'El slug ya existe, usa otro' },
        { status: 400 }
      );
    }

    // Insert product
    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        slug,
        category,
        price: price.toString(),
        description,
        fullDescription,
        image,
        images: images || [],
        featured: featured ?? false,
        inStock: inStock ?? true,
        handmade: handmade ?? true,
        ingredients: ingredients || [],
        benefits: benefits || [],
        dimensions,
        weight,
        badge,
      })
      .returning();

    return NextResponse.json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    );
  }
}

// PUT update product (admin)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID del producto es requerido' },
        { status: 400 }
      );
    }

    // Convert price to string if provided
    if (updateData.price) {
      updateData.price = updateData.price.toString();
    }

    const [updated] = await db
      .update(products)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: updated,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    );
  }
}

// DELETE product (admin)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID del producto es requerido' },
        { status: 400 }
      );
    }

    const [deleted] = await db
      .delete(products)
      .where(eq(products.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Producto eliminado',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
