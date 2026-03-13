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
  usage?: string;
  skinType?: string[];
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
    description: 'Fórmula suave para piel sensible de tu mascota. Alivia picazón e irritación.',
    fullDescription: 'Este jabón artesanal está formulado específicamente para piel canina y felina. La avena calma el picor mientras la manzanilla reduce la inflamación. 100% seguro si se lame, sin químicos tóxicos. Ayuda a limpiar el pelaje y acondicionarlo, dejando un aroma suave y natural.',
    image: '/products/dog-cute.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'BESTSELLER',
    ingredients: ['Avena coloidal orgánica', 'Manzanilla silvestre', 'Aceite de oliva virgen', 'Aloe Vera'],
    benefits: ['Seguro si se lame', 'Alivia la dermatitis', 'pH balanceado 7.0', 'Eco-consciente'],
    usage: 'Mojar el pelaje del animal, aplicar el jabón con masajes suaves, enjuagar abundante.',
    skinType: ['Piel sensible', 'Dermatitis', 'Piel seca', 'Cachorros'],
    weight: '120g'
  },
  {
    id: 'pet-neem-tree',
    slug: 'jabon-mascotas-neem',
    name: 'Jabón para Mascotas Neem & Árbol de Té',
    category: 'pet-care',
    price: 13.00,
    description: 'Repelente natural contra pulgas y garrapatas. Antibacterial y protector.',
    fullDescription: 'El aceite de neem es un repelente natural reconocido sin químicos agresivos. Combinado con árbol de té, crea una barrera protectora contra parásitos externos mientras limpia y desinfecta la piel de tu mascota.',
    image: '/products/dog-bath.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'PROTECCIÓN',
    ingredients: ['Aceite de neem orgánico', 'Árbol de té', 'Lavanda', 'Aceite de coco'],
    benefits: ['Repelente natural', 'Antibacterial', 'Hidratante', 'Sin pesticidas'],
    usage: 'Usar 2-3 veces por semana para prevención. Aplicar dejando actuar 2 minutos.',
    skinType: ['Todo tipo de piel', 'Con pulgas/garrapatas', 'Piel irritada'],
    weight: '120g'
  },

  // ==================== LÍNEA FACIAL ====================
  {
    id: 'facial-arroz-leche',
    slug: 'jabon-arroz-leche',
    name: 'Jabón de Arroz y Leche de Cabra',
    category: 'facial',
    price: 12.00,
    description: 'Aclarador natural que atenuá manchas y ilumina tu piel. Exfoliación suave.',
    fullDescription: 'Fórmula ancestral japonesa combinada con leche de cabra fresca. El arroz contiene ácido ferúlico que aclara manchas solar, hormonal y de acné. La leche de cabra aporta ácido láctico para una exfoliación enzimática suave que retira células muertas sin irritar.',
    image: '/products/rice-milk-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ACLARANTE',
    ingredients: ['Leche de cabra fresca', 'Harina de arroz orgánico', 'Vitamina E', 'Aceite de almendras dulces'],
    benefits: ['Aclara manchas', 'Unifica tono', 'Hidratación profunda', 'Exfoliación enzimática'],
    usage: 'Uso diario mañana y noche. Masajear 1 minuto y enjuagar.',
    skinType: ['Piel con manchas', 'Piel sensible', 'Piel seca', 'Hiperpigmentación'],
    weight: '90g'
  },
  {
    id: 'facial-pepino-coco',
    slug: 'jabon-pepino-coco',
    name: 'Jabón de Pepino y Coco',
    category: 'facial',
    price: 11.50,
    description: 'Refrescante y calmante. Ideal para piel grasa y limpieza diaria.',
    fullDescription: 'El pepino fresco contiene vitamina C y ácido cafeico que reducen inflamación y combaten el exceso de grasa. El aceite de coco hidrata sin obstruir poros. Sensación refrescante inmediata perfecta para el cuidado facial matutino.',
    image: '/products/cucumber-coco-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'REFRESCANTE',
    ingredients: ['Pepino fresco orgánico', 'Aceite de coco virgen', 'Aloe vera', 'Vitamina E'],
    benefits: ['Combate exceso de grasa', 'Reduce irritación', 'Hidratación ligera', 'Efecto refrescante'],
    usage: 'Ideal para limpieza matutina. Dejar actuar 30 segundos para mayor frescura.',
    skinType: ['Piel grasa', 'Piel mixta', 'Piel sensible', 'Rosácea'],
    weight: '90g'
  },
  {
    id: 'facial-carbon',
    slug: 'jabon-facial-carbon-activado',
    name: 'Jabón Facial Carbón Activado',
    category: 'facial',
    price: 11.00,
    description: 'Limpieza profunda para piel grasa y con acné. Poros minimizados.',
    fullDescription: 'El carbón activado médico actúa como una esponja que absorbe toxinas, exceso de sebo e impurezas de los poros. Combinado con menta piperita que cierra los poros y arcilla verde que desintoxica. El tratamiento detox que tu rostro necesita.',
    image: '/products/charcoal-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ACNÉ',
    ingredients: ['Carbón activado médico', 'Menta piperita', 'Aceite de jojoba', 'Arcilla verde'],
    benefits: ['Absorbe impurezas', 'Minimiza poros', 'Efecto refrescante', 'Anti-inflamatorio'],
    usage: 'Usar en la noche. Masajear zonas con acné 1 minuto antes de enjuagar.',
    skinType: ['Piel grasa', 'Acné', 'Poros dilatados', 'Piel impura'],
    weight: '90g'
  },

  // ==================== LÍNEA TERAPÉUTICA ====================
  {
    id: 'tero-calendula-miel',
    slug: 'jabon-calendula-miel',
    name: 'Jabón de Caléndula y Miel de Abejas',
    category: 'terapeutico',
    price: 10.50,
    description: 'Regenerador celular para pieles muy sensibles, con dermatitis o eczema.',
    fullDescription: 'La caléndula estimula la producción de colágeno y acelera la cicatrización de heridas. La miel de abeja cruda aporta enzimas vivas, antibióticos naturales y humectantes profundos. Sin fragancias artificiales, ideal para pieles reactivas.',
    image: '/products/honey-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'SENSIBLE',
    ingredients: ['Caléndula orgánica', 'Miel cruda', 'Manteca de karité', 'Aceite de aguacate'],
    benefits: ['Regenera piel dañada', 'Anti-inflamatorio', 'Cicatrizante', 'Sin fragancias'],
    usage: 'Uso diario. Aplicar con agua tibia para activar las propiedades de la miel.',
    skinType: ['Dermatitis', 'Eczema', 'Piel muy sensible', 'Pieles reactivas'],
    weight: '100g'
  },
  {
    id: 'tero-aloe-menta',
    slug: 'jabon-aloe-vera-menta',
    name: 'Jabón de Aloe Vera y Menta',
    category: 'terapeutico',
    price: 9.50,
    description: 'Regenerador celular y cicatrizante. Ideal para después del sol y afeitado.',
    fullDescription: 'Aloe vera fresco procesado en frío manteniendo todas sus enzimas activas. Estimula la producción de colágeno y elastina para piel joven. La menta refresca y cierra poros. Perfecto para calmar irritaciones posteriores al afeitado o exposición solar.',
    image: '/products/aloe-vera-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'REFRESCANTE',
    ingredients: ['Aloe vera fresco', 'Menta piperita', 'Aceite de oliva', 'Vitamina E'],
    benefits: ['Regenerador celular', 'Cicatrizante', 'Desinflamante', 'Estimula colágeno'],
    usage: 'Ideal después del sol o afeitado. Aplicar con movimientos suaves.',
    skinType: ['Piel irritada', 'Después del sol', 'Después de afeitarse', 'Quemaduras leves'],
    weight: '100g'
  },
  {
    id: 'tero-avena-miel',
    slug: 'jabon-avena-miel',
    name: 'Jabón de Avena y Miel de Abejas',
    category: 'terapeutico',
    price: 10.00,
    description: 'Limpiador profundo que nutre y revitaliza. Uso diario para todo tipo de piel.',
    fullDescription: 'La avena coloidal actúa como un limpiador suave que nutre mientras elimina impurezas. La miel de abeja aporta humectación natural. Exfoliación física suave combinada con propiedades antiinflamatorias. El jabón diario que tu piel necesita.',
    image: '/products/oatmeal-honey-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'DIARIO',
    ingredients: ['Avena coloidal', 'Miel de abeja cruda', 'Aceite de coco', 'Leche de cabra'],
    benefits: ['Limpiador profundo', 'Nutre y revitaliza', 'Exfoliante suave', 'Anti-inflamatorio'],
    usage: 'Uso diario mañana y noche. Masajear 30 segundos antes de enjuagar.',
    skinType: ['Todo tipo de piel', 'Piel seca', 'Piel normal', 'Piel sensible'],
    weight: '100g'
  },
  {
    id: 'tero-romero-salvia',
    slug: 'jabon-romero-salvia',
    name: 'Jabón de Romero y Salvia',
    category: 'terapeutico',
    price: 11.00,
    description: 'Para pieles grasas y con acné. Limpieza profunda con propiedades antisépticas.',
    fullDescription: 'El romero contiene ácido rosmarínico con potentes propiedades antisépticas y antibacterianas que combaten el acné. La salvia es un antiséptico natural que regula la producción de sebo. Limpieza profunda con exfoliación suave de las hierbas.',
    image: '/products/romero-salvia-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ACNÉ',
    ingredients: ['Romero fresco', 'Salvia orgánica', 'Aceite de árbol de té', 'Arcilla verde'],
    benefits: ['Limpieza profunda', 'Tónica y regenera', 'Antiséptico natural', 'Antibacteriano'],
    usage: 'Usar 2-3 veces por semana. Dejar actuar 1 minuto sobre piel húmeda.',
    skinType: ['Piel grasa', 'Acné', 'Poros obstruidos', 'Exceso de sebo'],
    weight: '100g'
  },
  {
    id: 'tero-lavanda',
    slug: 'jabon-lavanda',
    name: 'Jabón de Lavanda Francesa',
    category: 'terapeutico',
    price: 10.00,
    description: 'Jabón relajante que alivia ansiedad y estrés. Ayuda a conciliar el sueño.',
    fullDescription: 'Lavanda de Francia, cultivada sin pesticidas en los campos de Provenza. Aceite esencial puro de lavanda para aromaterapia durante el baño. Hidratación profunda con efectos calmantes sobre sistema nervioso. Hipoalergénico y apto para pieles con eczemas o dermatitis.',
    image: '/products/lavender-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'RELAJANTE',
    ingredients: ['Lavanda francesa', 'Aceite de oliva', 'Aceite de coco', 'Ylang-ylang'],
    benefits: ['Alivia ansiedad', 'Ayuda a dormir', 'Hidratante profundo', 'Hipoalergénico'],
    usage: 'Uso nocturno para maximizar efectos relajantes. Masajear suavemente.',
    skinType: ['Eczemas', 'Acné inflamatorio', 'Piel estresada', 'Todo tipo de piel'],
    weight: '100g'
  },

  // ==================== LÍNEA ENERGÉTICA ====================
  {
    id: 'energ-cafe-clavo-canela',
    slug: 'jabon-cafe-clavo-canela',
    name: 'Jabón de Café, Clavos y Canela',
    category: 'energetico',
    price: 11.50,
    description: 'Exfoliante energizante y anticelulítico. Despierta tu piel y tus sentidos.',
    fullDescription: 'El café molido exfolia, activa la circulación y reduce celulitis. Los clavos de olor estimulan y tonifican. La caela aporta calidez y mejora elasticidad. El jabón matutino que despierta tu cuerpo con energía y vigor. Usar 2 veces por semana.',
    image: '/products/coffee-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ENERGÍA',
    ingredients: ['Café molido orgánico', 'Clavos de olor', 'Canela de Ceylán', 'Aceite de coco'],
    benefits: ['Exfoliante intenso', 'Estimulante', 'Revitalizante', 'Anticelulítico'],
    usage: 'Usar 2-3 veces por semana en la mañana. Masajear con movimientos circulares.',
    skinType: ['Piel normal', 'Piel con celulitis', 'Piel cansada', 'Circulación deficiente'],
    weight: '110g'
  },
  {
    id: 'energ-rosas-canela-clavo',
    slug: 'jabon-limpieza-energetica-rosas',
    name: 'Jabón Limpieza Energética de Rosas',
    category: 'energetico',
    price: 12.00,
    description: 'Limpieza energética con pétalos de rosa, canela y clavos. Limpia tu aura.',
    fullDescription: 'Combinación sagrada de pétalos de rosa que abren el corazón, canela que calienta y protege, y clavos que purifican. La sal rosada del Himalaya desintoxica mientras limpias tu cuerpo y tu aura. Perfecto para rituales de limpieza energética lunar.',
    image: '/products/rose-energy-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ENERGÍA',
    ingredients: ['Pétalos de rosa orgánicos', 'Canela de Ceylán', 'Clavos de olor', 'Sal rosada del Himalaya'],
    benefits: ['Limpieza energética', 'Elimina energías pesadas', 'Protección astral', 'Abre chakra del corazón'],
    usage: 'Ideal para baños de Luna llena. Visualizar liberando energías mientras te enjuagas.',
    skinType: ['Todo tipo de piel', 'Para rituales', 'Limpieza energética'],
    weight: '110g'
  },
  {
    id: 'energ-sal-rosada-ruda',
    slug: 'jabon-sal-rosada-ruda',
    name: 'Jabón Sal Rosada & Ruda',
    category: 'energetico',
    price: 11.50,
    description: 'Limpieza de cuerpo y espíritu. Elimina energías pesadas y protege.',
    fullDescription: 'La sal rosada del Himalaya desintoxica físicamente mediante osmosis, extrayendo toxinas de la piel. La ruda, planta mágica de protección, limpia el aura y crea un escudo contra energías negativas. Combinado con Romero que purifica y limón que alegra.',
    image: '/products/salt-soap.jpg',
    featured: false,
    inStock: true,
    handmade: true,
    ingredients: ['Sal rosada del Himalaya', 'Ruda fresca', 'Romero', 'Aceite esencial de limón'],
    benefits: ['Desintoxica', 'Limpia aura', 'Protección energética', 'Mejora circulación'],
    usage: 'Usar cuando sientas energías pesadas. Enjuagar con agua fría para sellar.',
    skinType: ['Todo tipo de piel', 'Para protección', 'Limpieza de aura'],
    weight: '110g'
  },

  // ==================== JABONES ESPECIALES ====================
  {
    id: 'jabon-rosas',
    slug: 'jabon-rosas',
    name: 'Jabón de Rosas',
    category: 'jabones',
    price: 11.00,
    description: 'Para pieles deshidratadas, delicadas y maduras. Regenerador y calmante.',
    fullDescription: 'El aceite de rosa mosqueta es uno de los regeneradores celulares más potentes de la naturaleza. Combinado con pétalos de rosa que calman y descongestionan, y leche de cabra que hidrata profundamente. El lujo que tu piel madura o deshidratada merece.',
    image: '/products/rose-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'DESHIDRATADA',
    ingredients: ['Pétalos de rosa orgánicos', 'Aceite de rosa mosqueta', 'Leche de cabra fresca', 'Vitamina E'],
    benefits: ['Regenerador celular', 'Calmante', 'Descongestionante', 'Anti-edad'],
    usage: 'Uso diario. Dejar espuma actuar 1 minuto para máxima absorción.',
    skinType: ['Piel madura', 'Piel deshidratada', 'Piel delicada', 'Pieles con rosácea'],
    weight: '100g'
  },
  {
    id: 'jabon-chocolate',
    slug: 'jabon-chocolate',
    name: 'Jabón de Chocolate y Cacao',
    category: 'jabones',
    price: 11.50,
    description: 'Antioxidante poderoso que rejuvenece y aporta elasticidad. Delicia para tu piel.',
    fullDescription: 'El cacao puro contiene antioxidantes que superan al vino tinto y al té verde. Combinado con manteca de cacao que es emoliente por excelencia, aporta elasticidad, ayuda en estrías y cicatrices. La experiencia sensorial más deliciosa para tu rutina de belleza.',
    image: '/products/chocolate-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ANTIOXIDANTE',
    ingredients: ['Cacao puro 70%', 'Manteca de cacao', 'Aceite de coco', 'Vitamina E'],
    benefits: ['Antioxidante extremo', 'Antinflamatorio', 'Rejuvenecedor', 'Aporta elasticidad'],
    usage: 'Uso 2-3 veces por semana. Masajear en zonas con estrías o cicatrices.',
    skinType: ['Piel con estrías', 'Piel madura', 'Piel deshidratada', 'Cicatrices recientes'],
    weight: '100g'
  },
  {
    id: 'jabon-vino-tinto',
    slug: 'jabon-vino-tinto',
    name: 'Jabón de Vino Tinto',
    category: 'jabones',
    price: 12.00,
    description: 'Antioxidante anti-edad que combate flacidez. Rejuvenece y tonifica.',
    fullDescription: 'El vino tinto contiene resveratrol, el antioxidante más potente conocido. Combate radicales libres que causan envejecimiento prematuro. Los polifenoles del vino tonifican y mejoran microcirculación. Rejuvenece, hidrata y promueve regeneración celular visible.',
    image: '/products/wine-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'ANTI-EDAD',
    ingredients: ['Vino tinto reservación', 'Resveratrol puro', 'Aceite de uva', 'Vitamina E'],
    benefits: ['Antienvejecimiento', 'Combate flacidez', 'Regeneración celular', 'Neutraliza radicales libres'],
    usage: 'Uso nocturno. Aplicar con masajes ascendentes en rostro y cuello.',
    skinType: ['Piel madura', 'Piel flácida', 'Piel con arrugas', 'Piel opaca'],
    weight: '100g'
  },
  {
    id: 'jabon-zanahoria',
    slug: 'jabon-zanahoria',
    name: 'Jabón de Zanahoria',
    category: 'jabones',
    price: 10.50,
    description: 'Minimiza poros y espinillas. Aporta brillo natural y suaviza la piel.',
    fullDescription: 'La zanahoria es rica en beta-caroteno que se convierte en vitamina A en la piel, regulando producción de sebo y minimizando poros. Uso frecuente revela piel con brillo natural, sin espinillas, suave y tonificada. El secreto de piel perfecta coreano.',
    image: '/products/carrot-soap.jpg',
    featured: false,
    inStock: true,
    handmade: true,
    ingredients: ['Zanahoria orgánica', 'Beta-caroteno', 'Aceite de zanahoria', 'Vitamina E'],
    benefits: ['Minimiza poros', 'Reduce espinillas', 'Brillo natural', 'Nutre profundamente'],
    usage: 'Uso diario por la mañana. Enjuagar con agua fría para cerrar poros.',
    skinType: ['Piel con poros dilatados', 'Piel con espinillas', 'Piel opaca', 'Piel grasa'],
    weight: '100g'
  },
  {
    id: 'jabon-naranja-estropajo',
    slug: 'jabon-naranja-estropajo',
    name: 'Jabón de Naranja y Estropajo ⭐',
    category: 'jabones',
    price: 11.00,
    description: 'Estimula circulación y elimina células muertas. Exfoliación y relajación muscular.',
    fullDescription: 'La combinación perfecta de exfoliación y relajación. El estropajo natural elimina tejido muerto y estimula circulación sanguínea. La naranja aporta vitamina C que ilumina y aceite cítrico que tonifica. Relajante muscular para después del ejercicio. ¡El favorito de Ana!',
    image: '/products/orange-loofah-soap.jpg',
    featured: true,
    inStock: true,
    handmade: true,
    badge: 'EXFOLIANTE',
    ingredients: ['Cáscara de naranja orgánica', 'Estropajo natural', 'Aceite esencial de naranja', 'Miel'],
    benefits: ['Estimula circulación', 'Elimina tejido muerto', 'Elimina exceso de grasa', 'Relajante muscular'],
    usage: 'Masajear con movimientos circulares ascendentes. Ideal después de ejercicio.',
    skinType: ['Piel con celulitis', 'Piel cansada', 'Piel áspera', 'Todo tipo de piel'],
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
