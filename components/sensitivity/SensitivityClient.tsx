'use client';

import { useMemo } from 'react';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/formatting';

export function SensitivityClient() {
  const occupancyLine = useMemo(() => Array.from({ length: 10 }, (_, i) => {
    const occupancy = 0.45 + i * 0.05;
    const input = { ...DEFAULT_ANALYSIS_INPUT, rental: { ...DEFAULT_ANALYSIS_INPUT.rental, occupancy } };
    const result = calculateAnalysis(input);
    return { occupancy: `${(occupancy * 100).toFixed(0)}%`, roi: result.cashOnCashRoi ? result.cashOnCashRoi * 100 : 0, cashFlow: result.monthlyCashFlowAfterDebt };
  }), []);

  const heatmap = useMemo(() => [70, 90, 110, 130, 150].map((adr) => [0.5, 0.6, 0.7, 0.8, 0.9].map((occupancy) => {
    const input = { ...DEFAULT_ANALYSIS_INPUT, rental: { ...DEFAULT_ANALYSIS_INPUT.rental, adr, occupancy } };
    return { adr, occupancy, result: calculateAnalysis(input) };
  })), []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>ROI as occupancy changes</CardTitle></CardHeader>
        <CardContent className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={occupancyLine}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="occupancy" /><YAxis /><Tooltip /><Line type="monotone" dataKey="roi" name="ROI %" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>ADR vs Occupancy heatmap: monthly cash flow after debt</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-[560px] w-full text-center text-sm"><thead><tr><th className="p-2 text-left">ADR / Occ.</th>{[0.5,0.6,0.7,0.8,0.9].map((o) => <th key={o}>{formatPercent(o,0)}</th>)}</tr></thead><tbody>{heatmap.map((row) => <tr key={row[0].adr} className="border-t"><th className="p-2 text-left">€{row[0].adr}</th>{row.map((cell) => <td key={`${cell.adr}-${cell.occupancy}`} className={cell.result.monthlyCashFlowAfterDebt >= 0 ? 'bg-emerald-50 p-2 text-emerald-800' : 'bg-red-50 p-2 text-red-700'}>{formatCurrency(cell.result.monthlyCashFlowAfterDebt)}</td>)}</tr>)}</tbody></table>
        </CardContent>
      </Card>
    </div>
  );
}
