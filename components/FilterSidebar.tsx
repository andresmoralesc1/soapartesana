'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Product, ProductCategory } from '@/lib/products';
import { cn } from '@/lib/utils';

export interface FilterOptions {
  categories: ProductCategory[];
  priceRange: [number, number];
  skinTypes: string[];
  inStockOnly: boolean;
  hasDiscount: boolean;
}

const DEFAULT_FILTERS: FilterOptions = {
  categories: [],
  priceRange: [0, 50],
  skinTypes: [],
  inStockOnly: false,
  hasDiscount: false,
};

interface FilterSidebarProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'pet-care': 'Pet Care',
  'facial': 'Línea Facial',
  'terapeutico': 'Terapéutico',
  'energetico': 'Energético',
  'jabones': 'Jabones Artesanales',
};

const ALL_SKIN_TYPES = [
  'Piel sensible',
  'Piel seca',
  'Piel grasa',
  'Piel mixta',
  'Piel normal',
  'Piel con acné',
  'Piel madura',
  'Dermatitis',
  'Eczema',
  'Rosácea',
  'Poros dilatados',
  'Cicatrices',
  'Manchas',
];

export function FilterSidebar({ products, onFilter, isOpen, onClose }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['categories', 'price']));
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }

    // Price range filter
    filtered = filtered.filter(p => {
      const price = typeof p.price === 'number' ? p.price : parseFloat(p.price);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Skin type filter
    if (filters.skinTypes.length > 0) {
      filtered = filtered.filter(p =>
        p.skinType?.some(s => filters.skinTypes.includes(s))
      );
    }

    // In stock only
    if (filters.inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Has discount (has badge)
    if (filters.hasDiscount) {
      filtered = filtered.filter(p => !!p.badge);
    }

    onFilter(filtered);

    // Update active filters count
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50) count++;
    if (filters.skinTypes.length > 0) count += filters.skinTypes.length;
    if (filters.inStockOnly) count++;
    if (filters.hasDiscount) count++;
    setActiveFiltersCount(count);
  };

  const toggleCategory = (category: ProductCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleSkinType = (skinType: string) => {
    setFilters(prev => ({
      ...prev,
      skinTypes: prev.skinTypes.includes(skinType)
        ? prev.skinTypes.filter(s => s !== skinType)
        : [...prev.skinTypes, skinType],
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed md:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-white border-r border-gray-200 overflow-y-auto z-50 md:z-10',
          !isOpen && '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-terracotta" />
              <h2 className="font-semibold text-lg">Filtros</h2>
              {activeFiltersCount > 0 && (
                <span className="bg-terracotta text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs"
                >
                  Limpiar
                </Button>
              )}
              <button
                onClick={onClose}
                className="md:hidden p-1 hover:bg-gray-100 rounded"
                aria-label="Cerrar filtros"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Categories */}
            <FilterSection
              title="Categorías"
              expanded={expandedSections.has('categories')}
              onToggle={() => toggleSection('categories')}
            >
              <div className="space-y-2">
                {(Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <Checkbox
                      checked={filters.categories.includes(key)}
                      onCheckedChange={() => toggleCategory(key)}
                    />
                    <span className="text-sm group-hover:text-terracotta transition-colors">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection
              title="Precio"
              expanded={expandedSections.has('price')}
              onToggle={() => toggleSection('price')}
            >
              <div className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={([min, max]) =>
                    setFilters(prev => ({ ...prev, priceRange: [min, max] }))
                  }
                  max={50}
                  step={1}
                  className="px-1"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">${filters.priceRange[0]}</span>
                  <span className="font-medium">${filters.priceRange[1]}</span>
                </div>
              </div>
            </FilterSection>

            {/* Skin Type */}
            <FilterSection
              title="Tipo de Piel"
              expanded={expandedSections.has('skinType')}
              onToggle={() => toggleSection('skinType')}
            >
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {ALL_SKIN_TYPES.map((skinType) => (
                  <label
                    key={skinType}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <Checkbox
                      checked={filters.skinTypes.includes(skinType)}
                      onCheckedChange={() => toggleSkinType(skinType)}
                    />
                    <span className="text-sm group-hover:text-terracotta transition-colors">
                      {skinType}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Additional Filters */}
            <FilterSection
              title="Más Filtros"
              expanded={expandedSections.has('more')}
              onToggle={() => toggleSection('more')}
            >
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.inStockOnly}
                    onCheckedChange={(checked) =>
                      setFilters(prev => ({ ...prev, inStockOnly: checked as boolean }))
                    }
                  />
                  <span className="text-sm group-hover:text-terracotta transition-colors">
                    Solo disponibles
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.hasDiscount}
                    onCheckedChange={(checked) =>
                      setFilters(prev => ({ ...prev, hasDiscount: checked as boolean }))
                    }
                  />
                  <span className="text-sm group-hover:text-terracotta transition-colors">
                    Con descuento
                  </span>
                </label>
              </div>
            </FilterSection>
          </div>

          {/* Apply Button (Mobile) */}
          <div className="mt-6 pt-6 border-t md:hidden">
            <Button
              onClick={onClose}
              className="w-full bg-terracotta text-white hover:bg-terracotta/90"
            >
              Ver Resultados ({products.length})
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

interface FilterSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, expanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-3 group"
      >
        <span className="font-medium text-sm">{title}</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="overflow-hidden">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
