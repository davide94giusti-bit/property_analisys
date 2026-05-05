'use client';

import { useEffect, useState } from 'react';
import { Bug, Trash2 } from 'lucide-react';
import { clearClientDebugEntries, getClientDebugEntries, type ClientDebugEntry } from '@/lib/client-debug';
import { Button } from '@/components/ui/button';

export function ClientDebugPanel() {
  const [entries, setEntries] = useState<ClientDebugEntry[]>([]);
  const enabled = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

  useEffect(() => {
    if (!enabled) return;
    const refresh = () => setEntries(getClientDebugEntries());
    refresh();
    window.addEventListener('property-alpha-debug-log-updated', refresh);
    return () => window.removeEventListener('property-alpha-debug-log-updated', refresh);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <details className="fixed bottom-24 right-3 z-50 max-h-[70vh] w-[calc(100vw-1.5rem)] max-w-xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl lg:bottom-4">
      <summary className="flex cursor-pointer items-center gap-2 bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
        <Bug className="h-4 w-4" /> Debug panel ({entries.length})
      </summary>
      <div className="max-h-[55vh] overflow-auto p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">Client-side API/import/export errors are captured here when debug mode is enabled.</p>
          <Button variant="outline" className="h-9 px-3" onClick={clearClientDebugEntries}><Trash2 className="mr-1 h-3.5 w-3.5" />Clear</Button>
        </div>
        {entries.length ? entries.map((entry) => (
          <pre key={`${entry.timestamp}-${entry.scope}-${entry.message}`} className="mb-2 overflow-auto rounded-xl bg-slate-100 p-3 text-[11px] leading-5 text-slate-800">
            {JSON.stringify(entry, null, 2)}
          </pre>
        )) : <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">No client debug events captured yet.</div>}
      </div>
    </details>
  );
}
