import type { AnalysisInput, AnalysisResult, FormulaTrace } from '@/lib/types';
import { createLogger } from '@/lib/logger';
import {
  calculateAnnualDebtService,
  calculateBreakEvenADR,
  calculateBreakEvenOccupancy,
  calculateCapRate,
  calculateCashOnCashROI,
  calculateCleaningCost,
  calculateCleaningProfit,
  calculateCleaningRevenue,
  calculateCoverageRatio,
  calculateDownPayment,
  calculateEquityMultiple,
  calculateFixedAnnualCosts,
  calculateGrossMonthlyRevenue,
  calculateGrossRevenue,
  calculateGrossYield,
  calculateIRR,
  calculateLoanAmount,
  calculateLoanToValue,
  calculateMaintenanceReserve,
  calculateManagementFees,
  calculateMonthlyCashFlowAfterDebt,
  calculateMonthlyLoanPayment,
  calculateNetCashFlowAfterDebt,
  calculateNetMonthly,
  calculateNetRevenue,
  calculateNetYield,
  calculateNumberOfCheckIns,
  calculateOccupiedNights,
  calculateOperatingExpenses,
  calculatePaybackPeriod,
  calculatePlatformFees,
  calculateTaxAmount,
  calculateVariableAnnualCosts,
  riskLabel,
  safeDivide
} from './financial';
import { calculateRiskScore } from '@/lib/scoring/risk';
import { calculateInvestmentScore } from '@/lib/scoring/investment';

function trace(name: string, formula: string, inputs: FormulaTrace['inputs'], result: number | null, unit?: string): FormulaTrace {
  return { name, formula, inputs, result, unit };
}

function calculateSeasonalGrossRevenue(input: AnalysisInput): number | null {
  const seasonality = input.rental.monthlySeasonality;
  if (!seasonality || seasonality.length === 0) return null;
  const total = seasonality.reduce((sum, month) => {
    return sum + input.rental.adr * month.adrMultiplier * month.rentableDays * month.occupancy;
  }, 0);
  return Number(total.toFixed(10));
}

export function calculateTotalUpfrontCosts(input: AnalysisInput): number {
  const purchaseFees = input.purchase.purchaseFeesAmount > 0
    ? input.purchase.purchaseFeesAmount
    : input.purchase.propertyPrice * input.purchase.purchaseFeesPercent;
  return purchaseFees + input.purchase.notaryLegalCosts + input.purchase.agencyCosts + input.purchase.renovationCost + input.purchase.furnishingCost + input.purchase.otherUpfrontCosts;
}

export function calculateAnalysis(input: AnalysisInput): AnalysisResult {
  if (typeof window === 'undefined' && process.env.LOG_LEVEL === 'trace') {
    createLogger('calculations:engine').trace('Calculating analysis', {
      scenarioLabel: input.scenarioLabel,
      propertyName: input.property.name,
      propertyPrice: input.purchase.propertyPrice,
      adr: input.rental.adr,
      occupancy: input.rental.occupancy
    });
  }
  const downPayment = calculateDownPayment(input.purchase.propertyPrice, input.financing.downPaymentPercent);
  const loanAmount = calculateLoanAmount(input.purchase.propertyPrice, downPayment);
  const loanToValue = calculateLoanToValue(loanAmount, input.purchase.propertyPrice);
  const monthlyLoanPayment = calculateMonthlyLoanPayment(loanAmount, input.financing.annualInterestRate, input.financing.loanYears);
  const annualDebtService = calculateAnnualDebtService(monthlyLoanPayment, input.financing.extraMonthlyDebtCosts);
  const totalUpfrontCosts = calculateTotalUpfrontCosts(input);
  const totalCashInvested = downPayment + totalUpfrontCosts;

  const seasonalGrossRevenue = calculateSeasonalGrossRevenue(input);
  const grossRevenue = seasonalGrossRevenue ?? calculateGrossRevenue(input.rental.adr, input.rental.occupancy, input.rental.rentableDays);
  const grossMonthlyRevenue = calculateGrossMonthlyRevenue(grossRevenue);
  const occupiedNights = seasonalGrossRevenue
    ? input.rental.monthlySeasonality!.reduce((sum, m) => sum + m.rentableDays * m.occupancy, 0)
    : calculateOccupiedNights(input.rental.occupancy, input.rental.rentableDays);
  const checkIns = calculateNumberOfCheckIns(occupiedNights, input.rental.averageStay);
  const cleaningRevenue = calculateCleaningRevenue(input.rental.guestCleaningFee, checkIns);
  const cleaningCost = calculateCleaningCost(input.rental.cleaningCost, checkIns);
  const cleaningProfit = calculateCleaningProfit(input.rental.guestCleaningFee, input.rental.cleaningCost, checkIns);

  const platformFees = calculatePlatformFees(grossRevenue, input.operatingCosts.platformFeePercent);
  const taxAmount = calculateTaxAmount(grossRevenue, input.operatingCosts.vatLocalTaxPercent);
  const maintenanceReserve = calculateMaintenanceReserve(grossRevenue, input.operatingCosts.maintenanceReservePercent, input.operatingCosts.maintenanceReserveFixedAnnual);
  const managementFees = calculateManagementFees(grossRevenue, input.operatingCosts.managementFeePercent);
  const fixedAnnualCosts = calculateFixedAnnualCosts(input.operatingCosts);
  const variableAnnualCosts = calculateVariableAnnualCosts({ platformFees, taxAmount, maintenanceReserve, managementFees });
  const operatingExpenses = calculateOperatingExpenses(fixedAnnualCosts, variableAnnualCosts);
  const netRevenue = calculateNetRevenue({ grossRevenue, cleaningProfit, fixedAnnualCosts, variableAnnualCosts });
  const netMonthly = calculateNetMonthly(netRevenue);
  const annualCashFlowAfterDebt = calculateNetCashFlowAfterDebt(netRevenue, annualDebtService);
  const monthlyCashFlowAfterDebt = calculateMonthlyCashFlowAfterDebt(annualCashFlowAfterDebt);
  const coverageRatio = calculateCoverageRatio(netMonthly, monthlyLoanPayment + input.financing.extraMonthlyDebtCosts);
  const paybackPeriodYears = calculatePaybackPeriod(totalCashInvested, annualCashFlowAfterDebt);
  const paybackPeriodMonths = paybackPeriodYears === null ? null : paybackPeriodYears * 12;
  const cashOnCashRoi = calculateCashOnCashROI(annualCashFlowAfterDebt, totalCashInvested);
  const annualRequiredRevenue = fixedAnnualCosts + annualDebtService;
  const breakEvenOccupancy = calculateBreakEvenOccupancy({
    adr: input.rental.adr,
    rentableDays: input.rental.rentableDays,
    annualRequiredRevenue,
    platformFeePercent: input.operatingCosts.platformFeePercent,
    taxPercent: input.operatingCosts.vatLocalTaxPercent,
    maintenancePercent: input.operatingCosts.maintenanceReservePercent,
    managementFeePercent: input.operatingCosts.managementFeePercent
  });
  const breakEvenAdr = calculateBreakEvenADR({
    occupiedNights,
    annualRequiredRevenue,
    platformFeePercent: input.operatingCosts.platformFeePercent,
    taxPercent: input.operatingCosts.vatLocalTaxPercent,
    maintenancePercent: input.operatingCosts.maintenanceReservePercent,
    managementFeePercent: input.operatingCosts.managementFeePercent
  });
  const expenseRatio = safeDivide(operatingExpenses, grossRevenue + cleaningRevenue);
  const netMargin = safeDivide(netRevenue, grossRevenue + cleaningRevenue);
  const grossYield = calculateGrossYield(grossRevenue, input.purchase.propertyPrice);
  const netYield = calculateNetYield(netRevenue, input.purchase.propertyPrice);
  const leveredRoi = cashOnCashRoi;
  const unleveredRoi = safeDivide(netRevenue, input.purchase.propertyPrice + totalUpfrontCosts);
  const capRate = calculateCapRate(netRevenue, input.purchase.propertyPrice);
  const holdingPeriodYears = 5;
  const rentGrowth = 0.02;
  const appreciation = 0.02;
  const salePrice = input.purchase.propertyPrice * Math.pow(1 + appreciation, holdingPeriodYears);
  const saleCosts = salePrice * 0.04;
  const cashFlows = [-totalCashInvested];
  for (let year = 1; year <= holdingPeriodYears; year += 1) {
    const grownCashFlow = annualCashFlowAfterDebt * Math.pow(1 + rentGrowth, year - 1);
    cashFlows.push(year === holdingPeriodYears ? grownCashFlow + salePrice - saleCosts - loanAmount : grownCashFlow);
  }
  const irr = calculateIRR(cashFlows);
  const equityMultiple = calculateEquityMultiple(cashFlows.slice(1).reduce((sum, v) => sum + v, 0), totalCashInvested);

  const riskScore = calculateRiskScore(input, { coverageRatio, annualCashFlowAfterDebt, paybackPeriodYears, expenseRatio, monthlyLoanPayment, netMonthly });
  const investmentScore = calculateInvestmentScore(input, { cashOnCashRoi, monthlyCashFlowAfterDebt, coverageRatio, paybackPeriodYears, riskScore });
  const warnings = generateWarnings(input, { coverageRatio, monthlyCashFlowAfterDebt, cashOnCashRoi, paybackPeriodYears, riskScore, breakEvenOccupancy });

  const traces: Record<string, FormulaTrace> = {
    grossRevenue: trace('Gross Revenue', 'ADR x rentable days x occupancy', [
      { label: 'ADR', value: input.rental.adr, unit: input.outputSettings.currency, source: 'user' },
      { label: 'Rentable days', value: input.rental.rentableDays, unit: 'days', source: 'user' },
      { label: 'Occupancy', value: input.rental.occupancy, unit: '%', source: 'user' }
    ], grossRevenue, input.outputSettings.currency),
    netRevenue: trace('Net Revenue', 'Gross revenue - platform fees - taxes + cleaning profit - fixed costs - variable costs', [
      { label: 'Gross revenue', value: grossRevenue, source: 'calculation' },
      { label: 'Platform fees', value: platformFees, source: 'calculation' },
      { label: 'Taxes/VAT', value: taxAmount, source: 'calculation' },
      { label: 'Cleaning profit', value: cleaningProfit, source: 'calculation' },
      { label: 'Fixed costs', value: fixedAnnualCosts, source: 'user' },
      { label: 'Variable costs', value: variableAnnualCosts, source: 'calculation' }
    ], netRevenue, input.outputSettings.currency),
    cashOnCashRoi: trace('Cash-on-Cash ROI', 'Annual net cash flow after debt / total cash invested', [
      { label: 'Annual net cash flow after debt', value: annualCashFlowAfterDebt, source: 'calculation' },
      { label: 'Total cash invested', value: totalCashInvested, source: 'calculation' }
    ], cashOnCashRoi, '%'),
    paybackPeriodYears: trace('Payback Period', 'Total cash invested / annual net cash flow after debt', [
      { label: 'Total cash invested', value: totalCashInvested, source: 'calculation' },
      { label: 'Annual net cash flow after debt', value: annualCashFlowAfterDebt, source: 'calculation' }
    ], paybackPeriodYears, 'years')
  };

  return {
    downPayment,
    loanAmount,
    loanToValue,
    monthlyLoanPayment,
    annualDebtService,
    totalUpfrontCosts,
    totalCashInvested,
    grossRevenue,
    grossMonthlyRevenue,
    occupiedNights,
    checkIns,
    cleaningRevenue,
    cleaningCost,
    cleaningProfit,
    platformFees,
    taxAmount,
    maintenanceReserve,
    managementFees,
    fixedAnnualCosts,
    variableAnnualCosts,
    operatingExpenses,
    netRevenue,
    netMonthly,
    annualCashFlowAfterDebt,
    monthlyCashFlowAfterDebt,
    coverageRatio,
    paybackPeriodYears,
    paybackPeriodMonths,
    cashOnCashRoi,
    breakEvenOccupancy,
    breakEvenAdr,
    expenseRatio,
    netMargin,
    grossYield,
    netYield,
    leveredRoi,
    unleveredRoi,
    capRate,
    irr,
    equityMultiple,
    riskScore,
    riskLabel: riskLabel(riskScore),
    investmentScore,
    warnings,
    traces
  };
}

function generateWarnings(input: AnalysisInput, result: {
  coverageRatio: number | null;
  monthlyCashFlowAfterDebt: number;
  cashOnCashRoi: number | null;
  paybackPeriodYears: number | null;
  riskScore: number;
  breakEvenOccupancy: number | null;
}): string[] {
  const warnings: string[] = [];
  if (result.coverageRatio !== null && result.coverageRatio < 1) warnings.push('Coverage is below 1.0; net monthly revenue does not cover the loan payment.');
  else if (result.coverageRatio !== null && result.coverageRatio < 1.25) warnings.push('Coverage is below 1.25; lender-style margin of safety is limited.');
  if (result.monthlyCashFlowAfterDebt < 0) warnings.push('Projected monthly cash flow after debt service is negative.');
  if (input.rental.occupancy > 0.90) warnings.push('Occupancy is above 90%; this is usually aggressive for short-term rental underwriting.');
  if (input.marketBenchmark?.occupancyBenchmark !== undefined && input.rental.occupancy > input.marketBenchmark.occupancyBenchmark + 0.15) warnings.push('Occupancy assumption is materially above the area benchmark.');
  if (input.marketBenchmark?.adrBenchmark && input.rental.adr > input.marketBenchmark.adrBenchmark * 1.30) warnings.push('ADR assumption is more than 30% above the area benchmark.');
  if ((input.marketBenchmark?.regulationRisk ?? 0) >= 70) warnings.push('Local regulation risk is high. Validate licensing and rental-day restrictions before investing.');
  if ((input.marketBenchmark?.dataConfidence ?? 100) < 50) warnings.push('Market data confidence is low; treat area-derived assumptions as provisional.');
  if (result.cashOnCashRoi !== null && result.cashOnCashRoi < input.outputSettings.targetRoi) warnings.push('Cash-on-cash ROI is below the user target.');
  if (result.paybackPeriodYears !== null && result.paybackPeriodYears > input.outputSettings.maximumPaybackYears) warnings.push('Payback period exceeds the maximum target.');
  if (result.breakEvenOccupancy !== null && result.breakEvenOccupancy > 0.85) warnings.push('Break-even occupancy is high; downside protection is limited.');
  return warnings;
}
