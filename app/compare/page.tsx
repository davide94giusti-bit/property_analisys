import { ComparisonClient } from '@/components/comparison/ComparisonClient';

export default function ComparePage() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Compare Properties</h1><p className="mt-1 text-sm leading-6 text-slate-500">Side-by-side comparison of saved analyses and demo properties.</p></div><ComparisonClient /></div>;
}
