'use client';

import { useMemo } from 'react';
import { FileDown } from 'lucide-react';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { generateSpreadsheetBaselineScenarios } from '@/lib/scenarios/generator';
import { createAnalysisPdf } from '@/lib/import-export/pdf';
import { Button } from '@/components/ui/button';
import { clientDebugLog } from '@/lib/client-debug';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ReportClient() {
  const result = useMemo(() => calculateAnalysis(DEFAULT_ANALYSIS_INPUT), []);
  const scenarios = useMemo(() => generateSpreadsheetBaselineScenarios(DEFAULT_ANALYSIS_INPUT).slice(0, 10), []);

  function downloadPdf() {
    try {
      const blob = createAnalysisPdf(DEFAULT_ANALYSIS_INPUT, result, scenarios);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'property-investment-report.pdf';
      a.click();
      URL.revokeObjectURL(url);
      clientDebugLog('info', 'reports', 'PDF report export completed', { scenarioCount: scenarios.length });
    } catch (error) {
      clientDebugLog('error', 'reports', 'PDF report export failed', { error: String(error) });
      throw error;
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle>PDF report generator</CardTitle></CardHeader>
      <CardContent className="space-y-4 text-sm text-slate-600">
        <p>The generator includes an executive summary, property overview, KPI summary, warnings, scenario ranking, and formula appendix. Extend the helper with chart image capture for lender-ready appendices.</p>
        <Button onClick={downloadPdf} className="w-full sm:w-auto"><FileDown className="mr-2 h-4 w-4" />Download demo PDF report</Button>
      </CardContent>
    </Card>
  );
}
