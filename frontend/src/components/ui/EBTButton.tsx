import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-primary-foreground hover:opacity-90 active:opacity-80 disabled:opacity-50",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:opacity-90 active:opacity-80 disabled:opacity-50",
        destructive:
          "border-transparent bg-destructive text-white hover:opacity-90 active:opacity-80 disabled:opacity-50",
        success:
          "border-transparent bg-primary/10 text-primary hover:opacity-90 active:opacity-80 disabled:opacity-50",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:opacity-90 active:opacity-80 disabled:opacity-50",
        notice:
          "border-transparent bg-slate-600 text-white hover:opacity-90 active:opacity-80 disabled:opacity-50",
        info:
          "border-transparent bg-blue-100 text-blue-800 hover:opacity-90 active:opacity-80 disabled:opacity-50",
        outline:
          "text-foreground border-border hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
        link: "bg-transparent text-primary underline-offset-4 hover:underline hover:opacity-80 active:opacity-60 disabled:opacity-50 focus:ring-0",
      },
      size: {
        sm: "text-sm px-3 py-1.5 gap-1.5",
        md: "text-base px-4 py-2 gap-2",
        lg: "text-lg px-6 py-3 gap-2.5",
        xl: "text-xl px-8 py-4 gap-3",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export default function Button({
  variant,
  size,
  rounded,
  fullWidth,
  className = "",
  children,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, rounded, fullWidth }), className)}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
