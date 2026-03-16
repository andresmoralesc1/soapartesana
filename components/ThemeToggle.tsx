'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/useTheme';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-muted/20" />
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' &&
    (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches));

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg bg-terracotta/10 hover:bg-terracotta/20 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus-visible:ring-2 focus-visible:ring-terracotta/30"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, type: 'spring' }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-terracotta" />
        ) : (
          <Sun className="h-4 w-4 text-terracotta" />
        )}
      </motion.div>
    </motion.button>
  );
}
