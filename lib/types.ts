export type CurrencyCode = 'EUR' | 'GBP' | 'CHF' | 'USD';

export type ScenarioType = 'base' | 'optimistic' | 'conservative' | 'custom';

export type RiskLabel = 'Low Risk' | 'Moderate Risk' | 'Elevated Risk' | 'High Risk' | 'Very High Risk';

export type DataStatus = 'Verified' | 'Estimated' | 'User Override' | 'Low Confidence' | 'Stale' | 'Unavailable' | 'Demo Data' | 'Live Fetch Failed';

export interface PropertyDetails {
  id?: string;
  name: string;
  address?: string;
  country?: string;
  region?: string;
  city?: string;
  neighborhood?: string;
  postalCode?: string;
  latitude?: number | null;
  longitude?: number | null;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  sizeM2?: number;
  outdoorSpaceM2?: number;
  notes?: string;
}

export interface PurchaseAssumptions {
  propertyPrice: number;
  purchasePricePerM2?: number;
  purchaseFeesAmount: number;
  purchaseFeesPercent: number;
  notaryLegalCosts: number;
  agencyCosts: number;
  renovationCost: number;
  furnishingCost: number;
  otherUpfrontCosts: number;
}

export interface FinancingAssumptions {
  downPaymentPercent: number;
  annualInterestRate: number;
  loanYears: number;
  fixedRate: boolean;
  interestOnlyPeriodMonths: number;
  extraMonthlyDebtCosts: number;
  balloonPayment: number;
}

export interface RentalAssumptions {
  adr: number;
  occupancy: number;
  averageStay: number;
  rentableDays: number;
  guestCleaningFee: number;
  cleaningCost: number;
  minimumStay: number;
  maximumRentalDays?: number | null;
  monthlySeasonality?: MonthlySeasonality[];
}

export interface OperatingCostAssumptions {
  amenitiesMonthly: number;
  utilitiesMonthly: number;
  internetMonthly: number;
  insuranceAnnual: number;
  propertyTaxAnnual: number;
  taxesAnnual: number;
  maintenanceReservePercent: number;
  maintenanceReserveFixedAnnual: number;
  managementFeePercent: number;
  platformFeePercent: number;
  vatLocalTaxPercent: number;
  touristTaxAnnual: number;
  hoaMonthly: number;
  otherMonthlyCosts: number;
  otherAnnualCosts: number;
}

export interface MarketBenchmark {
  adrBenchmark?: number;
  occupancyBenchmark?: number;
  propertyPricePerM2Benchmark?: number;
  regulationRisk?: number;
  seasonalityRisk?: number;
  dataConfidence?: number;
}

export interface OutputSettings {
  currency: CurrencyCode;
  targetRoi: number;
  targetMonthlyCashFlow: number;
  targetCoverageRatio: number;
  maximumPaybackYears: number;
}

export interface MonthlySeasonality {
  month: number;
  adrMultiplier: number;
  occupancy: number;
  rentableDays: number;
}

export interface AnalysisInput {
  id?: string;
  property: PropertyDetails;
  scenarioLabel: string;
  scenarioType: ScenarioType;
  purchase: PurchaseAssumptions;
  financing: FinancingAssumptions;
  rental: RentalAssumptions;
  operatingCosts: OperatingCostAssumptions;
  marketBenchmark?: MarketBenchmark;
  outputSettings: OutputSettings;
}

export interface FormulaTraceItem {
  label: string;
  value: number | null;
  unit?: string;
  source: 'user' | 'market' | 'calculation' | 'constant';
}

export interface FormulaTrace {
  name: string;
  formula: string;
  inputs: FormulaTraceItem[];
  result: number | null;
  unit?: string;
}

export interface AnalysisResult {
  downPayment: number;
  loanAmount: number;
  loanToValue: number | null;
  monthlyLoanPayment: number;
  annualDebtService: number;
  totalUpfrontCosts: number;
  totalCashInvested: number;
  grossRevenue: number;
  grossMonthlyRevenue: number;
  occupiedNights: number;
  checkIns: number;
  cleaningRevenue: number;
  cleaningCost: number;
  cleaningProfit: number;
  platformFees: number;
  taxAmount: number;
  maintenanceReserve: number;
  managementFees: number;
  fixedAnnualCosts: number;
  variableAnnualCosts: number;
  operatingExpenses: number;
  netRevenue: number;
  netMonthly: number;
  annualCashFlowAfterDebt: number;
  monthlyCashFlowAfterDebt: number;
  coverageRatio: number | null;
  paybackPeriodYears: number | null;
  paybackPeriodMonths: number | null;
  cashOnCashRoi: number | null;
  breakEvenOccupancy: number | null;
  breakEvenAdr: number | null;
  expenseRatio: number | null;
  netMargin: number | null;
  grossYield: number | null;
  netYield: number | null;
  leveredRoi: number | null;
  unleveredRoi: number | null;
  capRate: number | null;
  irr: number | null;
  equityMultiple: number | null;
  riskScore: number;
  riskLabel: RiskLabel;
  investmentScore: number;
  warnings: string[];
  traces: Record<string, FormulaTrace>;
}

export interface Scenario extends AnalysisInput {
  scenarioName: string;
  results: AnalysisResult;
  rank?: number;
}

export interface ScenarioRange {
  values: number[];
}

export interface ScenarioMatrixInput {
  base: AnalysisInput;
  propertyPrices: number[];
  adrs: number[];
  occupancies: number[];
  downPaymentPercents: number[];
  interestRates: number[];
  loanYears: number[];
  averageStays: number[];
  cleaningFees: number[];
  cleaningCosts: number[];
  maxScenarios?: number;
}

export interface ScoreWeights {
  roi: number;
  netMonthly: number;
  coverage: number;
  payback: number;
  risk: number;
}
