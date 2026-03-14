import { Product, getProductsByCategory } from './products';

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  textColor: string;
}

export const categoryInfoMap: Record<string, CategoryInfo> = {
  'pet-care': {
    id: 'pet-care',
    name: 'Pet Care',
    description: 'Jabones seguros para tus mascotas',
    icon: '🐾',
    color: 'from-amber-50 to-orange-50',
    textColor: 'text-amber-900',
  },
  'facial': {
    id: 'facial',
    name: 'Línea Facial',
    description: 'Cuidado especial para tu rostro',
    icon: '✨',
    color: 'from-rose-50 to-pink-50',
    textColor: 'text-rose-900',
  },
  'terapeutico': {
    id: 'terapeutico',
    name: 'Línea Terapéutica',
    description: 'Para pieles sensibles y problemáticas',
    icon: '🌿',
    color: 'from-lime-50 to-green-50',
    textColor: 'text-lime-900',
  },
  'jabones': {
    id: 'jabones',
    name: 'Jabones Artesanales',
    description: 'Elaborados con ingredientes naturales',
    icon: '🧼',
    color: 'from-green-50 to-emerald-50',
    textColor: 'text-emerald-900',
  },
  'energetico': {
    id: 'energetico',
    name: 'Línea Energética',
    description: 'Limpieza de cuerpo y espíritu',
    icon: '🌙',
    color: 'from-purple-50 to-indigo-50',
    textColor: 'text-purple-900',
  },
};

export function getCategoryInfo(categoryId: string): CategoryInfo {
  return categoryInfoMap[categoryId] || {
    id: categoryId,
    name: 'Productos',
    description: 'Explora nuestro catálogo',
    icon: '🌿',
    color: 'from-gray-50 to-slate-50',
    textColor: 'text-slate-900',
  };
}

export function getAllCategories(): CategoryInfo[] {
  return Object.values(categoryInfoMap);
}

export function getFeaturedProductsForCategory(categoryId: string, limit: number = 3): Product[] {
  const products = getProductsByCategory(categoryId as any);
  return products.filter(p => p.featured).slice(0, limit);
}
