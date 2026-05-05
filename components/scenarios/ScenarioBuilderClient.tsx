'use client';

import { useMemo, useState } from 'react';
import { Download, SlidersHorizontal } from 'lucide-react';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { generateSpreadsheetBaselineScenarios } from '@/lib/scenarios/generator';
import { scenariosToCsv } from '@/lib/import-export/csv';
import { ScenarioTable } from './ScenarioTable';
import { KpiCard } from '@/components/kpi/KpiCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { saveGuestScenarios } from '@/lib/storage/local';
import { clientDebugLog } from '@/lib/client-debug';

export function ScenarioBuilderClient() {
  const [minCoverage, setMinCoverage] = useState(1.0);
  const scenarios = useMemo(() => generateSpreadsheetBaselineScenarios(DEFAULT_ANALYSIS_INPUT), []);
  const filtered = scenarios.filter((s) => (s.results.coverageRatio ?? 0) >= minCoverage);
  const best = filtered[0];

  function downloadCsv() {
    try {
      const blob = new Blob([scenariosToCsv(filtered)], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'property-scenarios.csv';
      link.click();
      URL.revokeObjectURL(url);
      clientDebugLog('info', 'scenario-builder', 'Scenario CSV export completed', { scenarioCount: filtered.length });
    } catch (error) {
      clientDebugLog('error', 'scenario-builder', 'Scenario CSV export failed', { error: String(error), scenarioCount: filtered.length });
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Scenarios generated" value={String(scenarios.length)} />
        <KpiCard label="Filtered scenarios" value={String(filtered.length)} />
        <KpiCard label="Best investment score" value={best ? `${best.results.investmentScore}/100` : 'N/A'} />
        <KpiCard label="Best coverage" value={best?.results.coverageRatio ? `${best.results.coverageRatio.toFixed(2)}x` : 'N/A'} />
      </div>
      <Card>
        <CardHeader><CardTitle>Scenario controls</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-[auto_minmax(160px,1fr)_auto] lg:flex lg:flex-wrap lg:items-center">
          <label className="text-sm font-medium text-slate-700">Minimum coverage ratio</label>
          <input className="h-11 w-full accent-slate-950 lg:w-64" type="range" min="0" max="5" step="0.05" value={minCoverage} onChange={(e) => setMinCoverage(Number(e.target.value))} />
          <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm">{minCoverage.toFixed(2)}x</span>
          <Button variant="secondary" onClick={() => saveGuestScenarios(filtered)}><SlidersHorizontal className="mr-2 h-4 w-4" />Save filtered set</Button>
          <Button onClick={downloadCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
        </CardContent>
      </Card>
      <ScenarioTable scenarios={filtered} />
    </div>
  );
}
