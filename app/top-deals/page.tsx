import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { generateSpreadsheetBaselineScenarios } from '@/lib/scenarios/generator';
import { topScenariosByMetric } from '@/lib/scenarios/ranking';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TopDealsPage() {
  const scenarios = generateSpreadsheetBaselineScenarios(DEFAULT_ANALYSIS_INPUT);
  const groups = [
    ['Highest coverage', topScenariosByMetric(scenarios, 'coverageRatio')],
    ['Highest net monthly', topScenariosByMetric(scenarios, 'netMonthly')],
    ['Highest ROI', topScenariosByMetric(scenarios, 'cashOnCashRoi')],
    ['Shortest payback', topScenariosByMetric(scenarios, 'paybackPeriodYears', 3, true)],
    ['Highest investment score', topScenariosByMetric(scenarios, 'investmentScore')],
    ['Lowest risk', topScenariosByMetric(scenarios, 'riskScore', 3, true)]
  ] as const;
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Top Deals</h1><p className="mt-1 text-sm leading-6 text-slate-500">Best scenario cohorts by investor KPIs.</p></div><div className="grid min-w-0 gap-6 xl:grid-cols-2">{groups.map(([title, items]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="space-y-3">{items.map((s) => <div key={`${title}-${s.scenarioName}`} className="min-w-0 rounded-2xl border border-slate-200 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="font-semibold">#{s.rank} {s.scenarioName}</div><div className="mt-1 text-xs text-slate-500">{s.property.name}</div></div><Badge tone={s.results.monthlyCashFlowAfterDebt >= 0 ? 'good' : 'bad'}>{s.results.monthlyCashFlowAfterDebt >= 0 ? 'Strong' : 'Negative Cash Flow'}</Badge></div><div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3"><div>Net: <strong>{formatCurrency(s.results.netMonthly)}</strong></div><div>ROI: <strong>{formatPercent(s.results.cashOnCashRoi)}</strong></div><div>Cov: <strong>{formatNumber(s.results.coverageRatio,2)}x</strong></div><div>Payback: <strong>{s.results.paybackPeriodYears === null ? 'N/A' : `${formatNumber(s.results.paybackPeriodYears,1)}y`}</strong></div><div>Risk: <strong>{s.results.riskScore}</strong></div><div>Score: <strong>{s.results.investmentScore}</strong></div></div></div>)}</CardContent></Card>)}</div></div>;
}
