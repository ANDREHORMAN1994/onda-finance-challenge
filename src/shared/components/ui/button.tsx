import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/classNames';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-70',
  {
    variants: {
      size: {
        default: 'px-5 py-3',
        sm: 'px-4 py-2',
      },
      variant: {
        default: 'bg-slate-950 text-white hover:bg-slate-800',
        destructive: 'bg-rose-600 text-white hover:bg-rose-700',
        outline:
          'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100',
        secondary: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, type = 'button', variant, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
