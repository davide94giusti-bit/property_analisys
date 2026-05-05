'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { deleteGuestAnalysis, GUEST_ANALYSES_CHANGED_EVENT, loadGuestAnalyses } from '@/lib/storage/local';
import type { AnalysisInput } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function getPropertyLabel(input: AnalysisInput): string {
  return input.property.name || 'Untitled apartment';
}

function getLocationLabel(input: AnalysisInput): string {
  return [input.property.city, input.property.country].filter(Boolean).join(', ') || 'Location not set';
}

export function SavedApartmentsPanel({
  title = 'Saved apartments',
  description = 'Previously saved apartment analyses from this browser.',
  emptyCta = true
}: {
  title?: string;
  description?: string;
  emptyCta?: boolean;
}) {
  const [analyses, setAnalyses] = useState<AnalysisInput[]>([]);
  const [pendingDelete, setPendingDelete] = useState<AnalysisInput | null>(null);

  const refresh = useCallback(() => setAnalyses(loadGuestAnalyses()), []);

  useEffect(() => {
    refresh();

    function handleStorage(event: StorageEvent) {
      if (event.key === 'property-platform:analyses') refresh();
    }

    function handleLocalChange(event: Event) {
      const customEvent = event as CustomEvent<AnalysisInput[]>;
      setAnalyses(Array.isArray(customEvent.detail) ? customEvent.detail : loadGuestAnalyses());
    }

    window.addEventListener('storage', handleStorage);
    window.addEventListener(GUEST_ANALYSES_CHANGED_EVENT, handleLocalChange as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(GUEST_ANALYSES_CHANGED_EVENT, handleLocalChange as EventListener);
    };
  }, [refresh]);

  const rows = useMemo(() => analyses.map((input) => ({ input, result: calculateAnalysis(input) })), [analyses]);

  function confirmDelete() {
    if (!pendingDelete?.id) return;
    const next = deleteGuestAnalysis(pendingDelete.id);
    setAnalyses(next);
    setPendingDelete(null);
  }

  return (
    <Card aria-labelledby="saved-apartments-title" role="region">
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <CardTitle id="saved-apartments-title">{title}</CardTitle>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
          </div>
          <Badge tone="neutral">{rows.length} saved</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-950">No saved apartments yet.</p>
            <p className="mt-1">Start a new analysis to add properties to your list.</p>
            {emptyCta ? (
              <Button asChild className="mt-4 w-full sm:w-auto">
                <Link href="/new-analysis">Start New Analysis</Link>
              </Button>
            ) : null}
          </div>
        ) : (
          <>
            <div className="grid gap-3 md:hidden">
              {rows.map(({ input, result }) => (
                <article key={input.id ?? getPropertyLabel(input)} className="min-w-0 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-slate-950">{getPropertyLabel(input)}</div>
                      <div className="mt-1 text-xs text-slate-500">{getLocationLabel(input)}</div>
                    </div>
                    <Badge tone={result.monthlyCashFlowAfterDebt >= 0 ? 'good' : 'bad'}>{result.investmentScore}/100</Badge>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div><dt className="text-slate-500">Price</dt><dd className="font-semibold">{formatCurrency(input.purchase.propertyPrice, input.outputSettings.currency)}</dd></div>
                    <div><dt className="text-slate-500">ADR</dt><dd className="font-semibold">{formatCurrency(input.rental.adr, input.outputSettings.currency)}</dd></div>
                    <div><dt className="text-slate-500">Occupancy</dt><dd className="font-semibold">{formatPercent(input.rental.occupancy)}</dd></div>
                    <div><dt className="text-slate-500">Cash flow</dt><dd className={result.monthlyCashFlowAfterDebt >= 0 ? 'font-semibold text-emerald-700' : 'font-semibold text-red-700'}>{formatCurrency(result.monthlyCashFlowAfterDebt, input.outputSettings.currency)}</dd></div>
                    <div><dt className="text-slate-500">ROI</dt><dd className="font-semibold">{formatPercent(result.cashOnCashRoi)}</dd></div>
                    <div><dt className="text-slate-500">Coverage</dt><dd className="font-semibold">{formatNumber(result.coverageRatio, 2)}x</dd></div>
                  </dl>
                  <Button aria-label={`Delete apartment ${getPropertyLabel(input)}`} className="mt-4 w-full" variant="destructive" onClick={() => setPendingDelete(input)} type="button">
                    <Trash2 className="mr-2 h-4 w-4" />Delete
                  </Button>
                </article>
              ))}
            </div>

            <div className="hidden max-w-full overflow-x-auto rounded-xl border border-slate-200 md:block">
              <table className="min-w-[1040px] w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    {['Apartment', 'Location', 'Price', 'ADR', 'Occupancy', 'Cash flow', 'ROI', 'Coverage', 'Score', 'Action'].map((heading) => <th key={heading} className="px-3 py-2">{heading}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ input, result }) => (
                    <tr key={input.id ?? getPropertyLabel(input)} className="border-t border-slate-100">
                      <td className="px-3 py-3 font-semibold">{getPropertyLabel(input)}</td>
                      <td className="px-3 py-3">{getLocationLabel(input)}</td>
                      <td className="px-3 py-3">{formatCurrency(input.purchase.propertyPrice, input.outputSettings.currency)}</td>
                      <td className="px-3 py-3">{formatCurrency(input.rental.adr, input.outputSettings.currency)}</td>
                      <td className="px-3 py-3">{formatPercent(input.rental.occupancy)}</td>
                      <td className={result.monthlyCashFlowAfterDebt >= 0 ? 'px-3 py-3 text-emerald-700' : 'px-3 py-3 text-red-700'}>{formatCurrency(result.monthlyCashFlowAfterDebt, input.outputSettings.currency)}</td>
                      <td className="px-3 py-3">{formatPercent(result.cashOnCashRoi)}</td>
                      <td className="px-3 py-3">{formatNumber(result.coverageRatio, 2)}x</td>
                      <td className="px-3 py-3 font-semibold">{result.investmentScore}</td>
                      <td className="px-3 py-3">
                        <Button aria-label={`Delete apartment ${getPropertyLabel(input)}`} variant="destructive" onClick={() => setPendingDelete(input)} type="button">
                          <Trash2 className="mr-2 h-4 w-4" />Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>

      <Dialog.Root open={pendingDelete !== null} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-card focus:outline-none">
            <Dialog.Title className="text-lg font-semibold text-slate-950">Delete apartment?</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-6 text-slate-600">
              This will remove this apartment from your saved searches and related lists. This action cannot be undone.
            </Dialog.Description>
            {pendingDelete ? <p className="mt-3 truncate rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900">{getPropertyLabel(pendingDelete)}</p> : null}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:justify-end">
              <Dialog.Close asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </Dialog.Close>
              <Button variant="destructive" onClick={confirmDelete} type="button">Delete</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Card>
  );
}
