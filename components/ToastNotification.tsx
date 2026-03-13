'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
};

const bgColors = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-amber-50 border-amber-200',
  info: 'bg-blue-50 border-blue-200',
};

function ToastItem({ toast, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const Icon = icons[toast.type];

  useEffect(() => {
    const duration = toast.duration || 5000;
    const interval = (duration / 100) * 16; // Update every ~16ms

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toast.duration]);

  const handleClose = () => {
    setProgress(0);
    setTimeout(() => onClose(toast.id), 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`${bgColors[toast.type]} border rounded-lg shadow-lg p-4 min-w-[320px] max-w-md relative overflow-hidden`}
    >
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-current opacity-50"
        style={{ backgroundColor: colors[toast.type].replace('bg-', '') }}
        initial={{ width: '100%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />

      <div className="flex items-start gap-3">
        {/* Icon with pulse */}
        <motion.div
          className={`${colors[toast.type]} rounded-full p-1 flex-shrink-0`}
          animate={
            toast.type === 'warning'
              ? { scale: [1, 1.05, 1] }
              : {}
          }
          transition={{ duration: 1, repeat: toast.type === 'warning' ? Infinity : 0 }}
        >
          <Icon className="h-4 w-4 text-white" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h4
            className="font-semibold text-sm text-gray-900"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {toast.title}
          </motion.h4>
          {toast.message && (
            <motion.p
              className="text-sm text-gray-600 mt-0.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              {toast.message}
            </motion.p>
          )}
        </div>

        {/* Close button */}
        <motion.button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

let toastCount = 0;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Listen for custom toast events
    const handleToast = (e: CustomEvent<Omit<Toast, 'id'>>) => {
      const id = `toast-${toastCount++}`;
      const newToast = { ...e.detail, id };

      setToasts(prev => [...prev, newToast]);

      // Auto-remove after duration
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, e.detail.duration || 5000);
    };

    window.addEventListener('toast' as any, handleToast);
    return () => window.removeEventListener('toast' as any, handleToast);
  }, []);

  const handleClose = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={handleClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

// Helper function to show toasts
export function showToast(toast: Omit<Toast, 'id'>) {
  window.dispatchEvent(new CustomEvent('toast', { detail: toast }) as any);
}

// Convenience functions
export const toast = {
  success: (title: string, message?: string) => showToast({ type: 'success', title, message }),
  error: (title: string, message?: string) => showToast({ type: 'error', title, message }),
  warning: (title: string, message?: string) => showToast({ type: 'warning', title, message }),
  info: (title: string, message?: string) => showToast({ type: 'info', title, message }),
};
