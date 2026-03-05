import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "w-full px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border bg-input-bg border-input-border text-input-text placeholder:text-input-placeholder focus:ring-input-focus-ring focus:border-input-border disabled:bg-input-disabled-bg disabled:text-input-disabled-text",
        outlined:
          "border-2 bg-input-bg border-input-border text-input-text placeholder:text-input-placeholder focus:ring-input-focus-ring focus:border-input-border disabled:bg-input-disabled-bg disabled:text-input-disabled-text",
        filled:
          "bg-input-filled-bg border-0 text-input-text placeholder:text-input-placeholder focus:ring-input-focus-ring focus:bg-input-filled-focus-bg disabled:bg-input-disabled-bg disabled:text-input-disabled-text",
        flushed:
          "border-0 border-b-2 bg-transparent border-input-border text-input-text placeholder:text-input-placeholder rounded-none focus:ring-0 focus:border-input-border px-0 disabled:text-input-disabled-text",
        ghost:
          "border-0 bg-transparent text-input-text placeholder:text-input-placeholder focus:ring-0 focus:bg-input-filled-bg disabled:bg-input-disabled-bg disabled:text-input-disabled-text",
      },
      size: {
        sm: "text-sm py-1.5 px-2.5",
        md: "text-base py-2 px-3",
        lg: "text-lg py-2.5 px-4",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      error: {
        true: "border-input-error-border focus:ring-input-error-ring",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "flushed",
        rounded: ["none", "sm", "md", "lg", "xl", "full"],
        class: "rounded-none",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
      error: false,
    },
  },
);

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size"
  >,
  VariantProps<typeof inputVariants> {
  value?: string | number;
  onChange?: (value: string | number) => void;
  debounce?: number;
  enableDebounce?: boolean;
}

function Input({
  value: initialValue = "",
  onChange,
  debounce = 500,
  enableDebounce = false,
  variant,
  size,
  rounded,
  error,
  className = "",
  ...props
}: InputProps) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    if (!enableDebounce || !onChange) return;

    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange, enableDebounce]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (!enableDebounce && onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
      className={cn(inputVariants({ variant, size, rounded, error }), className)}
    />
  );
}

export { Input };
