import type { AnalysisInput, ScoreWeights } from './types';

export const DEFAULT_SCORE_WEIGHTS: ScoreWeights = {
  roi: 0.30,
  netMonthly: 0.25,
  coverage: 0.20,
  payback: 0.15,
  risk: 0.10
};

export const DEFAULT_ANALYSIS_INPUT: AnalysisInput = {
  property: {
    name: 'Demo Lisbon Apartment',
    country: 'Portugal',
    region: 'Lisbon',
    city: 'Lisbon',
    neighborhood: 'Alfama',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    sizeM2: 72,
    latitude: 38.7139,
    longitude: -9.1294
  },
  scenarioLabel: 'Base Case',
  scenarioType: 'base',
  purchase: {
    propertyPrice: 150000,
    purchasePricePerM2: 2083,
    purchaseFeesAmount: 0,
    purchaseFeesPercent: 0.04,
    notaryLegalCosts: 1500,
    agencyCosts: 0,
    renovationCost: 12000,
    furnishingCost: 8500,
    otherUpfrontCosts: 1000
  },
  financing: {
    downPaymentPercent: 0.20,
    annualInterestRate: 0.03,
    loanYears: 30,
    fixedRate: true,
    interestOnlyPeriodMonths: 0,
    extraMonthlyDebtCosts: 0,
    balloonPayment: 0
  },
  rental: {
    adr: 120,
    occupancy: 0.70,
    averageStay: 3,
    rentableDays: 365,
    guestCleaningFee: 45,
    cleaningCost: 25,
    minimumStay: 1
  },
  operatingCosts: {
    amenitiesMonthly: 120,
    utilitiesMonthly: 180,
    internetMonthly: 35,
    insuranceAnnual: 450,
    propertyTaxAnnual: 550,
    taxesAnnual: 1000,
    maintenanceReservePercent: 0.04,
    maintenanceReserveFixedAnnual: 0,
    managementFeePercent: 0,
    platformFeePercent: 0.03,
    vatLocalTaxPercent: 0.21,
    touristTaxAnnual: 0,
    hoaMonthly: 0,
    otherMonthlyCosts: 0,
    otherAnnualCosts: 0
  },
  marketBenchmark: {
    adrBenchmark: 110,
    occupancyBenchmark: 0.66,
    propertyPricePerM2Benchmark: 2600,
    regulationRisk: 55,
    seasonalityRisk: 45,
    dataConfidence: 70
  },
  outputSettings: {
    currency: 'EUR',
    targetRoi: 0.10,
    targetMonthlyCashFlow: 500,
    targetCoverageRatio: 1.25,
    maximumPaybackYears: 10
  }
};

export const SPREADSHEET_BASELINE_COLUMNS = [
  'Property Price (€)',
  'Down payment (%)',
  'Down payment (€)',
  'Loan %',
  'Loan length',
  'Loan Payment (€/mo)',
  'Guest cleaning fee (€ x check-in)',
  'Cleaning cost (€ x check-in)',
  'Avg. Stay',
  'Amenities (€ x month)',
  'Taxes (€ x year)',
  'ADR (€/night)',
  'Occupancy',
  'Gross Revenue (€/yr)',
  'Net Revenue (€/yr)',
  'Net Monthly (€/mo)',
  'Coverage (Net/Loan)',
  'Rank',
  'ROI time (Y)'
] as const;
