'use client';

import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

const toastColors = {
  success: 'bg-emerald-600 border-emerald-700 text-white',
  error: 'bg-rose-600 border-rose-700 text-white',
  info: 'bg-blue-600 border-blue-700 text-white',
  warning: 'bg-amber-600 border-amber-700 text-white',
};

const toastIcons = {
  success: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeLinecap="round" />
      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
      <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeLinecap="round" />
      <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeLinecap="round" />
    </svg>
  ),
};

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  React.useEffect(() => {
    if (!toast.duration) return;

    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={`fixed top-4 right-4 z-50 flex items-start gap-3 p-4 rounded-lg shadow-2xl border-2 ${toastColors[toast.type]}`}
      >
        <div className="flex items-center gap-3 text-white">
          <div className="flex-shrink-0">{toastIcons[toast.type]}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="flex-shrink-0 hover:bg-white/10 rounded p-1 transition-colors"
            aria-label="Cerrar notificación"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {toast.duration && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: toast.duration / 1000, ease: 'linear' }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Context y Provider para gestión de toasts
interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const toastIdCounter = React.useRef<number>(0);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${toastIdCounter.current++}`;
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast] as Toast[]);
    return id;
  }, []);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast, dismissAll }}>
      {children}
      {/* Stack de toasts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// Hook simplificado para añadir toasts
export function useToasts() {
  const { addToast } = useToast();

  return React.useMemo(
    () => ({
      success: (message: string, duration = 4000) =>
        addToast({ type: 'success', message, duration }),
      error: (message: string, duration = 4000) =>
        addToast({ type: 'error', message, duration }),
      info: (message: string, duration = 4000) =>
        addToast({ type: 'info', message, duration }),
      warning: (message: string, duration = 4000) =>
        addToast({ type: 'warning', message, duration }),
    }),
    [addToast],
  );
}
