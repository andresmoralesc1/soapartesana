export type ProductCategory = 'jabones' | 'pet-care' | 'facial' | 'terapeutico' | 'energetico';

export interface Product {
  id: string | number;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number | string;
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

export function getPriceNumber(price: number | string): number {
  return typeof price === 'string' ? parseFloat(price) : price;
}

export const products: Product[] = [
  // ==================== LÍNEA MASCOTAS (PRIORIDAD) ====================
  {
    id: 'pet-avena-manzanilla',
    slug: 'jabon-mascotas-avena-manzanilla',
    name: 'Jabón para Mascotas Avena & Manzanilla',
    category: 'pet-care',
    price: 12.50,
    description: 'Jabón a base de avena y manzanilla que ayuda a aliviar la picazón y la irritación.',
    fullDescription: 'Este jabón a base de avena y manzanilla, ayuda a aliviar la picazón y la irritación, calma la piel seca y ayuda a retener la humedad. Ayuda a limpiar el pelaje y acondicionarlo. Ideal para mascotas con piel sensible o para cachorros.',
    image: '/products/dog-cute.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'BESTSELLER',
    ingredients: ['Avena coloidal', 'Manzanilla orgánica', 'Aceite de oliva virgen'],
    benefits: ['Seguro si se lame', 'Alivia la picazón', 'Calma la piel seca', 'Acondiciona el pelaje'],
    weight: '120g'
  },
  {
    id: 'pet-neem-tree',
    slug: 'jabon-mascotas-neem',
    name: 'Jabón para Mascotas Neem',
    category: 'pet-care',
    price: 13.00,
    description: 'Repelente natural contra pulgas y garrapatas.',
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

  // ==================== LÍNEA FACIAL ====================
  {
    id: 'facial-arroz-leche',
    slug: 'jabon-arroz-leche',
    name: 'Jabón de Arroz y Leche',
    category: 'facial',
    price: 12.00,
    description: 'Delicado aclarador de la piel. Suave para piel sensible.',
    fullDescription: 'Delicado aclarador de la piel. Suave para piel sensible, hidratante natural. Atenúa manchas y suaviza con una exfoliación muy ligera, retirando células muertas.',
    image: '/products/rice-milk-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ACLARANTE',
    ingredients: ['Leche de cabra', 'Harina de arroz', 'Vitamina E', 'Aceite de almendras'],
    benefits: ['Aclara manchas', 'Hidratante natural', 'Exfoliación ligera', 'Retira células muertas'],
    weight: '90g'
  },
  {
    id: 'facial-pepino-coco',
    slug: 'jabon-pepino-coco',
    name: 'Jabón de Pepino y Coco',
    category: 'facial',
    price: 11.50,
    description: 'Refrescante, Hidratante, Calmante, ideal para todo tipo de piel.',
    fullDescription: 'Refrescante, Hidratante, Calmante, ideal para todo tipo de piel, ayuda a combatir el exceso de grasa, reduce irritación y mejora la hidratación. Ideal para la limpieza diaria del rostro.',
    image: '/products/cucumber-coco-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'REFRESCANTE',
    ingredients: ['Pepino fresco', 'Aceite de coco', 'Aloe vera', 'Vitamina E'],
    benefits: ['Combate exceso de grasa', 'Reduce irritación', 'Mejora hidratación', 'Limpieza diaria'],
    weight: '90g'
  },
  {
    id: 'facial-carbon',
    slug: 'jabon-facial-carbon-activado',
    name: 'Jabón Facial Carbón Activado',
    category: 'facial',
    price: 11.00,
    description: 'Limpieza profunda para piel grasa y con acné.',
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

  // ==================== LÍNEA TERAPÉUTICA ====================
  {
    id: 'tero-calendula-miel',
    slug: 'jabon-calendula-miel',
    name: 'Jabón de Caléndula y Miel de Abejas',
    category: 'terapeutico',
    price: 10.50,
    description: 'Antiinflamatorio, exfoliante, humectante, antibacteriano.',
    fullDescription: 'Antiinflamatorio, exfoliante, humectante, antibacteriano. La caléndula estimula la producción de colágeno. La miel de abeja cruda aporta enzimas vivas que cicatrizan.',
    image: '/products/honey-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'SENSIBLE',
    ingredients: ['Caléndula', 'Miel cruda', 'Manteca de karité', 'Aceite de aguacate'],
    benefits: ['Antiinflamatorio', 'Exfoliante', 'Humectante', 'Antibacteriano'],
    weight: '100g'
  },
  {
    id: 'tero-aloe-menta',
    slug: 'jabon-aloe-vera-menta',
    name: 'Jabón de Aloe Vera y Menta',
    category: 'terapeutico',
    price: 9.50,
    description: 'Regenerador celular, cicatrizante, desinflamante, calmante.',
    fullDescription: 'Es regenerador celular, cicatrizante, desinflamante, calmante, refrescante, hidratante, estimulante del colágeno y elastina. Ideal para después de afeitarse y después de tomar el sol.',
    image: '/products/aloe-vera-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'REFRESCANTE',
    ingredients: ['Aloe vera fresco', 'Menta piperita', 'Aceite de oliva', 'Vitamina E'],
    benefits: ['Regenerador celular', 'Cicatrizante', 'Desinflamante', 'Estimula colágeno'],
    weight: '100g'
  },
  {
    id: 'tero-avena-miel',
    slug: 'jabon-avena-miel',
    name: 'Jabón de Avena y Miel de Abejas',
    category: 'terapeutico',
    price: 10.00,
    description: 'Limpiador profundo. Nutre y revitaliza.',
    fullDescription: 'Limpiador profundo. Nutre y revitaliza. Exfoliante, antiinflamatorio e hidratante. Uso diario en el rostro. Todo tipo de Piel.',
    image: '/products/oatmeal-honey-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'DIARIO',
    ingredients: ['Avena coloidal', 'Miel de abeja', 'Aceite de coco', 'Leche de cabra'],
    benefits: ['Limpiador profundo', 'Nutre y revitaliza', 'Exfoliante', 'Antiinflamatorio'],
    weight: '100g'
  },
  {
    id: 'tero-romero-salvia',
    slug: 'jabon-romero-salvia',
    name: 'Jabón de Romero y Salvia',
    category: 'terapeutico',
    price: 11.00,
    description: 'Para pieles grasas y Acné.',
    fullDescription: 'Ligeramente exfoliante limpia en profundidad, tonifica y regenera la piel, propiedades antisépticas que aporta el romero. La salvia es Antiséptico Natural, con propiedades antibacterianas.',
    image: '/products/romero-salvia-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ACNÉ',
    ingredients: ['Romero fresco', 'Salvia', 'Aceite de árbol de té', 'Arcilla verde'],
    benefits: ['Limpieza profunda', 'Tonica y regenera', 'Antiséptico', 'Antibacteriano'],
    weight: '100g'
  },
  {
    id: 'tero-lavanda',
    slug: 'jabon-lavanda',
    name: 'Jabón de Lavanda',
    category: 'terapeutico',
    price: 10.00,
    description: 'Jabón relajante que alivia la ansiedad y el estrés.',
    fullDescription: 'Jabón relajante, alivia la ansiedad, el estrés y la tensión. Ayuda a conciliar el sueño. Hidratante profundo, hipoalergénico, antinflamatorio, bactericida, para pieles con eczemas, acné o afecciones dermatológicas.',
    image: '/products/lavender-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'RELAJANTE',
    ingredients: ['Lavanda francesa', 'Aceite de oliva', 'Aceite de coco', 'Ylang-ylang'],
    benefits: ['Alivia ansiedad', 'Ayuda a dormir', 'Hidratante', 'Hipoalergénico'],
    weight: '100g'
  },

  // ==================== LÍNEA ENERGÉTICA ====================
  {
    id: 'energ-cafe-clavo-canela',
    slug: 'jabon-cafe-clavo-canela',
    name: 'Jabón de Café, Clavos y Canela',
    category: 'energetico',
    price: 11.50,
    description: 'Exfoliante, estimulante, revitalizante, energizante.',
    fullDescription: 'Exfoliante, estimulante, revitalizante, energizante, vigorizante, anticelulítico. Para usar dos veces a la semana.',
    image: '/products/coffee-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ENERGÍA',
    ingredients: ['Café molido', 'Clavos de olor', 'Canela', 'Aceite de coco'],
    benefits: ['Exfoliante', 'Estimulante', 'Revitalizante', 'Anticelulítico'],
    weight: '110g'
  },
  {
    id: 'energ-rosas-canela-clavo',
    slug: 'jabon-limpieza-energetica-rosas',
    name: 'Jabón Limpieza Energética de Rosas',
    category: 'energetico',
    price: 12.00,
    description: 'Limpieza energética con pétalos de rosa, canela y clavos.',
    fullDescription: 'Jabón de limpieza energética con pétalos de rosa, canela y clavos. Para limpiar el aura y eliminar energías pesadas.',
    image: '/products/rose-energy-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ENERGÍA',
    ingredients: ['Pétalos de rosa', 'Canela', 'Clavos de olor', 'Sal rosada'],
    benefits: ['Limpieza energética', 'Elimina energías pesadas', 'Protección', 'Relajante'],
    weight: '110g'
  },
  {
    id: 'energ-sal-rosada-ruda',
    slug: 'jabon-sal-rosada-ruda',
    name: 'Jabón Sal Rosada & Ruda',
    category: 'energetico',
    price: 11.50,
    description: 'Limpieza de cuerpo y espíritu. Elimina energías pesadas.',
    fullDescription: 'La sal rosada desintoxica físicamente. La ruda se usa tradicionalmente para limpiar el aura y proteger.',
    image: '/products/salt-soap.jpg',
    featured: false,
    inStock: true,
    handmade: true,
    ingredients: ['Sal rosada del Himalaya', 'Ruda fresca', 'Romero', 'Aceite esencial de limón'],
    benefits: ['Desintoxica', 'Limpia aura', 'Protección energética', 'Circulación'],
    weight: '110g'
  },

  // ==================== JABONES ESPECIALES ====================
  {
    id: 'jabon-rosas',
    slug: 'jabon-rosas',
    name: 'Jabón de Rosas',
    category: 'jabones',
    price: 11.00,
    description: 'Para pieles deshidratadas y delicadas. Pieles maduras.',
    fullDescription: 'Pieles deshidratadas y delicadas. Pieles maduras. Regenerador, calmante y descongestionante.',
    image: '/products/rose-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'DESHIDRATADA',
    ingredients: ['Pétalos de rosa', 'Aceite de rosa mosqueta', 'Leche de cabra', 'Vitamina E'],
    benefits: ['Regenerador', 'Calmante', 'Descongestionante', 'Hidratante'],
    weight: '100g'
  },
  {
    id: 'jabon-chocolate',
    slug: 'jabon-chocolate',
    name: 'Jabón de Chocolate',
    category: 'jabones',
    price: 11.50,
    description: 'Antioxidante, antinflamatorio, rejuvenecedor.',
    fullDescription: 'Junto con la manteca de cacao poseen propiedades antioxidantes, antinflamatorias, rejuvenecedoras. Tiene gran capacidad de hidratar, suavizar y calmar la piel. Aporta elasticidad a la piel, ayuda en estrías y cicatrices.',
    image: '/products/chocolate-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ANTIOXIDANTE',
    ingredients: ['Cacao puro', 'Manteca de cacao', 'Aceite de coco', 'Vitamina E'],
    benefits: ['Antioxidante', 'Antinflamatorio', 'Rejuvenecedor', 'Aporta elasticidad'],
    weight: '100g'
  },
  {
    id: 'jabon-vino-tinto',
    slug: 'jabon-vino-tinto',
    name: 'Jabón de Vino Tinto',
    category: 'jabones',
    price: 12.00,
    description: 'Antioxidante que ayuda a combatir el envejecimiento prematuro.',
    fullDescription: 'Antioxidante que ayudan a combatir el envejecimiento prematuro y la flacidez. Rejuvenece e hidrata, promueve la regeneración celular. Neutraliza los radicales libres.',
    image: '/products/wine-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ANTI-EDAD',
    ingredients: ['Vino tinto', 'Resveratrol', 'Aceite de uva', 'Vitamina E'],
    benefits: ['Antienvejecimiento', 'Combate flacidez', 'Regeneración celular', 'Neutraliza radicales libres'],
    weight: '100g'
  },
  {
    id: 'jabon-zanahoria',
    slug: 'jabon-zanahoria',
    name: 'Jabón de Zanahoria',
    category: 'jabones',
    price: 10.50,
    description: 'Minimiza los poros y reduce las espinillas.',
    fullDescription: 'El uso frecuente de jabón de zanahoria minimiza los poros, reduce las espinillas, le da brillo natural a la piel y la suaviza. Limpia y nutre delicadamente.',
    image: '/products/carrot-soap.jpg',
    featured: false,
    inStock: true,
    handmade: true,
    ingredients: ['Zanahoria', 'Beta-caroteno', 'Aceite de zanahoria', 'Vitamina E'],
    benefits: ['Minimiza poros', 'Reduce espinillas', 'Brillo natural', 'Nutre delicadamente'],
    weight: '100g'
  },
  {
    id: 'jabon-naranja-estropajo',
    slug: 'jabon-naranja-estropajo',
    name: 'Jabón de Naranja y Estropajo',
    category: 'jabones',
    price: 11.00,
    description: 'Estimula la circulación sanguínea. Elimina tejido muerto.',
    fullDescription: 'Estimula la circulación sanguínea. Elimina tejido muerto de la piel y exceso de grasa. Relajante muscular. Suave exfoliación.',
    image: '/products/orange-loofah-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'EXFOLIANTE',
    ingredients: ['Cáscara de naranja', 'Estropajo natural', 'Aceite de naranja', 'Miel'],
    benefits: ['Estimula circulación', 'Elimina tejido muerto', 'Elimina exceso de grasa', 'Relajante muscular'],
    weight: '110g'
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
