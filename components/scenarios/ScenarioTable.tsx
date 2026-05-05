'use client';

import { useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { Scenario } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function riskTone(score: number) {
  return score < 40 ? 'good' : score < 70 ? 'warning' : 'bad';
}

export function ScenarioTable({ scenarios }: { scenarios: Scenario[] }) {
  const [filter, setFilter] = useState('');
  const columns = useMemo<ColumnDef<Scenario>[]>(() => [
    { header: 'Rank', accessorKey: 'rank', cell: ({ row }) => <span className="font-semibold">{row.original.rank}</span> },
    { header: 'Scenario', accessorKey: 'scenarioName' },
    { header: 'Price', cell: ({ row }) => formatCurrency(row.original.purchase.propertyPrice, row.original.outputSettings.currency) },
    { header: 'ADR', cell: ({ row }) => formatCurrency(row.original.rental.adr, row.original.outputSettings.currency) },
    { header: 'Occupancy', cell: ({ row }) => formatPercent(row.original.rental.occupancy) },
    { header: 'Net monthly', cell: ({ row }) => formatCurrency(row.original.results.netMonthly, row.original.outputSettings.currency) },
    { header: 'Cash flow', cell: ({ row }) => formatCurrency(row.original.results.monthlyCashFlowAfterDebt, row.original.outputSettings.currency) },
    { header: 'ROI', cell: ({ row }) => formatPercent(row.original.results.cashOnCashRoi) },
    { header: 'Coverage', cell: ({ row }) => `${formatNumber(row.original.results.coverageRatio, 2)}x` },
    { header: 'Payback', cell: ({ row }) => row.original.results.paybackPeriodYears === null ? 'N/A' : `${formatNumber(row.original.results.paybackPeriodYears, 1)}y` },
    { header: 'Risk', cell: ({ row }) => <Badge tone={riskTone(row.original.results.riskScore)}>{row.original.results.riskScore}</Badge> },
    { header: 'Score', cell: ({ row }) => <span className="font-semibold">{row.original.results.investmentScore}</span> }
  ], []);

  const table = useReactTable({
    data: scenarios,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const visibleRows = table.getRowModel().rows;

  return (
    <div className="min-w-0 space-y-4">
      <Input placeholder="Search scenarios..." value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full sm:max-w-sm" />

      <div className="space-y-3 md:hidden">
        {visibleRows.map((row) => {
          const s = row.original;
          return (
            <article key={row.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-950">#{s.rank} {s.scenarioName}</div>
                  <div className="mt-1 text-xs text-slate-500">{formatCurrency(s.purchase.propertyPrice, s.outputSettings.currency)} • ADR {formatCurrency(s.rental.adr, s.outputSettings.currency)}</div>
                </div>
                <Badge tone={s.results.monthlyCashFlowAfterDebt >= 0 ? 'good' : 'bad'}>{s.results.investmentScore}/100</Badge>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div><dt className="text-slate-500">Occupancy</dt><dd className="font-semibold">{formatPercent(s.rental.occupancy)}</dd></div>
                <div><dt className="text-slate-500">Cash flow</dt><dd className="font-semibold">{formatCurrency(s.results.monthlyCashFlowAfterDebt, s.outputSettings.currency)}</dd></div>
                <div><dt className="text-slate-500">ROI</dt><dd className="font-semibold">{formatPercent(s.results.cashOnCashRoi)}</dd></div>
                <div><dt className="text-slate-500">Coverage</dt><dd className="font-semibold">{formatNumber(s.results.coverageRatio, 2)}x</dd></div>
                <div><dt className="text-slate-500">Payback</dt><dd className="font-semibold">{s.results.paybackPeriodYears === null ? 'N/A' : `${formatNumber(s.results.paybackPeriodYears, 1)}y`}</dd></div>
                <div><dt className="text-slate-500">Risk</dt><dd><Badge tone={riskTone(s.results.riskScore)}>{s.results.riskScore}</Badge></dd></div>
              </dl>
            </article>
          );
        })}
      </div>

      <div className="hidden max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white md:block">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>{headerGroup.headers.map((header) => <th key={header.id} className="px-4 py-3">{flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>
            ))}
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 hover:bg-slate-50">
                {row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <Button variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}
