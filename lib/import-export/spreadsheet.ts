import * as XLSX from 'xlsx';
import { DEFAULT_ANALYSIS_INPUT, SPREADSHEET_BASELINE_COLUMNS } from '@/lib/constants';
import type { AnalysisInput, Scenario } from '@/lib/types';
import { createLogger } from '@/lib/logger';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { calculateScenarioRank } from '@/lib/scenarios/ranking';

const headerAliases: Record<string, string> = {
  'Property Price (€)': 'propertyPrice',
  'Down payment (%)': 'downPaymentPercent',
  'Loan %': 'annualInterestRate',
  'Loan length': 'loanYears',
  'Guest cleaning fee (€ x check-in)': 'guestCleaningFee',
  'Cleaning cost (€ x check-in)': 'cleaningCost',
  'Avg. Stay': 'averageStay',
  'Amenities (€ x month)': 'amenitiesMonthly',
  'Taxes (€ x year)': 'taxesAnnual',
  'ADR (€/night)': 'adr',
  Occupancy: 'occupancy'
};

function numberValue(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(String(value ?? '').replace('%', ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function parseSpreadsheetBuffer(buffer: ArrayBuffer): Scenario[] {
  const logger = createLogger('import-export:spreadsheet');
  logger.debug('Parsing spreadsheet buffer', { byteLength: buffer.byteLength });
  const workbook = XLSX.read(buffer, { type: 'array' });
  const worksheet = workbook.Sheets['Scenarios'] ?? workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { range: 1, defval: null });
  const scenarios: Scenario[] = rows
    .filter((row) => row['Property Price (€)'] !== null && row['ADR (€/night)'] !== null && row.Occupancy !== null)
    .map((row, index) => {
      const analysis: AnalysisInput = {
        ...DEFAULT_ANALYSIS_INPUT,
        id: crypto.randomUUID?.() ?? `import-${index}`,
        scenarioLabel: `Imported scenario ${index + 1}`,
        scenarioType: 'custom',
        property: { ...DEFAULT_ANALYSIS_INPUT.property, name: `Imported scenario ${index + 1}` },
        purchase: {
          ...DEFAULT_ANALYSIS_INPUT.purchase,
          propertyPrice: numberValue(row['Property Price (€)'], DEFAULT_ANALYSIS_INPUT.purchase.propertyPrice)
        },
        financing: {
          ...DEFAULT_ANALYSIS_INPUT.financing,
          downPaymentPercent: numberValue(row['Down payment (%)'], DEFAULT_ANALYSIS_INPUT.financing.downPaymentPercent),
          annualInterestRate: numberValue(row['Loan %'], DEFAULT_ANALYSIS_INPUT.financing.annualInterestRate),
          loanYears: numberValue(row['Loan length'], DEFAULT_ANALYSIS_INPUT.financing.loanYears)
        },
        rental: {
          ...DEFAULT_ANALYSIS_INPUT.rental,
          adr: numberValue(row['ADR (€/night)'], DEFAULT_ANALYSIS_INPUT.rental.adr),
          occupancy: numberValue(row.Occupancy, DEFAULT_ANALYSIS_INPUT.rental.occupancy),
          averageStay: numberValue(row['Avg. Stay'], DEFAULT_ANALYSIS_INPUT.rental.averageStay),
          guestCleaningFee: numberValue(row['Guest cleaning fee (€ x check-in)'], DEFAULT_ANALYSIS_INPUT.rental.guestCleaningFee),
          cleaningCost: numberValue(row['Cleaning cost (€ x check-in)'], DEFAULT_ANALYSIS_INPUT.rental.cleaningCost)
        },
        operatingCosts: {
          ...DEFAULT_ANALYSIS_INPUT.operatingCosts,
          amenitiesMonthly: numberValue(row['Amenities (€ x month)'], DEFAULT_ANALYSIS_INPUT.operatingCosts.amenitiesMonthly),
          taxesAnnual: numberValue(row['Taxes (€ x year)'], DEFAULT_ANALYSIS_INPUT.operatingCosts.taxesAnnual)
        }
      };
      return { ...analysis, scenarioName: analysis.scenarioLabel, results: calculateAnalysis(analysis) };
    });
  logger.info('Parsed spreadsheet scenarios', { scenarioCount: scenarios.length });
  return calculateScenarioRank(scenarios);
}

export function scenariosToWorkbook(scenarios: Scenario[]): ArrayBuffer {
  if (typeof window === 'undefined') createLogger('import-export:spreadsheet').debug('Creating scenarios workbook', { scenarioCount: scenarios.length });
  const rows = scenarios.map((s) => ({
    Rank: s.rank,
    'Property name': s.property.name,
    City: s.property.city,
    Country: s.property.country,
    'Property Price (€)': s.purchase.propertyPrice,
    'Down payment (%)': s.financing.downPaymentPercent,
    'Down payment (€)': s.results.downPayment,
    'Loan %': s.financing.annualInterestRate,
    'Loan length': s.financing.loanYears,
    'Loan Payment (€/mo)': s.results.monthlyLoanPayment,
    'ADR (€/night)': s.rental.adr,
    Occupancy: s.rental.occupancy,
    'Gross Revenue (€/yr)': s.results.grossRevenue,
    'Net Revenue (€/yr)': s.results.netRevenue,
    'Net Monthly (€/mo)': s.results.netMonthly,
    'Cash Flow After Debt (€/mo)': s.results.monthlyCashFlowAfterDebt,
    'Coverage (Net/Loan)': s.results.coverageRatio,
    'Cash-on-Cash ROI': s.results.cashOnCashRoi,
    'Payback Period (Y)': s.results.paybackPeriodYears,
    'Risk Score': s.results.riskScore,
    'Investment Score': s.results.investmentScore
  }));
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Scenarios');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
}

export { headerAliases };
