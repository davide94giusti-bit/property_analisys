import { describe, expect, it } from 'vitest';
import { generateSpreadsheetBaselineScenarios } from '@/lib/scenarios/generator';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { scenariosToCsv } from '@/lib/import-export/csv';
import { scenariosToWorkbook } from '@/lib/import-export/spreadsheet';

describe('exports', () => {
  it('exports scenarios to CSV', () => {
    const scenarios = generateSpreadsheetBaselineScenarios(DEFAULT_ANALYSIS_INPUT).slice(0, 3);
    const csv = scenariosToCsv(scenarios);
    expect(csv).toContain('Cash-on-Cash ROI');
    expect(csv.split('\n')).toHaveLength(4);
  });

  it('exports scenarios to XLSX array buffer', () => {
    const scenarios = generateSpreadsheetBaselineScenarios(DEFAULT_ANALYSIS_INPUT).slice(0, 3);
    const buffer = scenariosToWorkbook(scenarios);
    expect(buffer.byteLength).toBeGreaterThan(1000);
  });
});
