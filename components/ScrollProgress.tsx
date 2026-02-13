'use client';

import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
      }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      <div className="h-full bg-gradient-to-r from-forest to-sage" />
    </motion.div>
  );
}
