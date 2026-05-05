'use client';

import { useMemo } from 'react';
import { demoProperties } from '@/lib/demo-data';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SavedApartmentsPanel } from '@/components/properties/SavedApartmentsPanel';

export function ComparisonClient() {
  const rows = useMemo(() => demoProperties.map((input) => ({ input, result: calculateAnalysis(input) })), []);
  const maxInvestment = Math.max(...rows.map((r) => r.result.investmentScore));
  return (
    <div className="min-w-0 space-y-4">
      <SavedApartmentsPanel
        title="Saved properties in comparison"
        description="Delete saved apartments from the comparison source list without removing demo comparisons."
      />
      <div className="grid gap-4 md:hidden">
        {rows.map(({ input, result }) => (
          <Card key={input.property.name}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-semibold text-slate-950">{input.property.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{input.property.city}, {input.property.country}</div>
                </div>
                <Badge tone={result.investmentScore === maxInvestment ? 'good' : 'neutral'}>{result.investmentScore}/100</Badge>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div><dt className="text-slate-500">Price</dt><dd className="font-semibold">{formatCurrency(input.purchase.propertyPrice)}</dd></div>
                <div><dt className="text-slate-500">Cash required</dt><dd className="font-semibold">{formatCurrency(result.totalCashInvested)}</dd></div>
                <div><dt className="text-slate-500">Cash flow</dt><dd className={result.monthlyCashFlowAfterDebt >= 0 ? 'font-semibold text-emerald-700' : 'font-semibold text-red-700'}>{formatCurrency(result.monthlyCashFlowAfterDebt)}</dd></div>
                <div><dt className="text-slate-500">ROI</dt><dd className="font-semibold">{formatPercent(result.cashOnCashRoi)}</dd></div>
                <div><dt className="text-slate-500">Coverage</dt><dd className="font-semibold">{formatNumber(result.coverageRatio,2)}x</dd></div>
                <div><dt className="text-slate-500">Risk</dt><dd className="font-semibold">{result.riskScore}</dd></div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hidden md:block">
        <CardHeader><CardTitle>Property comparison</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 text-xs text-slate-500">Scroll horizontally to compare all underwriting metrics.</div>
          <div className="max-w-full overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[1120px] w-full text-left text-sm"><thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr>{['Property','Location','Price','ADR','Occupancy','Cash required','Loan payment','Net monthly','Cash flow','ROI','Payback','Coverage','Risk','Score'].map((h) => <th className="px-3 py-2" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(({ input, result }) => <tr key={input.property.name} className="border-t"><td className="px-3 py-3 font-semibold">{input.property.name}</td><td className="px-3 py-3">{input.property.city}, {input.property.country}</td><td className="px-3 py-3">{formatCurrency(input.purchase.propertyPrice)}</td><td className="px-3 py-3">{formatCurrency(input.rental.adr)}</td><td className="px-3 py-3">{formatPercent(input.rental.occupancy)}</td><td className="px-3 py-3">{formatCurrency(result.totalCashInvested)}</td><td className="px-3 py-3">{formatCurrency(result.monthlyLoanPayment)}</td><td className="px-3 py-3">{formatCurrency(result.netMonthly)}</td><td className={result.monthlyCashFlowAfterDebt >= 0 ? 'px-3 py-3 text-emerald-700' : 'px-3 py-3 text-red-700'}>{formatCurrency(result.monthlyCashFlowAfterDebt)}</td><td className="px-3 py-3">{formatPercent(result.cashOnCashRoi)}</td><td className="px-3 py-3">{result.paybackPeriodYears === null ? 'N/A' : formatNumber(result.paybackPeriodYears,1)}</td><td className="px-3 py-3">{formatNumber(result.coverageRatio,2)}x</td><td className="px-3 py-3">{result.riskScore}</td><td className={result.investmentScore === maxInvestment ? 'bg-emerald-50 px-3 py-3 font-bold text-emerald-700' : 'px-3 py-3'}>{result.investmentScore}</td></tr>)}</tbody></table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
