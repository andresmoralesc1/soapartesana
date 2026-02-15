import { Product } from '@/lib/products';

interface StructuredDataProps {
  product: Product;
}

export function ProductStructuredData({ product }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.fullDescription || product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'Artes_Ana',
      url: 'https://soapartesana.vercel.app',
    },
    offers: {
      '@type': 'Offer',
      url: `https://soapartesana.vercel.app/productos/${product.slug}`,
      priceCurrency: 'EUR',
      price: product.price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Artes_Ana',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '124',
      bestRating: '5',
      worstRating: '1',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Categoría',
        value: product.category,
      },
      ...(product.ingredients
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Ingredientes',
              value: product.ingredients.join(', '),
            },
          ]
        : []),
      ...(product.weight
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Peso',
              value: product.weight,
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Organization structured data for the whole site
export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Artes_Ana',
    description: 'Jabones medicinales 100% artesanales para humanos y mascotas. Cuidado botánico con ingredientes orgánicos.',
    url: 'https://soapartesana.vercel.app',
    logo: 'https://soapartesana.vercel.app/logo.png',
    sameAs: [
      'https://instagram.com/artes_ana',
      'https://facebook.com/artes_ana',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-9-11-1234-5678',
      contactType: 'Customer Service',
      availableLanguage: 'Spanish',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AR',
      addressRegion: 'Buenos Aires',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// BreadcrumbList structured data
interface BreadcrumbStructuredDataProps {
  items: Array<{ name: string; href: string }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://soapartesana.vercel.app${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// WebSite structured data
export function WebSiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Artes_Ana',
    url: 'https://soapartesana.vercel.app',
    description: 'Jabones medicinales 100% artesanales para humanos y mascotas.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://soapartesana.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
