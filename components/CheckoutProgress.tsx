'use client';

import { motion } from 'framer-motion';
import { Check, ShoppingBag, User, Truck, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckoutStep {
  id: string;
  label: string;
  icon: React.ElementType;
  status: 'pending' | 'current' | 'completed';
}

interface CheckoutProgressProps {
  steps: CheckoutStep[];
  className?: string;
}

export function CheckoutProgress({ steps, className }: CheckoutProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(steps.filter(s => s.status !== 'pending').length / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-terracotta to-amber-500"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isPending = step.status === 'pending';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2',
                    isCompleted ? 'bg-terracotta' : 'bg-gray-200'
                  )}
                  style={{ zIndex: 0 }}
                />
              )}

              {/* Step circle */}
              <motion.div
                whileHover={isPending ? {} : { scale: 1.1 }}
                className={cn(
                  'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                  isCompleted && 'bg-terracotta text-white',
                  isCurrent && 'bg-terracotta text-white ring-4 ring-terracotta/20',
                  isPending && 'bg-gray-200 text-gray-500'
                )}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Icon className="h-4 w-4" />
                )}

                {/* Pulse animation for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-terracotta"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ opacity: 0.3 }}
                  />
                )}
              </motion.div>

              {/* Step label */}
              <span
                className={cn(
                  'text-xs mt-2 font-medium text-center max-w-full',
                  isCompleted && 'text-terracotta',
                  isCurrent && 'text-terracotta font-semibold',
                  isPending && 'text-gray-500'
                )}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * getDefaultCheckoutSteps - Returns default checkout steps
 */
export function getDefaultCheckoutSteps(): CheckoutStep[] {
  return [
    {
      id: 'cart',
      label: 'Carrito',
      icon: ShoppingBag,
      status: 'current',
    },
    {
      id: 'info',
      label: 'Información',
      icon: User,
      status: 'pending',
    },
    {
      id: 'shipping',
      label: 'Envío',
      icon: Truck,
      status: 'pending',
    },
    {
      id: 'payment',
      label: 'Pago',
      icon: CreditCard,
      status: 'pending',
    },
  ];
}

/**
 * CompactCheckoutProgress - Smaller version for mobile
 */
interface CompactCheckoutProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function CompactCheckoutProgress({ currentStep, totalSteps, className }: CompactCheckoutProgressProps) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Paso {currentStep} de {totalSteps}
        </span>
        <span className="text-sm text-terracotta font-semibold">
          {Math.round(progress)}% completado
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-gradient-to-r from-terracotta to-amber-500 h-2 rounded-full"
        />
      </div>
    </div>
  );
}
