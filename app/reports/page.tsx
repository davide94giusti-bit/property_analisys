import { ReportClient } from '@/components/reports/ReportClient';

export default function ReportsPage() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Reports</h1><p className="mt-1 text-sm leading-6 text-slate-500">Investor/lender-ready report generation.</p></div><ReportClient /></div>;
}
