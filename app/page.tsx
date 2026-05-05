import { demoProperties } from '@/lib/demo-data';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { generateSpreadsheetBaselineScenarios } from '@/lib/scenarios/generator';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { KpiCard } from '@/components/kpi/KpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const rows = demoProperties.map((input) => ({ input, result: calculateAnalysis(input) }));
  const scenarios = generateSpreadsheetBaselineScenarios(demoProperties[0]);
  const bestNet = rows.reduce((best, row) => row.result.netMonthly > best.result.netMonthly ? row : best, rows[0]);
  const bestRoi = rows.reduce((best, row) => (row.result.cashOnCashRoi ?? -1) > (best.result.cashOnCashRoi ?? -1) ? row : best, rows[0]);
  const fastest = rows.reduce((best, row) => (row.result.paybackPeriodYears ?? 999) < (best.result.paybackPeriodYears ?? 999) ? row : best, rows[0]);
  const avgCashFlow = rows.reduce((sum, row) => sum + row.result.monthlyCashFlowAfterDebt, 0) / rows.length;
  const negativeScenarios = scenarios.filter((s) => s.results.monthlyCashFlowAfterDebt < 0).length;
  const strongScenarios = scenarios.filter((s) => s.results.investmentScore >= 70).length;

  return (
    <div className="min-w-0 space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1><p className="mt-1 text-sm leading-6 text-slate-500">Portfolio-level KPI overview using demo properties and imported spreadsheet scenario logic.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        <KpiCard label="Properties analyzed" value={String(rows.length)} />
        <KpiCard label="Scenarios generated" value={String(scenarios.length)} />
        <KpiCard label="Best net monthly" value={bestNet.input.property.name} helper={formatCurrency(bestNet.result.netMonthly)} tone="good" />
        <KpiCard label="Best ROI" value={bestRoi.input.property.name} helper={formatPercent(bestRoi.result.cashOnCashRoi)} tone="good" />
        <KpiCard label="Fastest payback" value={fastest.input.property.name} helper={fastest.result.paybackPeriodYears === null ? 'N/A' : `${formatNumber(fastest.result.paybackPeriodYears, 1)} years`} />
        <KpiCard label="Avg monthly cash flow" value={formatCurrency(avgCashFlow)} tone={avgCashFlow >= 0 ? 'good' : 'bad'} />
        <KpiCard label="Negative scenarios" value={String(negativeScenarios)} tone={negativeScenarios ? 'warning' : 'good'} />
        <KpiCard label="Strong scenarios" value={String(strongScenarios)} tone="good" />
      </div>

      <div className="grid gap-4 md:hidden">
        {rows.map(({ input, result }) => (
          <Card key={input.property.name}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><div className="truncate font-semibold text-slate-950">{input.property.name}</div><div className="mt-1 text-xs text-slate-500">{input.property.city}, {input.property.country}</div></div>
                <Badge tone={result.monthlyCashFlowAfterDebt >= 0 ? 'good' : 'bad'}>{result.investmentScore}/100</Badge>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div><dt className="text-slate-500">Price</dt><dd className="font-semibold">{formatCurrency(input.purchase.propertyPrice)}</dd></div>
                <div><dt className="text-slate-500">ADR</dt><dd className="font-semibold">{formatCurrency(input.rental.adr)}</dd></div>
                <div><dt className="text-slate-500">Occupancy</dt><dd className="font-semibold">{formatPercent(input.rental.occupancy)}</dd></div>
                <div><dt className="text-slate-500">Cash flow</dt><dd className={result.monthlyCashFlowAfterDebt >= 0 ? 'font-semibold text-emerald-700' : 'font-semibold text-red-700'}>{formatCurrency(result.monthlyCashFlowAfterDebt)}</dd></div>
                <div><dt className="text-slate-500">ROI</dt><dd className="font-semibold">{formatPercent(result.cashOnCashRoi)}</dd></div>
                <div><dt className="text-slate-500">Coverage</dt><dd className="font-semibold">{formatNumber(result.coverageRatio,2)}x</dd></div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hidden md:block">
        <CardHeader><CardTitle>Saved analyses</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 text-xs text-slate-500">Scroll horizontally to inspect all portfolio metrics.</div>
          <div className="max-w-full overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[1040px] w-full text-left text-sm"><thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr>{['Property','Location','Price','ADR','Occupancy','Gross revenue','Net monthly','ROI','Coverage','Payback','Risk','Score'].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead><tbody>{rows.map(({ input, result }) => <tr key={input.property.name} className="border-t"><td className="px-3 py-3 font-semibold">{input.property.name}</td><td className="px-3 py-3">{input.property.city}, {input.property.country}</td><td className="px-3 py-3">{formatCurrency(input.purchase.propertyPrice)}</td><td className="px-3 py-3">{formatCurrency(input.rental.adr)}</td><td className="px-3 py-3">{formatPercent(input.rental.occupancy)}</td><td className="px-3 py-3">{formatCurrency(result.grossRevenue)}</td><td className="px-3 py-3">{formatCurrency(result.netMonthly)}</td><td className="px-3 py-3">{formatPercent(result.cashOnCashRoi)}</td><td className="px-3 py-3">{formatNumber(result.coverageRatio,2)}x</td><td className="px-3 py-3">{result.paybackPeriodYears === null ? 'N/A' : formatNumber(result.paybackPeriodYears,1)}</td><td className="px-3 py-3">{result.riskScore}</td><td className="px-3 py-3 font-semibold">{result.investmentScore}</td></tr>)}</tbody></table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
