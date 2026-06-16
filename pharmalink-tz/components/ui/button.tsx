'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// shadcn/ui-style button, themed for the PharmaLink neon palette.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neonBlue disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-neonGreen text-black hover:bg-neonGreenSoft shadow-[0_0_24px_rgba(16,185,129,0.45)] hover:shadow-[0_0_36px_rgba(16,185,129,0.65)]',
        accent:
          'bg-neonBlue text-black hover:bg-neonBlueSoft shadow-[0_0_24px_rgba(0,212,255,0.45)] hover:shadow-[0_0_36px_rgba(0,212,255,0.7)]',
        outline:
          'border border-white/15 bg-white/5 text-white hover:border-neonGreen/60 hover:bg-white/10',
        ghost: 'text-white/80 hover:bg-white/10 hover:text-white',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
