import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium font-space transition-cyber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 cyber-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline: "border border-primary/30 glass text-foreground hover:bg-primary/20 hover:border-primary/50 hover:scale-105",
        secondary: "bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:scale-105 glow-secondary",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline neon-text",
        glass: "glass-card text-foreground hover:bg-white/10 hover:scale-105",
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow hover:scale-105",
        hero: "bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground hover:scale-110 hover:shadow-2xl font-semibold font-orbitron text-base animate-cyber-pulse relative overflow-hidden",
        wallet: "glass-card text-foreground hover:bg-primary/20 border-primary/30 hover:border-primary/50 hover:scale-105",
        cyber: "bg-gradient-to-r from-primary to-primary-variant text-primary-foreground hover:scale-105 cyber-glow font-orbitron tracking-wide",
        neon: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 neon-text",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
