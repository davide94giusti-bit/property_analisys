import type { Scenario } from '@/lib/types';
import { createLogger } from '@/lib/logger';

export function scenariosToCsv(scenarios: Scenario[]): string {
  if (typeof window === 'undefined') createLogger('import-export:csv').debug('Creating scenario CSV', { scenarioCount: scenarios.length });
  const headers = [
    'Rank', 'Property Name', 'Location', 'Property Price', 'Down Payment %', 'Down Payment', 'Loan Amount',
    'Loan Payment', 'ADR', 'Occupancy', 'Gross Revenue', 'Net Revenue', 'Net Monthly', 'Cash Flow After Debt',
    'Coverage', 'Cash-on-Cash ROI', 'Payback Years', 'Risk Score', 'Investment Score'
  ];
  const rows = scenarios.map((s) => [
    s.rank ?? '',
    s.property.name,
    [s.property.city, s.property.country].filter(Boolean).join(', '),
    s.purchase.propertyPrice,
    s.financing.downPaymentPercent,
    s.results.downPayment,
    s.results.loanAmount,
    s.results.monthlyLoanPayment,
    s.rental.adr,
    s.rental.occupancy,
    s.results.grossRevenue,
    s.results.netRevenue,
    s.results.netMonthly,
    s.results.monthlyCashFlowAfterDebt,
    s.results.coverageRatio ?? '',
    s.results.cashOnCashRoi ?? '',
    s.results.paybackPeriodYears ?? '',
    s.results.riskScore,
    s.results.investmentScore
  ]);
  return [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
}
