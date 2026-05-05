import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from './utils';

type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';

const variantClasses: Record<Variant, string> = {
  default: 'bg-slate-950 text-white hover:bg-slate-800',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
  outline: 'border border-slate-200 bg-white hover:bg-slate-50',
  ghost: 'hover:bg-slate-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700'
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn('inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50', variantClasses[variant], className)} {...props} />;
});
Button.displayName = 'Button';
