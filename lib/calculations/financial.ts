import Decimal from 'decimal.js';
import type { RiskLabel } from '@/lib/types';

const D = (value: number | Decimal) => new Decimal(Number.isFinite(Number(value)) ? value : 0);
const n = (value: Decimal) => Number(value.toDecimalPlaces(10).toString());

export function safeDivide(numerator: number, denominator: number): number | null {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null;
  return n(D(numerator).div(denominator));
}

export function calculateDownPayment(propertyPrice: number, downPaymentPercent: number): number {
  return n(D(propertyPrice).mul(downPaymentPercent));
}

export function calculateLoanAmount(propertyPrice: number, downPayment: number): number {
  return Math.max(0, n(D(propertyPrice).minus(downPayment)));
}

export function calculateLoanToValue(loanAmount: number, propertyPrice: number): number | null {
  return safeDivide(loanAmount, propertyPrice);
}

export function calculateMonthlyLoanPayment(loanAmount: number, annualInterestRate: number, loanYears: number): number {
  if (loanAmount <= 0 || loanYears <= 0) return 0;
  const periods = loanYears * 12;
  const monthlyRate = annualInterestRate / 12;
  if (monthlyRate === 0) return n(D(loanAmount).div(periods));
  const r = new Decimal(monthlyRate);
  const factor = r.plus(1).pow(periods);
  return n(D(loanAmount).mul(r).mul(factor).div(factor.minus(1)));
}

export function calculateAnnualDebtService(monthlyLoanPayment: number, extraMonthlyDebtCosts = 0): number {
  return n(D(monthlyLoanPayment).plus(extraMonthlyDebtCosts).mul(12));
}

export function calculateGrossRevenue(adr: number, occupancy: number, rentableDays = 365): number {
  return n(D(adr).mul(rentableDays).mul(occupancy));
}

export function calculateGrossMonthlyRevenue(grossAnnualRevenue: number): number {
  return n(D(grossAnnualRevenue).div(12));
}

export function calculateOccupiedNights(occupancy: number, rentableDays = 365): number {
  return n(D(rentableDays).mul(occupancy));
}

export function calculateNumberOfCheckIns(occupiedNights: number, averageStay: number): number {
  if (occupiedNights <= 0 || averageStay <= 0) return 0;
  return Math.ceil(occupiedNights / averageStay);
}

export function calculateCleaningRevenue(guestCleaningFee: number, checkIns: number): number {
  return n(D(guestCleaningFee).mul(checkIns));
}

export function calculateCleaningCost(cleaningCost: number, checkIns: number): number {
  return n(D(cleaningCost).mul(checkIns));
}

export function calculateCleaningProfit(guestCleaningFee: number, cleaningCost: number, checkIns: number): number {
  return n(D(guestCleaningFee).minus(cleaningCost).mul(checkIns));
}

export function calculatePlatformFees(grossRevenue: number, platformFeePercent: number): number {
  return n(D(grossRevenue).mul(platformFeePercent));
}

export function calculateTaxAmount(grossRevenue: number, taxPercent: number): number {
  return n(D(grossRevenue).mul(taxPercent));
}

export function calculateMaintenanceReserve(grossRevenue: number, maintenancePercent: number, fixedAnnual = 0): number {
  return n(D(grossRevenue).mul(maintenancePercent).plus(fixedAnnual));
}

export function calculateManagementFees(grossRevenue: number, managementFeePercent: number): number {
  return n(D(grossRevenue).mul(managementFeePercent));
}

export function calculateFixedAnnualCosts(input: {
  amenitiesMonthly: number;
  utilitiesMonthly: number;
  internetMonthly: number;
  insuranceAnnual: number;
  propertyTaxAnnual: number;
  taxesAnnual: number;
  touristTaxAnnual: number;
  hoaMonthly: number;
  otherMonthlyCosts: number;
  otherAnnualCosts: number;
}): number {
  return n(
    D(input.amenitiesMonthly)
      .plus(input.utilitiesMonthly)
      .plus(input.internetMonthly)
      .plus(input.hoaMonthly)
      .plus(input.otherMonthlyCosts)
      .mul(12)
      .plus(input.insuranceAnnual)
      .plus(input.propertyTaxAnnual)
      .plus(input.taxesAnnual)
      .plus(input.touristTaxAnnual)
      .plus(input.otherAnnualCosts)
  );
}

export function calculateVariableAnnualCosts(input: {
  platformFees: number;
  taxAmount: number;
  maintenanceReserve: number;
  managementFees: number;
}): number {
  return n(D(input.platformFees).plus(input.taxAmount).plus(input.maintenanceReserve).plus(input.managementFees));
}

export function calculateOperatingExpenses(fixedAnnualCosts: number, variableAnnualCosts: number): number {
  return n(D(fixedAnnualCosts).plus(variableAnnualCosts));
}

export function calculateNetRevenue(input: {
  grossRevenue: number;
  cleaningProfit: number;
  fixedAnnualCosts: number;
  variableAnnualCosts: number;
}): number {
  return n(D(input.grossRevenue).plus(input.cleaningProfit).minus(input.fixedAnnualCosts).minus(input.variableAnnualCosts));
}

export function calculateNetMonthly(netRevenue: number): number {
  return n(D(netRevenue).div(12));
}

export function calculateNetCashFlowAfterDebt(netRevenue: number, annualDebtService: number): number {
  return n(D(netRevenue).minus(annualDebtService));
}

export function calculateMonthlyCashFlowAfterDebt(netAnnualCashFlowAfterDebt: number): number {
  return n(D(netAnnualCashFlowAfterDebt).div(12));
}

export function calculateCoverageRatio(netMonthly: number, monthlyLoanPayment: number): number | null {
  return safeDivide(netMonthly, monthlyLoanPayment);
}

export function calculatePaybackPeriod(totalCashInvested: number, annualNetCashFlow: number): number | null {
  if (annualNetCashFlow <= 0) return null;
  return safeDivide(totalCashInvested, annualNetCashFlow);
}

export function calculateCashOnCashROI(annualNetCashFlow: number, totalCashInvested: number): number | null {
  return safeDivide(annualNetCashFlow, totalCashInvested);
}

export function calculateBreakEvenOccupancy(input: {
  adr: number;
  rentableDays: number;
  annualRequiredRevenue: number;
  platformFeePercent: number;
  taxPercent: number;
  maintenancePercent: number;
  managementFeePercent: number;
}): number | null {
  const effectiveRate = 1 - input.platformFeePercent - input.taxPercent - input.maintenancePercent - input.managementFeePercent;
  const potentialNetRevenue = input.adr * input.rentableDays * effectiveRate;
  return safeDivide(input.annualRequiredRevenue, potentialNetRevenue);
}

export function calculateBreakEvenADR(input: {
  occupiedNights: number;
  annualRequiredRevenue: number;
  platformFeePercent: number;
  taxPercent: number;
  maintenancePercent: number;
  managementFeePercent: number;
}): number | null {
  const effectiveRate = 1 - input.platformFeePercent - input.taxPercent - input.maintenancePercent - input.managementFeePercent;
  if (effectiveRate <= 0) return null;
  return safeDivide(input.annualRequiredRevenue, input.occupiedNights * effectiveRate);
}

export function calculateGrossYield(grossRevenue: number, propertyPrice: number): number | null {
  return safeDivide(grossRevenue, propertyPrice);
}

export function calculateNetYield(netRevenue: number, propertyPrice: number): number | null {
  return safeDivide(netRevenue, propertyPrice);
}

export function calculateCapRate(netOperatingIncome: number, propertyPrice: number): number | null {
  return safeDivide(netOperatingIncome, propertyPrice);
}

export function calculateEquityMultiple(totalCashReturned: number, totalCashInvested: number): number | null {
  return safeDivide(totalCashReturned, totalCashInvested);
}

export function calculateIRR(cashFlows: number[], guess = 0.1): number | null {
  if (cashFlows.length < 2 || !cashFlows.some((v) => v < 0) || !cashFlows.some((v) => v > 0)) return null;
  let rate = guess;
  for (let i = 0; i < 80; i += 1) {
    let npv = 0;
    let derivative = 0;
    for (let t = 0; t < cashFlows.length; t += 1) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
      if (t > 0) derivative -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }
    if (Math.abs(npv) < 1e-7) return rate;
    if (derivative === 0) return null;
    const next = rate - npv / derivative;
    if (!Number.isFinite(next) || next <= -0.9999 || next > 1000) return null;
    if (Math.abs(next - rate) < 1e-9) return next;
    rate = next;
  }
  return null;
}

export function riskLabel(score: number): RiskLabel {
  if (score < 20) return 'Low Risk';
  if (score < 40) return 'Moderate Risk';
  if (score < 60) return 'Elevated Risk';
  if (score < 80) return 'High Risk';
  return 'Very High Risk';
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}
