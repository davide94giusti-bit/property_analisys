import { z } from 'zod';

const percent = z.number().min(0).max(1);
const nonNegative = z.number().min(0);

export const propertyDetailsSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Property name is required'),
  address: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
  propertyType: z.string().optional(),
  bedrooms: nonNegative.optional(),
  bathrooms: nonNegative.optional(),
  sizeM2: nonNegative.optional(),
  outdoorSpaceM2: nonNegative.optional(),
  notes: z.string().optional()
});

export const purchaseAssumptionsSchema = z.object({
  propertyPrice: z.number().positive(),
  purchasePricePerM2: nonNegative.optional(),
  purchaseFeesAmount: nonNegative,
  purchaseFeesPercent: percent,
  notaryLegalCosts: nonNegative,
  agencyCosts: nonNegative,
  renovationCost: nonNegative,
  furnishingCost: nonNegative,
  otherUpfrontCosts: nonNegative
});

export const financingAssumptionsSchema = z.object({
  downPaymentPercent: percent,
  annualInterestRate: percent,
  loanYears: z.number().positive(),
  fixedRate: z.boolean(),
  interestOnlyPeriodMonths: nonNegative,
  extraMonthlyDebtCosts: nonNegative,
  balloonPayment: nonNegative
});

export const rentalAssumptionsSchema = z.object({
  adr: nonNegative,
  occupancy: percent,
  averageStay: z.number().positive(),
  rentableDays: z.number().min(1).max(365),
  guestCleaningFee: nonNegative,
  cleaningCost: nonNegative,
  minimumStay: z.number().positive(),
  maximumRentalDays: z.number().min(1).max(365).nullable().optional(),
  monthlySeasonality: z.array(z.object({
    month: z.number().min(1).max(12),
    adrMultiplier: z.number().positive(),
    occupancy: percent,
    rentableDays: z.number().min(1).max(31)
  })).optional()
});

export const operatingCostAssumptionsSchema = z.object({
  amenitiesMonthly: nonNegative,
  utilitiesMonthly: nonNegative,
  internetMonthly: nonNegative,
  insuranceAnnual: nonNegative,
  propertyTaxAnnual: nonNegative,
  taxesAnnual: nonNegative,
  maintenanceReservePercent: percent,
  maintenanceReserveFixedAnnual: nonNegative,
  managementFeePercent: percent,
  platformFeePercent: percent,
  vatLocalTaxPercent: percent,
  touristTaxAnnual: nonNegative,
  hoaMonthly: nonNegative,
  otherMonthlyCosts: nonNegative,
  otherAnnualCosts: nonNegative
});

export const outputSettingsSchema = z.object({
  currency: z.enum(['EUR', 'GBP', 'CHF', 'USD']),
  targetRoi: percent,
  targetMonthlyCashFlow: z.number(),
  targetCoverageRatio: z.number().positive(),
  maximumPaybackYears: z.number().positive()
});

export const analysisInputSchema = z.object({
  id: z.string().optional(),
  property: propertyDetailsSchema,
  scenarioLabel: z.string().min(1),
  scenarioType: z.enum(['base', 'optimistic', 'conservative', 'custom']),
  purchase: purchaseAssumptionsSchema,
  financing: financingAssumptionsSchema,
  rental: rentalAssumptionsSchema,
  operatingCosts: operatingCostAssumptionsSchema,
  marketBenchmark: z.object({
    adrBenchmark: nonNegative.optional(),
    occupancyBenchmark: percent.optional(),
    propertyPricePerM2Benchmark: nonNegative.optional(),
    regulationRisk: z.number().min(0).max(100).optional(),
    seasonalityRisk: z.number().min(0).max(100).optional(),
    dataConfidence: z.number().min(0).max(100).optional()
  }).optional(),
  outputSettings: outputSettingsSchema
});

export type AnalysisInputFormValues = z.infer<typeof analysisInputSchema>;
