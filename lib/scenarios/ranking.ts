import type { Scenario } from '@/lib/types';

export function calculateScenarioRank(scenarios: Scenario[]): Scenario[] {
  const scored = scenarios.map((scenario) => ({
    scenario,
    sortScore:
      (scenario.results.coverageRatio ?? -999) * 0.35 +
      scenario.results.monthlyCashFlowAfterDebt / 10000 * 0.25 +
      (scenario.results.cashOnCashRoi ?? -999) * 0.25 -
      (scenario.results.paybackPeriodYears ?? 999) / 100 * 0.15 +
      scenario.results.investmentScore / 100 * 0.30 -
      scenario.results.riskScore / 100 * 0.10
  }));

  scored.sort((a, b) => {
    if (b.sortScore !== a.sortScore) return b.sortScore - a.sortScore;
    if ((b.scenario.results.coverageRatio ?? 0) !== (a.scenario.results.coverageRatio ?? 0)) {
      return (b.scenario.results.coverageRatio ?? 0) - (a.scenario.results.coverageRatio ?? 0);
    }
    if (b.scenario.results.monthlyCashFlowAfterDebt !== a.scenario.results.monthlyCashFlowAfterDebt) {
      return b.scenario.results.monthlyCashFlowAfterDebt - a.scenario.results.monthlyCashFlowAfterDebt;
    }
    return a.scenario.scenarioName.localeCompare(b.scenario.scenarioName);
  });

  return scored.map(({ scenario }, index) => ({ ...scenario, rank: index + 1 }));
}

export function topScenariosByMetric(scenarios: Scenario[], metric: keyof Scenario['results'], limit = 3, ascending = false): Scenario[] {
  return [...scenarios].sort((a, b) => {
    const av = a.results[metric];
    const bv = b.results[metric];
    const an = typeof av === 'number' && Number.isFinite(av) ? av : ascending ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    const bn = typeof bv === 'number' && Number.isFinite(bv) ? bv : ascending ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    return ascending ? an - bn : bn - an;
  }).slice(0, limit);
}
