import { ScenarioBuilderClient } from '@/components/scenarios/ScenarioBuilderClient';

export default function ScenarioBuilderPage() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Scenario Builder</h1><p className="mt-1 text-sm leading-6 text-slate-500">Generated scenario matrix based on the uploaded spreadsheet logic plus improved scoring.</p></div><ScenarioBuilderClient /></div>;
}
