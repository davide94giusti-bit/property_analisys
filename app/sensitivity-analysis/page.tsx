import { SensitivityClient } from '@/components/sensitivity/SensitivityClient';

export default function SensitivityPage() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Sensitivity Analysis</h1><p className="mt-1 text-sm leading-6 text-slate-500">Interactive sensitivity tables and charts for ADR, occupancy, interest rates, and costs.</p></div><SensitivityClient /></div>;
}
