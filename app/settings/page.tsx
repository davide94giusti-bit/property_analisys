import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1><p className="mt-1 text-sm leading-6 text-slate-500">Configure currencies, score weights, reporting defaults, and auth persistence.</p></div><Card><CardHeader><CardTitle>Production integration checklist</CardTitle></CardHeader><CardContent><ul className="list-disc space-y-2 pl-5 text-sm text-slate-600"><li>Connect Supabase/Auth.js and enable row-level security policies.</li><li>Configure trusted market assumptions in each analysis instead of relying on public data scraping.</li><li>Set server-side API keys in environment variables only.</li><li>Run Prisma migrations against PostgreSQL.</li><li>Replace demo assumptions only after source data and formulas are reviewed.</li></ul></CardContent></Card></div>;
}
