import { NextResponse } from 'next/server';
import { parseSpreadsheetBuffer } from '@/lib/import-export/spreadsheet';
import { createRequestLogger, serializeError } from '@/lib/logger';

export async function POST(request: Request) {
  const logger = createRequestLogger('api:import:excel', request);
  const requestId = logger.requestId ?? crypto.randomUUID();
  const startedAt = performance.now();

  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      logger.warn('Spreadsheet import rejected because file is missing', { route: '/api/import/excel', requestId });
      return NextResponse.json({ ok: false, error: { code: 'MISSING_FILE', message: 'Missing spreadsheet file.', requestId } }, { status: 400, headers: { 'x-request-id': requestId } });
    }
    const scenarios = parseSpreadsheetBuffer(await file.arrayBuffer());
    logger.info('Spreadsheet import completed', {
      route: '/api/import/excel',
      requestId,
      durationMs: Math.round(performance.now() - startedAt),
      fileName: file.name,
      fileSize: file.size,
      scenarioCount: scenarios.length
    });
    return NextResponse.json({ ok: true, data: { scenarios, count: scenarios.length }, requestId }, { headers: { 'x-request-id': requestId } });
  } catch (error) {
    const serialized = serializeError(error);
    logger.error('Spreadsheet import failed', { route: '/api/import/excel', requestId, error });
    return NextResponse.json({ ok: false, error: { code: serialized.code ?? 'SPREADSHEET_IMPORT_FAILED', message: 'Spreadsheet import failed.', requestId } }, { status: 500, headers: { 'x-request-id': requestId } });
  }
}
