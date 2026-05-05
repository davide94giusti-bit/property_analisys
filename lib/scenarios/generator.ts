import type { AnalysisInput, Scenario, ScenarioMatrixInput } from '@/lib/types';
import { calculateAnalysis } from '@/lib/calculations/engine';
import { calculateScenarioRank } from './ranking';

function replaceScenarioFields(base: AnalysisInput, overrides: Partial<{
  propertyPrice: number;
  adr: number;
  occupancy: number;
  downPaymentPercent: number;
  annualInterestRate: number;
  loanYears: number;
  averageStay: number;
  guestCleaningFee: number;
  cleaningCost: number;
}>): AnalysisInput {
  return {
    ...base,
    id: undefined,
    scenarioType: 'custom',
    purchase: { ...base.purchase, propertyPrice: overrides.propertyPrice ?? base.purchase.propertyPrice },
    financing: {
      ...base.financing,
      downPaymentPercent: overrides.downPaymentPercent ?? base.financing.downPaymentPercent,
      annualInterestRate: overrides.annualInterestRate ?? base.financing.annualInterestRate,
      loanYears: overrides.loanYears ?? base.financing.loanYears
    },
    rental: {
      ...base.rental,
      adr: overrides.adr ?? base.rental.adr,
      occupancy: overrides.occupancy ?? base.rental.occupancy,
      averageStay: overrides.averageStay ?? base.rental.averageStay,
      guestCleaningFee: overrides.guestCleaningFee ?? base.rental.guestCleaningFee,
      cleaningCost: overrides.cleaningCost ?? base.rental.cleaningCost
    }
  };
}

export function generateScenarioMatrix(input: ScenarioMatrixInput): Scenario[] {
  const scenarios: Scenario[] = [];
  const max = input.maxScenarios ?? 500;
  for (const propertyPrice of input.propertyPrices) {
    for (const adr of input.adrs) {
      for (const occupancy of input.occupancies) {
        for (const downPaymentPercent of input.downPaymentPercents) {
          for (const annualInterestRate of input.interestRates) {
            for (const loanYears of input.loanYears) {
              for (const averageStay of input.averageStays) {
                for (const guestCleaningFee of input.cleaningFees) {
                  for (const cleaningCost of input.cleaningCosts) {
                    const analysis = replaceScenarioFields(input.base, {
                      propertyPrice,
                      adr,
                      occupancy,
                      downPaymentPercent,
                      annualInterestRate,
                      loanYears,
                      averageStay,
                      guestCleaningFee,
                      cleaningCost
                    });
                    analysis.scenarioLabel = `€${propertyPrice.toLocaleString()} | ADR €${adr} | ${(occupancy * 100).toFixed(0)}% occ.`;
                    scenarios.push({
                      ...analysis,
                      scenarioName: analysis.scenarioLabel,
                      results: calculateAnalysis(analysis)
                    });
                    if (scenarios.length >= max) return calculateScenarioRank(scenarios);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return calculateScenarioRank(scenarios);
}

export function generateSpreadsheetBaselineScenarios(base: AnalysisInput): Scenario[] {
  return generateScenarioMatrix({
    base,
    propertyPrices: [120000, 150000, 200000, 250000, 300000],
    adrs: [70, 80, 90, 100, 120, 150, 180],
    occupancies: [0.50, 0.60, 0.70, 0.80, 0.90, 0.95],
    downPaymentPercents: [0.20],
    interestRates: [0.03],
    loanYears: [30],
    averageStays: [3],
    cleaningFees: [45],
    cleaningCosts: [25],
    maxScenarios: 300
  });
}
