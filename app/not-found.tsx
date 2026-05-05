import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFoundPage() {
  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader><CardTitle>Page not found</CardTitle></CardHeader>
      <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
        <p>The requested page does not exist in this analysis workspace.</p>
        <Button asChild><Link href="/"><Home className="mr-2 h-4 w-4" />Back to dashboard</Link></Button>
      </CardContent>
    </Card>
  );
}
