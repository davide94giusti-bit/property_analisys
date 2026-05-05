'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Calculator } from 'lucide-react';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { analysisInputSchema, type AnalysisInputFormValues } from '@/lib/validation/schemas';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { saveGuestAnalysis } from '@/lib/storage/local';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { KpiCard } from '@/components/kpi/KpiCard';

function NumberInput({ label, value, onChange, step = 1, percent = false }: { label: string; value: number; onChange: (value: number) => void; step?: number; percent?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type="number" step={step} value={percent ? Number((value * 100).toFixed(4)) : value} onChange={(e) => onChange((Number(e.target.value) || 0) / (percent ? 100 : 1))} />
    </div>
  );
}

export function AnalysisForm() {
  const [saved, setSaved] = useState(false);
  const form = useForm<AnalysisInputFormValues>({ resolver: zodResolver(analysisInputSchema), defaultValues: DEFAULT_ANALYSIS_INPUT, mode: 'onChange' });
  const values = form.watch();
  const result = useMemo(() => calculateAnalysis(values), [values]);

  function patch(path: string, value: unknown) {
    form.setValue(path as never, value as never, { shouldDirty: true, shouldValidate: true });
    setSaved(false);
  }

  function save() {
    saveGuestAnalysis(values);
    setSaved(true);
  }

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Property Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>Property name</Label><Input value={values.property.name} onChange={(e) => patch('property.name', e.target.value)} /></div>
            <div className="space-y-1.5"><Label>City</Label><Input value={values.property.city ?? ''} onChange={(e) => patch('property.city', e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Country</Label><Input value={values.property.country ?? ''} onChange={(e) => patch('property.country', e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Neighborhood</Label><Input value={values.property.neighborhood ?? ''} onChange={(e) => patch('property.neighborhood', e.target.value)} /></div>
            <NumberInput label="Bedrooms" value={values.property.bedrooms ?? 0} onChange={(v) => patch('property.bedrooms', v)} />
            <NumberInput label="Interior size m2" value={values.property.sizeM2 ?? 0} onChange={(v) => patch('property.sizeM2', v)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Purchase and Financing</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NumberInput label="Property price" value={values.purchase.propertyPrice} onChange={(v) => patch('purchase.propertyPrice', v)} />
            <NumberInput label="Purchase fees %" value={values.purchase.purchaseFeesPercent} onChange={(v) => patch('purchase.purchaseFeesPercent', v)} percent step={0.1} />
            <NumberInput label="Renovation cost" value={values.purchase.renovationCost} onChange={(v) => patch('purchase.renovationCost', v)} />
            <NumberInput label="Furnishing cost" value={values.purchase.furnishingCost} onChange={(v) => patch('purchase.furnishingCost', v)} />
            <NumberInput label="Down payment %" value={values.financing.downPaymentPercent} onChange={(v) => patch('financing.downPaymentPercent', v)} percent step={0.1} />
            <NumberInput label="Interest rate %" value={values.financing.annualInterestRate} onChange={(v) => patch('financing.annualInterestRate', v)} percent step={0.1} />
            <NumberInput label="Loan term years" value={values.financing.loanYears} onChange={(v) => patch('financing.loanYears', v)} />
            <NumberInput label="Extra monthly debt costs" value={values.financing.extraMonthlyDebtCosts} onChange={(v) => patch('financing.extraMonthlyDebtCosts', v)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Rental and Operating Assumptions</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NumberInput label="ADR" value={values.rental.adr} onChange={(v) => patch('rental.adr', v)} />
            <NumberInput label="Occupancy %" value={values.rental.occupancy} onChange={(v) => patch('rental.occupancy', v)} percent step={0.1} />
            <NumberInput label="Average stay" value={values.rental.averageStay} onChange={(v) => patch('rental.averageStay', v)} step={0.1} />
            <NumberInput label="Rentable days" value={values.rental.rentableDays} onChange={(v) => patch('rental.rentableDays', v)} />
            <NumberInput label="Guest cleaning fee" value={values.rental.guestCleaningFee} onChange={(v) => patch('rental.guestCleaningFee', v)} />
            <NumberInput label="Cleaning cost" value={values.rental.cleaningCost} onChange={(v) => patch('rental.cleaningCost', v)} />
            <NumberInput label="Amenities monthly" value={values.operatingCosts.amenitiesMonthly} onChange={(v) => patch('operatingCosts.amenitiesMonthly', v)} />
            <NumberInput label="Utilities monthly" value={values.operatingCosts.utilitiesMonthly} onChange={(v) => patch('operatingCosts.utilitiesMonthly', v)} />
            <NumberInput label="Internet monthly" value={values.operatingCosts.internetMonthly} onChange={(v) => patch('operatingCosts.internetMonthly', v)} />
            <NumberInput label="Platform fee %" value={values.operatingCosts.platformFeePercent} onChange={(v) => patch('operatingCosts.platformFeePercent', v)} percent step={0.1} />
            <NumberInput label="VAT/local tax %" value={values.operatingCosts.vatLocalTaxPercent} onChange={(v) => patch('operatingCosts.vatLocalTaxPercent', v)} percent step={0.1} />
            <NumberInput label="Maintenance reserve %" value={values.operatingCosts.maintenanceReservePercent} onChange={(v) => patch('operatingCosts.maintenanceReservePercent', v)} percent step={0.1} />
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <KpiCard label="Net monthly before debt" value={formatCurrency(result.netMonthly, values.outputSettings.currency)} />
          <KpiCard label="Monthly cash flow after debt" value={formatCurrency(result.monthlyCashFlowAfterDebt, values.outputSettings.currency)} tone={result.monthlyCashFlowAfterDebt >= 0 ? 'good' : 'bad'} />
          <KpiCard label="Cash-on-cash ROI" value={formatPercent(result.cashOnCashRoi)} tone={(result.cashOnCashRoi ?? 0) >= values.outputSettings.targetRoi ? 'good' : 'warning'} />
          <KpiCard label="Coverage ratio" value={`${formatNumber(result.coverageRatio, 2)}x`} tone={(result.coverageRatio ?? 0) >= 1.25 ? 'good' : 'warning'} />
          <KpiCard label="Payback period" value={result.paybackPeriodYears === null ? 'N/A' : `${formatNumber(result.paybackPeriodYears, 1)} years`} />
          <KpiCard label="Investment score" value={`${result.investmentScore}/100`} helper={result.riskLabel} />
        </div>
        <Card>
          <CardHeader><CardTitle>Warnings</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {result.warnings.length ? result.warnings.map((warning) => <div key={warning} className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{warning}</div>) : <Badge tone="good">No critical warnings</Badge>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Formula Transparency</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            {Object.values(result.traces).map((item) => (
              <details key={item.name} className="min-w-0 rounded-xl border border-slate-200 p-3">
                <summary className="cursor-pointer font-semibold text-slate-900">{item.name}</summary>
                <div className="mt-2 overflow-x-auto text-xs">{item.formula}</div>
                <ul className="mt-2 list-disc pl-4 text-xs">
                  {item.inputs.map((i) => <li key={i.label}>{i.label}: {i.value === null ? 'N/A' : i.value} ({i.source})</li>)}
                </ul>
              </details>
            ))}
          </CardContent>
        </Card>
        <Button className="w-full" onClick={save}><Save className="mr-2 h-4 w-4" />{saved ? 'Saved in guest mode' : 'Save analysis'}</Button>
        <Button variant="secondary" className="w-full" onClick={() => form.reset(DEFAULT_ANALYSIS_INPUT)}><Calculator className="mr-2 h-4 w-4" />Reset to demo base case</Button>
      </aside>
    </div>
  );
}
