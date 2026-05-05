import { describe, expect, it } from 'vitest';
import {
  calculateAnnualDebtService,
  calculateBreakEvenADR,
  calculateBreakEvenOccupancy,
  calculateCashOnCashROI,
  calculateCleaningCost,
  calculateCleaningProfit,
  calculateCleaningRevenue,
  calculateCoverageRatio,
  calculateDownPayment,
  calculateGrossRevenue,
  calculateGrossYield,
  calculateLoanAmount,
  calculateMonthlyLoanPayment,
  calculateNetMonthly,
  calculateNetRevenue,
  calculateNetYield,
  calculateNumberOfCheckIns,
  calculateOccupiedNights,
  calculatePaybackPeriod,
  calculatePlatformFees,
  calculateTaxAmount
} from '@/lib/calculations/financial';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { calculateAnalysis } from '@/lib/calculations/engine';

function close(value: number | null, expected: number, precision = 2) {
  expect(value).not.toBeNull();
  expect(value!).toBeCloseTo(expected, precision);
}

describe('spreadsheet baseline formulas', () => {
  it('calculates down payment and loan amount', () => {
    expect(calculateDownPayment(120000, 0.20)).toBe(24000);
    expect(calculateLoanAmount(120000, 24000)).toBe(96000);
  });

  it('calculates mortgage payment equivalent to Excel PMT', () => {
    close(calculateMonthlyLoanPayment(96000, 0.03, 30), 404.73987238027246, 6);
  });

  it('calculates gross revenue, occupied nights and check-ins', () => {
    expect(calculateGrossRevenue(70, 0.5, 365)).toBe(12775);
    expect(calculateOccupiedNights(0.5, 365)).toBe(182.5);
    expect(calculateNumberOfCheckIns(182.5, 3)).toBe(61);
  });

  it('calculates cleaning economics', () => {
    expect(calculateCleaningRevenue(45, 61)).toBe(2745);
    expect(calculateCleaningCost(25, 61)).toBe(1525);
    expect(calculateCleaningProfit(45, 25, 61)).toBe(1220);
  });

  it('calculates fees and taxes', () => {
    expect(calculatePlatformFees(12775, 0.03)).toBe(383.25);
    expect(calculateTaxAmount(12775, 0.21)).toBe(2682.75);
  });

  it('matches baseline net revenue pattern without new costs', () => {
    const net = calculateNetRevenue({ grossRevenue: 12775, cleaningProfit: 1220, fixedAnnualCosts: 120 * 12 + 1000, variableAnnualCosts: 383.25 + 2682.75 });
    expect(net).toBe(8489);
    expect(calculateNetMonthly(net)).toBeCloseTo(707.4166667, 6);
  });

  it('calculates coverage, ROI and payback as separate KPIs', () => {
    close(calculateCoverageRatio(707.4166666667, 404.73987238027246), 1.74783043367, 6);
    close(calculateCashOnCashROI(8489, 24000), 0.353708, 5);
    close(calculatePaybackPeriod(24000, 8489), 2.827188, 5);
  });

  it('calculates yields and break-even KPIs', () => {
    close(calculateGrossYield(12775, 120000), 0.1064583, 5);
    close(calculateNetYield(8489, 120000), 0.0707417, 5);
    expect(calculateBreakEvenOccupancy({ adr: 70, rentableDays: 365, annualRequiredRevenue: 7287, platformFeePercent: 0.03, taxPercent: 0.21, maintenancePercent: 0, managementFeePercent: 0 })).toBeGreaterThan(0);
    expect(calculateBreakEvenADR({ occupiedNights: 182.5, annualRequiredRevenue: 7287, platformFeePercent: 0.03, taxPercent: 0.21, maintenancePercent: 0, managementFeePercent: 0 })).toBeGreaterThan(0);
  });
});

describe('improved analysis engine', () => {
  it('calculates complete analysis and returns warnings deterministically', () => {
    const result = calculateAnalysis(DEFAULT_ANALYSIS_INPUT);
    expect(result.downPayment).toBe(30000);
    expect(result.loanAmount).toBe(120000);
    expect(result.grossRevenue).toBeCloseTo(30660, 2);
    expect(result.coverageRatio).not.toBeNull();
    expect(result.riskScore).toBeGreaterThanOrEqual(0);
    expect(result.investmentScore).toBeGreaterThanOrEqual(0);
    expect(result.traces.cashOnCashRoi.formula).toContain('Annual net cash flow');
  });
});
