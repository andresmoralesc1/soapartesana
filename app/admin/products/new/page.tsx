'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'pet-care',
    price: '',
    description: '',
    fullDescription: '',
    image: '',
    images: [] as string[],
    featured: false,
    inStock: true,
    handmade: true,
    ingredients: [] as string[],
    benefits: [] as string[],
    weight: '',
    badge: '',
  });

  const categories = [
    { value: 'pet-care', label: 'Pet Care', icon: '🐾' },
    { value: 'facial', label: 'Línea Facial', icon: '✨' },
    { value: 'terapeutico', label: 'Línea Terapéutica', icon: '🌿' },
    { value: 'energetico', label: 'Línea Energética', icon: '🌙' },
  ];

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // For now, just use a placeholder URL
      // In production, you'd upload to Vercel Blob, Cloudinary, or similar
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  const handleListChange = (field: 'ingredients' | 'benefits', value: string) => {
    const items = value.split('\n').filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        alert(data.error || 'Error al crear producto');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Nuevo Producto</h1>
            <p className="text-sm text-muted-foreground">
              Añade un nuevo producto a la tienda
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Información Básica</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-name" className="block text-sm font-medium mb-1">
                  Nombre del Producto *
                </label>
                <input
                  id="product-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                  placeholder="Ej: Jabón de Avena y Manzanilla"
                  required
                />
              </div>

              <div>
                <label htmlFor="product-slug" className="block text-sm font-medium mb-1">
                  Slug (URL) *
                </label>
                <input
                  id="product-slug"
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                  placeholder="jabon-avena-manzanilla"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-category" className="block text-sm font-medium mb-1">
                  Categoría *
                </label>
                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="product-price" className="block text-sm font-medium mb-1">
                  Precio *
                </label>
                <input
                  id="product-price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                  placeholder="12.50"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="product-description" className="block text-sm font-medium mb-1">
                Descripción Corta *
              </label>
              <input
                id="product-description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                placeholder="Una breve descripción para las tarjetas de producto"
                required
              />
            </div>

            <div>
              <label htmlFor="product-full-description" className="block text-sm font-medium mb-1">
                Descripción Completa
              </label>
              <textarea
                id="product-full-description"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                placeholder="Descripción detallada del producto..."
              />
            </div>
          </div>

          {/* Image */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Imagen del Producto</h2>

            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              {formData.image ? (
                <div className="space-y-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Eliminar imagen
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block px-4 py-2 bg-terracotta text-white rounded-lg cursor-pointer hover:bg-terracotta/90 transition-colors"
                  >
                    {uploading ? 'Subiendo...' : 'Seleccionar Imagen'}
                  </label>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="product-image-url" className="block text-sm font-medium mb-1">
                O URL de imagen (alternativa)
              </label>
              <input
                id="product-image-url"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Detalles Adicionales</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-weight" className="block text-sm font-medium mb-1">
                  Peso
                </label>
                <input
                  id="product-weight"
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                  placeholder="120g"
                />
              </div>

              <div>
                <label htmlFor="product-badge" className="block text-sm font-medium mb-1">
                  Badge (Etiqueta)
                </label>
                <input
                  id="product-badge"
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                  placeholder="BESTSELLER, NUEVO, etc."
                />
              </div>
            </div>

            <div>
              <label htmlFor="product-ingredients" className="block text-sm font-medium mb-1">
                Ingredientes (uno por línea)
              </label>
              <textarea
                id="product-ingredients"
                value={formData.ingredients.join('\n')}
                onChange={(e) => handleListChange('ingredients', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                placeholder="Avena coloidal&#10;Manzanilla orgánica&#10;Aceite de oliva"
              />
            </div>

            <div>
              <label htmlFor="product-benefits" className="block text-sm font-medium mb-1">
                Beneficios (uno por línea)
              </label>
              <textarea
                id="product-benefits"
                value={formData.benefits.join('\n')}
                onChange={(e) => handleListChange('benefits', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                placeholder="Seguro si se lame&#10;Alivia la dermatitis&#10;pH balanceado"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="product-featured"
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-terracotta rounded focus:ring-terracotta"
                />
                <span className="text-sm">Producto destacado</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="product-instock"
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-4 h-4 text-terracotta rounded focus:ring-terracotta"
                />
                <span className="text-sm">En stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="product-handmade"
                  type="checkbox"
                  name="handmade"
                  checked={formData.handmade}
                  onChange={handleChange}
                  className="w-4 h-4 text-terracotta rounded focus:ring-terracotta"
                />
                <span className="text-sm">Hecho a mano</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-terracotta text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Guardando...' : 'Guardar Producto'}
            </motion.button>
          </div>
        </form>
      </main>
    </div>
  );
}
