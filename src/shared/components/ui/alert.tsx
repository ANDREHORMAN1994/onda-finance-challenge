import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/classNames';

const alertVariants = cva('rounded-2xl border p-4 text-sm', {
  variants: {
    variant: {
      default: 'border-slate-200 bg-slate-50 text-slate-700',
      destructive: 'border-rose-200 bg-rose-50 text-rose-900',
      success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      className={cn(alertVariants({ className, variant }))}
      ref={ref}
      role='alert'
      {...props}
    />
  ),
);

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      className={cn('font-medium text-inherit', className)}
      ref={ref}
      {...props}
    />
  ),
);

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p className={cn('mt-1 leading-6 text-inherit', className)} ref={ref} {...props} />
));

Alert.displayName = 'Alert';
AlertTitle.displayName = 'AlertTitle';
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
