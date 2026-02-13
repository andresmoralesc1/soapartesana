'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { motion, type Transition } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Configuración de animación por tipo
const buttonTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  success?: boolean;
  magnetic?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  success = false,
  magnetic = false,
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  // Configurar efecto magnético
  React.useEffect(() => {
    if (!magnetic || !buttonRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const button = buttonRef.current;
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magnetic]);

  // Crear efecto ripple al hacer clic
  const createRipple = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remover ripple después de animación
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const Comp = asChild ? Slot : "button";

  return (
    <motion.button
      ref={buttonRef}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      animate={
        magnetic
          ? { x: mousePosition.x, y: mousePosition.y }
          : undefined
      }
      transition={buttonTransition}
      whileTap={{ scale: 0.95 }}
      whileFocus={{ scale: 1.02 }}
      whileHover={{ scale: magnetic ? 1.05 : 1.02 }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      disabled={props.disabled || loading || success}
      onClick={createRipple}
      {...(props as any)}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-current/50 rounded-full pointer-events-none"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "20px",
            height: "20px",
            marginLeft: "-10px",
            marginTop: "-10px",
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loader2 className="h-5 w-5 animate-spin" />
        </motion.span>
      )}

      {/* Success checkmark */}
      {success && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </motion.span>
      )}

      {/* Contenido original con opacity basado en estado */}
      <span className={cn(loading && "opacity-0", success && "opacity-0")}>
        <Slot>{props.children}</Slot>
      </span>

      {/* Press effect visual feedback */}
      <motion.span
        className="absolute inset-0 rounded-[inherit] bg-current/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPressed ? 0.15 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </motion.button>
  );
}

export { Button, buttonVariants };
