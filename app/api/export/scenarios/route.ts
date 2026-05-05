import { NextResponse } from 'next/server';
import type { Scenario } from '@/lib/types';
import { scenariosToCsv } from '@/lib/import-export/csv';
import { createRequestLogger, serializeError } from '@/lib/logger';

export async function POST(request: Request) {
  const logger = createRequestLogger('api:export:scenarios', request);
  const requestId = logger.requestId ?? crypto.randomUUID();
  const startedAt = performance.now();

  try {
    const body = await request.json() as { scenarios: Scenario[]; format?: 'csv' };
    const csv = scenariosToCsv(body.scenarios ?? []);
    logger.info('Scenario CSV export completed', {
      route: '/api/export/scenarios',
      requestId,
      durationMs: Math.round(performance.now() - startedAt),
      scenarioCount: body.scenarios?.length ?? 0
    });
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="property-scenarios.csv"',
        'x-request-id': requestId
      }
    });
  } catch (error) {
    const serialized = serializeError(error);
    logger.error('Scenario CSV export failed', { route: '/api/export/scenarios', requestId, error });
    return NextResponse.json({ ok: false, error: { code: serialized.code ?? 'SCENARIO_EXPORT_FAILED', message: 'Scenario export failed.', requestId } }, { status: 500, headers: { 'x-request-id': requestId } });
  }
}
