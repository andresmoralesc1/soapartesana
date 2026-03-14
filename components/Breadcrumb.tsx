'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  homeHref?: string;
}

export function Breadcrumb({ items, className, homeHref = '/' }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-center space-x-1 text-sm', className)}
      aria-label="Breadcrumb"
    >
      {/* Home link */}
      <Link
        href={homeHref}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Inicio"
      >
        <Home className="h-4 w-4" />
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          {item.current ? (
            <span className="font-medium text-foreground" aria-current="page">
              {item.name}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors truncate max-w-[200px]"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </motion.nav>
  );
}

/**
 * ProductBreadcrumb - Specialized breadcrumb for product pages
 */
interface ProductBreadcrumbProps {
  category: string;
  categoryName: string;
  productName: string;
  productSlug: string;
  className?: string;
}

export function ProductBreadcrumb({
  category,
  categoryName,
  productName,
  productSlug,
  className,
}: ProductBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    { name: 'Productos', href: '/productos' },
    { name: categoryName, href: `/productos?categoria=${category}` },
    { name: productName, href: `/productos/${productSlug}`, current: true },
  ];

  return <Breadcrumb items={items} className={className} />;
}

/**
 * CategoryBreadcrumb - Specialized breadcrumb for category pages
 */
interface CategoryBreadcrumbProps {
  categoryName: string;
  className?: string;
}

export function CategoryBreadcrumb({ categoryName, className }: CategoryBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    { name: 'Productos', href: '/productos' },
    { name: categoryName, href: '#', current: true },
  ];

  return <Breadcrumb items={items} className={className} />;
}

/**
 * SimpleBreadcrumb - For pages with simple hierarchy
 */
interface SimpleBreadcrumbProps {
  currentPage: string;
  parentPage?: { name: string; href: string };
  className?: string;
}

export function SimpleBreadcrumb({ currentPage, parentPage, className }: SimpleBreadcrumbProps) {
  const items: BreadcrumbItem[] = [];

  if (parentPage) {
    items.push({ name: parentPage.name, href: parentPage.href });
  }

  items.push({ name: currentPage, href: '#', current: true });

  return <Breadcrumb items={items} className={className} />;
}
