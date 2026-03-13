'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

const colors = [
  '#f43f5e', // rose
  '#fb923c', // orange
  '#fbbf24', // amber
  '#34d399', // emerald
  '#60a5fa', // blue
  '#a78bfa', // purple
  '#f472b6', // pink
];

export function ConfettiEffect({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      // Generate confetti pieces
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50, // -50 to 50
        y: Math.random() * -100 - 50, // -150 to -50
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
      }));
      setPieces(newPieces);

      // Clean up after animation
      setTimeout(() => setPieces([]), 2000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute top-1/2 left-1/2 w-3 h-3"
            style={{
              backgroundColor: piece.color,
            }}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              x: piece.x * 10,
              y: piece.y * 5,
              rotate: piece.rotation * 3,
              scale: [0, 1, 1, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.5,
              delay: piece.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Simplified success burst effect
export function SuccessBurst({ children, show }: { children: React.ReactNode; show: boolean }) {
  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {show && (
          <>
            {/* Ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-500"
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-500"
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            />
          </>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

// Mini sparkle effect for buttons
export function MiniSparkle({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 180 }}
          exit={{ scale: 0, rotate: 360 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0L14.59 8H24L16.41 14L20 24L12 17L4 24L7.59 14L0 8H9.41L12 0Z"
              fill="url(#sparkleGradient)"
            />
            <defs>
              <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Checkmark animation
export function Checkmark({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-green-500 rounded-full p-1"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3">
            <motion.path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
