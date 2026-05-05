import { clamp, riskLabel } from '@/lib/calculations/financial';
import type { AnalysisInput, AnalysisResult } from '@/lib/types';

export function calculateRiskScore(input: AnalysisInput, partial: Pick<AnalysisResult,
  'coverageRatio' | 'annualCashFlowAfterDebt' | 'paybackPeriodYears' | 'expenseRatio' | 'monthlyLoanPayment' | 'netMonthly'
>): number {
  const benchmark = input.marketBenchmark;
  const coverage = partial.coverageRatio ?? 0;
  const adrBenchmark = benchmark?.adrBenchmark;
  const occupancyBenchmark = benchmark?.occupancyBenchmark;
  const priceBenchmark = benchmark?.propertyPricePerM2Benchmark;

  let score = 0;
  if (coverage < 1) score += 22;
  else if (coverage < input.outputSettings.targetCoverageRatio) score += 12;

  if (partial.annualCashFlowAfterDebt < 0) score += 18;
  if (partial.paybackPeriodYears === null || partial.paybackPeriodYears > input.outputSettings.maximumPaybackYears) score += 10;

  if (occupancyBenchmark !== undefined && input.rental.occupancy > occupancyBenchmark + 0.15) score += 10;
  if (input.rental.occupancy > 0.90) score += 8;
  if (adrBenchmark !== undefined && adrBenchmark > 0 && input.rental.adr > adrBenchmark * 1.30) score += 10;

  score += ((benchmark?.regulationRisk ?? 35) / 100) * 10;
  score += ((benchmark?.seasonalityRisk ?? 35) / 100) * 7;
  score += (1 - ((benchmark?.dataConfidence ?? 65) / 100)) * 8;

  if (priceBenchmark && input.purchase.purchasePricePerM2 && input.purchase.purchasePricePerM2 > priceBenchmark * 1.20) score += 6;
  if ((partial.expenseRatio ?? 0) > 0.55) score += 5;
  if (partial.monthlyLoanPayment > partial.netMonthly * 0.75) score += 6;

  return Math.round(clamp(score));
}

export { riskLabel };
