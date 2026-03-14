'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  viewportMargin?: string;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'blurIn';
}

const variants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

export function StaggeredGrid({
  children,
  className = '',
  staggerDelay = 0.1,
  viewportMargin = '-50px',
  animationType = 'fadeInUp',
}: StaggeredGridProps) {
  const selectedVariant = variants[animationType];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={selectedVariant}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={selectedVariant} transition={{ duration: 0.5 }}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * StaggeredItem - For individual items that need staggered animation
 */
interface StaggeredItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
}

export function StaggeredItem({
  children,
  className = '',
  delay = 0,
  animationType = 'fadeInUp',
}: StaggeredItemProps) {
  const selectedVariant = variants[animationType];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={selectedVariant}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggeredBentoGrid - Specialized for bento grid layouts
 */
interface StaggeredBentoGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredBentoGrid({
  children,
  className = '',
  staggerDelay = 0.15,
}: StaggeredBentoGridProps) {
  return (
    <div className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: index * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

/**
 * StaggeredList - For list items with staggered animation
 */
interface StaggeredListProps {
  items: ReactNode[];
  className?: string;
  staggerDelay?: number;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'scaleIn';
}

export function StaggeredList({
  items,
  className = '',
  staggerDelay = 0.1,
  animationType = 'fadeInUp',
}: StaggeredListProps) {
  const selectedVariant = variants[animationType];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={selectedVariant}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
