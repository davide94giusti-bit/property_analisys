'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { clientDebugLog } from '@/lib/client-debug';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const debugId = error.digest ?? crypto.randomUUID();
  const showDetails = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

  useEffect(() => {
    clientDebugLog('error', 'global-error-boundary', 'Global React error boundary caught an error', {
      debugId,
      name: error.name,
      message: error.message,
      digest: error.digest,
      stack: showDetails ? error.stack : undefined
    });
  }, [debugId, error, showDetails]);

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-600" />Something went wrong</CardTitle></CardHeader>
      <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
        <p>The page hit an unexpected client-side error. Your inputs were not intentionally cleared.</p>
        <p className="break-all rounded-xl bg-slate-100 p-3 font-mono text-xs text-slate-700">Debug ID: {debugId}</p>
        {showDetails ? (
          <details className="rounded-xl border border-slate-200 p-3">
            <summary className="cursor-pointer font-semibold text-slate-900">Technical details</summary>
            <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap text-xs">{error.stack ?? error.message}</pre>
          </details>
        ) : null}
        <Button onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />Try again</Button>
      </CardContent>
    </Card>
  );
}
