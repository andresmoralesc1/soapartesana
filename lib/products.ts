export type ProductCategory = 'jabones' | 'velas' | 'ceramica' | 'tejidos';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  description: string;
  fullDescription?: string;
  image: string;
  images?: string[];
  featured?: boolean;
  inStock: boolean;
  handmade: boolean;
  ingredients?: string[];
  dimensions?: string;
  weight?: string;
}

export const products: Product[] = [
  // Jabones
  {
    id: 'jabon-lavanda',
    slug: 'jabon-artesanal-lavanda',
    name: 'Jabón de Lavanda',
    category: 'jabones',
    price: 8.50,
    description: 'Jabón artesanal con aceite esencial puro de lavanda, ideal para relajar y suavizar la piel.',
    fullDescription: 'Este jabón está elaborado con el método saponificación en frío, conservando todas las propiedades de los aceites vegetales. La lavanda calma la irritación y promueve la relajación.',
    image: 'https://images.pexels.com/photos/33163129/pexels-photo-33163129.jpeg',
    images: ['https://images.pexels.com/photos/33163129/pexels-photo-33163129.jpeg', 'https://images.pexels.com/photos/31517863/pexels-photo-31517863.jpeg'],
    featured: true,
    inStock: true,
    handmade: true,
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Lavanda', 'Arcilla rosa'],
    weight: '100g'
  },
  {
    id: 'jabon-miel-avena',
    slug: 'jabon-miel-avena',
    name: 'Jabón de Miel y Avena',
    category: 'jabones',
    price: 9.00,
    description: 'Exfoliante suave con miel cruda y avena coloidal, perfecto para pieles sensibles.',
    fullDescription: 'La miel aporta hidratación natural mientras la avena elimina suavemente las células muertas. Ideal para pieles con tendencias atópicas.',
    image: 'https://images.pexels.com/photos/33502588/pexels-photo-33502588.jpeg',
    featured: true,
    inStock: true,
    handmade: true,
    ingredients: ['Miel cruda', 'Avena coloidal', 'Manteca de karité', 'Aceite de almendras'],
    weight: '110g'
  },
  {
    id: 'jabon-carbon',
    slug: 'jabon-activado-carbon',
    name: 'Jabón de Carbón Activado',
    category: 'jabones',
    price: 8.00,
    description: 'Limpiador profundo con carbón activado y menta, ideal para piel grasa.',
    fullDescription: 'El carbón activado absorbe impurezas y toxinas. La menta proporciona una sensación refrescante.',
    image: 'https://images.pexels.com/photos/31517861/pexels-photo-31517861.jpeg',
    featured: false,
    inStock: true,
    handmade: true,
    ingredients: ['Carbón activado', 'Menta piperita', 'Aceite de jojoba'],
    weight: '100g'
  },

  // Velas
  {
    id: 'vela-vainilla',
    slug: 'vela-aromatica-vainilla',
    name: 'Vela de Vainilla Bourbon',
    category: 'velas',
    price: 14.00,
    description: 'Vela de cera de soja con vainilla bourbon de Madagascar, aroma dulce y reconfortante.',
    fullDescription: 'Hecha a mano con cera de soja 100% natural y mecha de algodón. La vainilla bourbon crea un ambiente cálido y acogedor.',
    image: 'https://images.pexels.com/photos/13673112/pexels-photo-13673112.jpeg',
    featured: true,
    inStock: true,
    handmade: true,
    dimensions: '8cm x 6cm',
    weight: '180g'
  },
  {
    id: 'vela-salvia',
    slug: 'vela-limpieza-salvia',
    name: 'Vela de Salvia Blanca',
    category: 'velas',
    price: 15.00,
    description: 'Vela ritual de salvia blanca para limpiar energías y purificar el ambiente.',
    fullDescription: 'Combina las propiedades purificantes de la salvia con la caldez de una vela artesanal. Ideal para meditación.',
    image: 'https://images.pexels.com/photos/10343250/pexels-photo-10343250.jpeg',
    featured: false,
    inStock: true,
    handmade: true,
    dimensions: '10cm x 7cm',
    weight: '200g'
  },
  {
    id: 'vela-amber',
    slug: 'vela-amber-musc',
    name: 'Vela de Ámbar y Musgo',
    category: 'velas',
    price: 16.00,
    description: 'Fragancia terrosa y sofisticada con notas de ámbar y musgo de roble.',
    fullDescription: 'Una combinación elegante que evoca bosques nórdicos. Perfecta para espacios modernos.',
    image: 'https://images.pexels.com/photos/5933684/pexels-photo-5933684.jpeg',
    featured: true,
    inStock: true,
    handmade: true,
    dimensions: '9cm x 7cm',
    weight: '190g'
  },

  // Cerámica
  {
    id: 'cuenco-tierra',
    slug: 'cuenco-ceramica-tierra',
    name: 'Cuenco de Terracota',
    category: 'ceramica',
    price: 28.00,
    description: 'Cuenco artesanal esmaltado en tonos terracota, perfecto para servir o decorar.',
    fullDescription: 'Cada pieza es única, torneada a mano y esmaltada con minerales naturales. Seguro para alimentos.',
    image: 'https://images.pexels.com/photos/32212371/pexels-photo-32212371.jpeg',
    featured: true,
    inStock: true,
    handmade: true,
    dimensions: '15cm diámetro x 7cm alto'
  },
  {
    id: 'jardinera-salvia',
    slug: 'jardinera-mini-salvia',
    name: 'Jardinera Mini Salvia',
    category: 'ceramica',
    price: 18.00,
    description: 'Pequeña jardinera en color salvia, ideal para hierbas aromáticas o suculentas.',
    fullDescription: 'Incluye agujero de drenaje. El esmalte es verde salvia suave, muy tendencia.',
    image: 'https://images.pexels.com/photos/30225372/pexels-photo-30225372.jpeg',
    featured: false,
    inStock: true,
    handmade: true,
    dimensions: '12cm x 10cm x 10cm'
  },
  {
    id: 'tazas-lavanda',
    slug: 'set-tazas-lavanda',
    name: 'Set de 2 Tazas Lavanda',
    category: 'ceramica',
    price: 32.00,
    description: 'Par de tazas artesanales en color lavanda con asa cómoda.',
    fullDescription: 'Perfectas para café o té. El acabado mate es suave al tacto. Lavavajillas seguro.',
    image: 'https://images.pexels.com/photos/34004102/pexels-photo-34004102.jpeg',
    featured: false,
    inStock: true,
    handmade: true,
    dimensions: '10cm alto x 8cm diámetro'
  },

  // Tejidos
  {
    id: 'manta-lino',
    slug: 'manta-lino-crudo',
    name: 'Manta de Lino Crudo',
    category: 'tejidos',
    price: 85.00,
    description: 'Manta de lino 100% natural tejida a telar, suave y transpirable.',
    fullDescription: 'Tejida en telar artesanal por cooperativas locales. El lino mejora con el uso.',
    image: 'https://images.pexels.com/photos/16497539/pexels-photo-16497539.jpeg',
    featured: true,
    inStock: true,
    handmade: true,
    dimensions: '150cm x 200cm'
  },
  {
    id: 'pano-macrame',
    slug: 'pano-macrame-pared',
    name: 'Paño Macramé Pared',
    category: 'tejidos',
    price: 45.00,
    description: 'Paño decorativo de macramé con patrón de nudos tradicionales.',
    fullDescription: 'Hecho a mano con hilo de algodón natural. Incluye madera de eucalipto recuperada.',
    image: 'https://images.pexels.com/photos/13211211/pexels-photo-13211211.jpeg',
    featured: false,
    inStock: true,
    handmade: true,
    dimensions: '60cm x 90cm'
  },
  {
    id: 'cojin-bordado',
    slug: 'cojin-bordado-floral',
    name: 'Cojín con Bordado Floral',
    category: 'tejidos',
    price: 35.00,
    description: 'Funda de cojín con bordado floral a mano, incluye relleno de plumón.',
    fullDescription: 'El bordado representa flores silvestres del campo. Tela de lino suave.',
    image: 'https://images.pexels.com/photos/6806697/pexels-photo-6806697.jpeg',
    featured: false,
    inStock: true,
    handmade: true,
    dimensions: '45cm x 45cm'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export const categoryInfo = {
  jabones: {
    name: 'Jabones Artesanales',
    description: 'Elaborados con aceites vegetales y esencias naturales',
    icon: '🧼'
  },
  velas: {
    name: 'Velas Aromáticas',
    description: 'Cera de soja y fragancias premium',
    icon: '🕯️'
  },
  ceramica: {
    name: 'Cerámica',
    description: 'Piezas únicas torneadas a mano',
    icon: '🏺'
  },
  tejidos: {
    name: 'Tejidos Artesanales',
    description: 'Lino, algodón y técnicas tradicionales',
    icon: '🧶'
  }
};
