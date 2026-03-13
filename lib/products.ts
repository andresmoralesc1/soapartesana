export type ProductCategory = 'jabones' | 'pet-care' | 'facial' | 'terapeutico' | 'energetico';

export interface Product {
  id: string | number;  // Compatible con DB (number) y archivo local (string)
  name: string;
  slug: string;
  category: ProductCategory;
  price: number | string;  // Compatible con DB (string) y archivo local (number)
  description: string;
  fullDescription?: string;
  image: string;
  images?: string[];
  featured?: boolean;
  inStock: boolean;
  handmade: boolean;
  ingredients?: string[];
  benefits?: string[];
  dimensions?: string;
  weight?: string;
  badge?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper to get price as number
export function getPriceNumber(price: number | string): number {
  return typeof price === 'string' ? parseFloat(price) : price;
}

export const products: Product[] = [
  // ==================== PET CARE LÍNEA (PRIORIDAD) ====================
  {
    id: 'pet-avena-manzanilla',
    slug: 'jabon-mascotas-avena-manzanilla',
    name: 'Jabón Mascotas Avena & Manzanilla',
    category: 'pet-care',
    price: 12.50,
    description: 'Fórmula suave para la piel sensible de tu mascota. Sin químicos tóxicos.',
    fullDescription: 'Desarrollado específicamente para piel canina y felina. La avena calma el picor mientras la manzanilla reduce la inflamación. 100% seguro si se lame.',
    image: '/products/dog-cute.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'BESTSELLER',
    ingredients: ['Avena coloidal', 'Manzanilla orgánica', 'Aceite de oliva virgen', 'Aloe Vera'],
    benefits: ['Seguro si se lame', 'Alivia la dermatitis', 'pH balanceado 7.0', 'Eco-consciente'],
    weight: '120g'
  },
  {
    id: 'pet-neem-tree',
    slug: 'jabon-mascotas-neem',
    name: 'Jabón Neem & Árbol de Té',
    category: 'pet-care',
    price: 13.00,
    description: 'Repelente natural contra pulgas y garrapatas. Antibacterial.',
    fullDescription: 'El neem es un repelente natural sin químicos agresivos. Combinado con árbol de té, crea una barrera protectora contra parásitos.',
    image: '/products/dog-bath.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'PROTECCIÓN',
    ingredients: ['Aceite de neem', 'Árbol de té', 'Lavanda', 'Aceite de coco'],
    benefits: ['Repelente natural', 'Antibacterial', 'Hidratante', 'Sin pesticidas'],
    weight: '120g'
  },

  // ==================== LÍNEA FACIAL HUMANA ====================
  {
    id: 'facial-carbon',
    slug: 'jabon-facial-carbon-activado',
    name: 'Jabón Facial Carbón Activado',
    category: 'facial',
    price: 11.00,
    description: 'Limpieza profunda para piel grasa y con acné. Poros minimizados.',
    fullDescription: 'El carbón activado absorbe toxinas y exceso de sebo. Ideal para limpieza facial diaria en pieles grasas o mixtas.',
    image: '/products/charcoal-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ACNÉ',
    ingredients: ['Carbón activado', 'Menta piperita', 'Aceite de jojoba', 'Arcilla verde'],
    benefits: ['Absorbe impurezas', 'Minimiza poros', 'Efecto refrescante', 'Anti-inflamatorio'],
    weight: '90g'
  },
  {
    id: 'facial-arroz-leche',
    slug: 'jabon-facial-arroz-leche',
    name: 'Jabón Arroz & Leche de Cabra',
    category: 'facial',
    price: 12.00,
    description: 'Aclarante natural para manchas y tono desigual. Piel luminosa.',
    fullDescription: 'El arzo contiene ácido ferúlico que aclara. La leche de cabra aporta ácido láctico para exfoliación suave.',
    image: '/products/rice-milk-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ACLARANTE',
    ingredients: ['Leche de cabra', 'Harina de arroz', 'Vitamina E', 'Aceite de almendras'],
    benefits: ['Aclara manchas', 'Unifica tono', 'Hidratación profunda', 'Exfoliación suave'],
    weight: '90g'
  },

  // ==================== LÍNEA TERAPÉUTICA HUMANA ====================
  {
    id: 'tero-calendula-miel',
    slug: 'jabon-terapeutico-calendula-miel',
    name: 'Jabón Caléndula & Miel',
    category: 'terapeutico',
    price: 10.50,
    description: 'Regenerador celular para pieles muy sensibles, con dermatitis o eczema.',
    fullDescription: 'La caléndula estimula la producción de colágeno. La miel de abeja cruda aporta enzimas vivas que cicatrizan.',
    image: '/products/honey-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'SENSIBLE',
    ingredients: ['Caléndula', 'Miel cruda', 'Manteca de karité', 'Aceite de aguacate'],
    benefits: ['Regenera piel dañada', 'Anti-inflamatorio', 'Cicatrizante', 'Sin fragancias'],
    weight: '100g'
  },
  {
    id: 'tero-aloe-vera',
    slug: 'jabon-terapeutico-aloe-vera',
    name: 'Jabón Aloe Vera Puro',
    category: 'terapeutico',
    price: 9.50,
    description: 'Hidratación intensa para piel seca o irritada por el sol.',
    fullDescription: 'Aloe vera fresco procesado en frío. Mantiene todas las propiedades hidratantes y regeneradoras.',
    image: '/products/aloe-vera-soap.jpg',
    featured: false,
    inStock: true,
    handmade: true,
    ingredients: ['Aloe vera fresco', 'Aceite de oliva', 'Pepino', 'Vitamina E'],
    benefits: ['Hidratación 24h', 'Calma irritaciones', 'Efecto refrescante', 'Anti-edad'],
    weight: '100g'
  },

  // ==================== LÍNEA ENERGÉTICA HUMANA ====================
  {
    id: 'energ-sal-rosada-ruda',
    slug: 'jabon-energetico-sal-rosada-ruda',
    name: 'Jabón Sal Rosada & Ruda',
    category: 'energetico',
    price: 11.50,
    description: 'Limpieza de cuerpo y espíritu. Elimina energías pesadas.',
    fullDescription: 'La sal rosada desintoxica físicamente. La ruda se usa tradicionalmente para limpiar el aura y proteger.',
    image: '/products/salt-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ENERGÍA',
    ingredients: ['Sal rosada del Himalaya', 'Ruda fresca', 'Romero', 'Aceite esencial de limón'],
    benefits: ['Desintoxica', 'Limpia aura', 'Protección energética', 'Circulación'],
    weight: '110g'
  },
  {
    id: 'energ-lavanda',
    slug: 'jabon-relajante-lavanda',
    name: 'Jabón Lavanda Francesa',
    category: 'energetico',
    price: 10.00,
    description: 'Relajación profunda. Para el baño nocturno y meditación.',
    fullDescription: 'Lavanda de Francia, cultivada sin pesticidas. Aceite esencial puro para aromaterapia.',
    image: '/products/lavender-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    ingredients: ['Lavanda francesa', 'Aceite de oliva', 'Aceite de coco', 'Ylang-ylang'],
    benefits: ['Relajante', 'Mejora sueño', 'Equilibra ansiedad', 'Suaviza piel'],
    weight: '100g'
  },

  // ==================== PRODUCTOS CLÁSICOS (Mantenido para compatibilidad) ====================
  {
    id: 'vela-vainilla',
    slug: 'vela-aromatica-vainilla',
    name: 'Vela de Vainilla Bourbon',
    category: 'facial',
    price: 14.00,
    description: 'Vela de cera de soja con vainilla bourbon de Madagascar.',
    image: '/products/vela-vainilla.jpg',
    featured: false,
    inStock: true,
    handmade: true,
    dimensions: '8cm x 6cm',
    weight: '180g'
  },
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
  'pet-care': {
    name: 'Pet Care',
    description: 'Jabones seguros y medicinales para tu mascota',
    icon: '🐾',
    color: 'from-amber-50 to-orange-50',
    text: 'text-amber-900'
  },
  jabones: {
    name: 'Jabones Artesanales',
    description: 'Elaborados con aceites vegetales y esencias naturales',
    icon: '🧼',
    color: 'from-green-50 to-emerald-50',
    text: 'text-green-900'
  },
  facial: {
    name: 'Línea Facial',
    description: 'Cuidado especial para tu rostro',
    icon: '✨',
    color: 'from-rose-50 to-pink-50',
    text: 'text-rose-900'
  },
  terapeutico: {
    name: 'Línea Terapéutica',
    description: 'Para pieles sensibles y problemáticas',
    icon: '🌿',
    color: 'from-lime-50 to-green-50',
    text: 'text-lime-900'
  },
  energetico: {
    name: 'Línea Energética',
    description: 'Limpieza de cuerpo y espíritu',
    icon: '🌙',
    color: 'from-purple-50 to-indigo-50',
    text: 'text-purple-900'
  }
};
