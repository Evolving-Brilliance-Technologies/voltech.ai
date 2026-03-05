import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full px-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-input",
        outlined: "border-2 bg-background border-input text-foreground focus:ring-ring focus:border-input",
        filled: "bg-secondary border-0 text-foreground focus:ring-ring focus:bg-secondary/80",
        flushed: "border-0 border-b-2 bg-transparent border-input text-foreground rounded-none focus:ring-0 focus:border-primary px-0",
        ghost: "border-0 bg-transparent text-foreground focus:ring-0 focus:bg-secondary/50",
      },
      size: {
        sm: "h-8 text-sm py-1 px-2",
        md: "h-10 text-base py-2 px-3",
        lg: "h-12 text-lg py-3 px-4",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  debounce?: number
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, rounded, error, debounce, onChange, value: propValue, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(propValue || "")

    // Update local value if prop value changes externally
    React.useEffect(() => {
      setLocalValue(propValue || "")
    }, [propValue])

    // Debounce logic
    React.useEffect(() => {
      if (debounce === undefined || !onChange) return

      const timeout = setTimeout(() => {
        // Only trigger if value actually changed
        if (localValue !== propValue) {
          const event = { target: { value: localValue } } as React.ChangeEvent<HTMLInputElement>
          onChange(event)
        }
      }, debounce)

      return () => clearTimeout(timeout)
    }, [localValue, debounce, onChange, propValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setLocalValue(val)
      
      // If no debounce, trigger immediately
      if (debounce === undefined && onChange) {
        onChange(e)
      }
    }

    return (
      <input
        type={type}
        ref={ref}
        value={debounce !== undefined ? localValue : propValue}
        onChange={handleChange}
        className={cn(
          inputVariants({ variant, size, rounded }),
          error && "border-destructive focus:ring-destructive",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
