import { Card, CardContent } from '@/components/ui/card';

export function KpiCard({ label, value, helper, tone = 'neutral' }: { label: string; value: string; helper?: string; tone?: 'neutral' | 'good' | 'bad' | 'warning' }) {
  const toneClass = {
    neutral: 'text-slate-950',
    good: 'text-emerald-700',
    bad: 'text-red-700',
    warning: 'text-amber-700'
  }[tone];
  return (
    <Card className="min-w-0">
      <CardContent className="p-4 sm:p-5">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
        <div className={`mt-2 break-words text-xl font-bold sm:text-2xl ${toneClass}`}>{value}</div>
        {helper ? <div className="mt-2 text-xs text-slate-500">{helper}</div> : null}
      </CardContent>
    </Card>
  );
}
