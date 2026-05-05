import { AnalysisForm } from '@/components/forms/AnalysisForm';
import { SavedApartmentsPanel } from '@/components/properties/SavedApartmentsPanel';

export default function NewAnalysisPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">New Analysis</h1><p className="mt-1 text-sm leading-6 text-slate-500">Enter assumptions and view formula-transparent KPIs in real time.</p></div>
      <AnalysisForm />
      <SavedApartmentsPanel
        title="Analysis history"
        description="Saved analyses are stored in this browser for guest mode and can be removed when no longer needed."
      />
    </div>
  );
}
