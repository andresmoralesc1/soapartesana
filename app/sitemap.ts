import { MetadataRoute } from 'next'
import { products } from '@/lib/products'

const BASE_URL = 'https://artes-ana.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  const productPages = products.map((product) => ({
    url: `${BASE_URL}/productos/${product.slug}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryPages = [
    {
      url: `${BASE_URL}/productos?categoria=pet-care`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/productos?categoria=facial`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/productos?categoria=terapeutico`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/productos?categoria=energetico`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/productos?categoria=jabones`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  return [...staticPages, ...productPages, ...categoryPages]
}
