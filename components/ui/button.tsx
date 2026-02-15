'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-300";

const variantStyles = {
  default: `${baseStyles} bg-[oklch(0.62_0.16_45)] text-white hover:bg-[oklch(0.57_0.16_45)] shadow-md hover:shadow-lg`,
  destructive: `${baseStyles} bg-red-600 text-white hover:bg-red-700 shadow-md`,
  outline: `${baseStyles} border-2 border-[oklch(0.62_0.16_45)] text-[oklch(0.55_0.14_155)] hover:bg-[oklch(0.55_0.14_155)] hover:text-white bg-transparent`,
  secondary: `${baseStyles} bg-[oklch(0.68_0.10_165)] text-[oklch(0.55_0.14_155)] hover:bg-[oklch(0.63_0.10_165)]`,
  ghost: `${baseStyles} text-[oklch(0.55_0.14_155)] hover:bg-[oklch(0.55_0.14_155/10)]`,
  link: `${baseStyles} text-[oklch(0.55_0.14_155)] underline-offset-4 hover:underline`,
  success: `${baseStyles} bg-[#22c55e] text-white hover:bg-[#16a34a] shadow-md`,
  whatsapp: `${baseStyles} bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-md hover:shadow-lg`,
};

const sizeStyles = {
  default: "h-10 px-6 py-2.5 text-sm",
  sm: "h-9 px-4 py-2 text-sm",
  lg: "h-12 px-8 py-3 text-base",
  icon: "h-10 w-10 p-0",
};

type ButtonProps = Omit<React.ComponentProps<"button">, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> &
  HTMLMotionProps<"button"> & {
    variant?: keyof typeof variantStyles;
    size?: keyof typeof sizeStyles;
    asChild?: boolean;
    loading?: boolean;
  };

// Motion props that should not be passed to Slot
const motionPropNames = new Set([
  'initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap',
  'whileFocus', 'whileInView', 'onAnimationStart', 'onAnimationComplete',
  'onDragStart', 'onDrag', 'onDragEnd', 'layout', 'layoutId',
]);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    loading = false,
    children,
    disabled,
    ...props
  }, ref) => {
    // Split props into motion props and regular props
    const motionProps: Record<string, any> = {};
    const restProps: Record<string, any> = {};

    Object.entries(props).forEach(([key, value]) => {
      if (motionPropNames.has(key)) {
        motionProps[key] = value;
      } else {
        restProps[key] = value;
      }
    });

    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...restProps}
        >
          {children as React.ReactElement}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed",
          "active:scale-95",
          className
        )}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...motionProps}
        {...restProps}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
