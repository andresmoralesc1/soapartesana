'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useId } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicroInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  success?: boolean;
  onShake?: () => void;
  inputType?: React.HTMLInputTypeAttribute;
}

export function MicroInput({
  label,
  error,
  success,
  className,
  onShake,
  inputType = 'text',
  ...props
}: MicroInputProps) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const controls = useAnimation();

  const triggerShake = async () => {
    await controls.start({
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    });
  };

  // Expose shake function
  if (onShake) {
    (props as any).shake = triggerShake;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const isPassword = inputType === 'password';
  const hasError = !!error;

  return (
    <div className="relative">
      {label && (
        <motion.label
          htmlFor={id}
          className="block text-sm font-medium mb-2 transition-colors"
          animate={{
            color: hasError ? '#ef4444' : success ? '#22c55e' : isFocused ? '#ea580c' : '#374151'
          }}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}

      <div className="relative">
        <motion.div
          animate={controls}
          className="relative"
        >
          <input
            id={id}
            type={isPassword && showPassword ? 'text' : inputType}
            value={props.value}
            onChange={handleChange}
            onFocus={(e) => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            className={cn(
              'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none bg-white',
              'placeholder:text-gray-400',
              hasError && 'border-red-500 bg-red-50/30',
              !hasError && isFocused && 'border-terracotta bg-orange-50/30',
              !hasError && !isFocused && 'border-gray-200',
              !hasError && success && 'border-green-500 bg-green-50/30',
              className
            )}
            {...props}
            aria-invalid={hasError}
            aria-describedby={error ? `${id}-error` : undefined}
          />

          {/* Focus ring effect */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none border-2 border-terracotta"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Status icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {hasError && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-red-500"
              >
                <AlertCircle className="h-5 w-5" />
              </motion.div>
            )}

            {success && !hasError && hasValue && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-green-500"
              >
                <Check className="h-5 w-5" />
              </motion.div>
            )}

            {isPassword && !hasError && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Error message with animation */}
      {hasError && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
        >
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </motion.p>
      )}

      {/* Character count for maxLength */}
      {props.maxLength && (
        <motion.div
          className="absolute -bottom-5 right-0 text-xs text-gray-400"
          animate={{
            color: hasValue && String(props.value || '').length > props.maxLength * 0.8 ? '#ef4444' : '#9ca3af'
          }}
        >
          {hasValue ? String(props.value || '').length : 0} / {props.maxLength}
        </motion.div>
      )}
    </div>
  );
}

// Shaking hook for form validation
export function useShake() {
  const [shakes, setShakes] = useState<Record<string, boolean>>({});

  const shake = (field: string) => {
    setShakes(prev => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShakes(prev => ({ ...prev, [field]: false }));
    }, 500);
  };

  return { shake, shakes };
}
