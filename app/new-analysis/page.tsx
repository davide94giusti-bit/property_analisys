import { AnalysisForm } from '@/components/forms/AnalysisForm';

export default function NewAnalysisPage() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">New Analysis</h1><p className="mt-1 text-sm leading-6 text-slate-500">Enter assumptions and view formula-transparent KPIs in real time.</p></div><AnalysisForm /></div>;
}
