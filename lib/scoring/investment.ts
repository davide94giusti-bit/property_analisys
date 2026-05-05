import { clamp } from '@/lib/calculations/financial';
import { DEFAULT_SCORE_WEIGHTS } from '@/lib/constants';
import type { AnalysisInput, AnalysisResult, ScoreWeights } from '@/lib/types';

function norm(value: number | null, min: number, max: number, inverse = false): number {
  if (value === null || !Number.isFinite(value)) return 0;
  const raw = clamp(((value - min) / (max - min)) * 100);
  return inverse ? 100 - raw : raw;
}

export function calculateInvestmentScore(
  input: AnalysisInput,
  result: Pick<AnalysisResult, 'cashOnCashRoi' | 'monthlyCashFlowAfterDebt' | 'coverageRatio' | 'paybackPeriodYears' | 'riskScore'>,
  weights: ScoreWeights = DEFAULT_SCORE_WEIGHTS
): number {
  const totalWeight = weights.roi + weights.netMonthly + weights.coverage + weights.payback + weights.risk;
  const normalizedWeights = {
    roi: weights.roi / totalWeight,
    netMonthly: weights.netMonthly / totalWeight,
    coverage: weights.coverage / totalWeight,
    payback: weights.payback / totalWeight,
    risk: weights.risk / totalWeight
  };
  const score =
    norm(result.cashOnCashRoi, 0, Math.max(input.outputSettings.targetRoi * 2, 0.20)) * normalizedWeights.roi +
    norm(result.monthlyCashFlowAfterDebt, -500, Math.max(input.outputSettings.targetMonthlyCashFlow * 2, 1500)) * normalizedWeights.netMonthly +
    norm(result.coverageRatio, 0.75, Math.max(input.outputSettings.targetCoverageRatio * 1.75, 2.2)) * normalizedWeights.coverage +
    norm(result.paybackPeriodYears, 3, Math.max(input.outputSettings.maximumPaybackYears * 1.5, 15), true) * normalizedWeights.payback +
    (100 - result.riskScore) * normalizedWeights.risk;

  const confidencePenalty = 1 - Math.max(0, 70 - (input.marketBenchmark?.dataConfidence ?? 70)) / 200;
  return Math.round(clamp(score * confidencePenalty));
}
