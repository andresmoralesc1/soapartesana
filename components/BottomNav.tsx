'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from './CartContext';
import { useFavorites } from './FavoritesContext';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

export function BottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { getTotalItems } = useCart();
  const { getFavoriteCount } = useFavorites();

  const totalItems = getTotalItems();
  const favoriteCount = getFavoriteCount();

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: NavItem[] = [
    {
      label: 'Inicio',
      href: '/',
      icon: Home,
    },
    {
      label: 'Productos',
      href: '/productos',
      icon: ShoppingBag,
      badge: totalItems > 0 ? totalItems : undefined,
    },
    {
      label: 'Favoritos',
      href: '/favoritos',
      icon: Heart,
      badge: favoriteCount > 0 ? favoriteCount : undefined,
    },
    {
      label: 'Perfil',
      href: '/cuenta',
      icon: User,
    },
    {
      label: 'Menú',
      href: '#menu',
      icon: Menu,
    },
  ];

  // Don't show on desktop
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null;
  }

  return (
    <>
      {/* Spacer for bottom nav */}
      <div className="h-20 md:hidden" />

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 md:hidden safe-area-inset-bottom"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 relative',
                  isActive
                    ? 'bg-terracotta/10 text-terracotta'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-terracotta/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <Icon className={cn('h-5 w-5', isActive && 'text-terracotta')} />

                  {/* Badge */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-terracotta text-white text-xs h-4 w-4 rounded-full flex items-center justify-center font-bold"
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </motion.span>
                  )}

                  {/* Pulse for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-terracotta/30 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                <span className={cn('text-[10px] font-medium mt-0.5', isActive && 'text-terracotta')}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Safe area for iOS */}
        <div className="h-safe-area-inset-bottom bg-white" />
      </motion.nav>
    </>
  );
}

/**
 * MobileContainer - Wrapper for mobile pages that accounts for bottom nav
 */
interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className={cn('pb-20 md:pb-0', className)}>
      {children}
    </div>
  );
}
