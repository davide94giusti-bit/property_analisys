import { cn } from './utils';

export function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'good' | 'warning' | 'bad' }) {
  const classes = {
    neutral: 'bg-slate-100 text-slate-700',
    good: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-800',
    bad: 'bg-red-100 text-red-700'
  };
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', classes[tone])}>{children}</span>;
}
