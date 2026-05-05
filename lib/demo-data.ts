import { DEFAULT_ANALYSIS_INPUT } from './constants';
import type { AnalysisInput } from './types';

export const demoProperties: AnalysisInput[] = [
  DEFAULT_ANALYSIS_INPUT,
  {
    ...DEFAULT_ANALYSIS_INPUT,
    id: 'demo-valencia',
    property: {
      name: 'Demo Valencia Beach Flat',
      country: 'Spain',
      region: 'Valencian Community',
      city: 'Valencia',
      neighborhood: 'El Cabanyal',
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      sizeM2: 68,
      latitude: 39.4699,
      longitude: -0.3763
    },
    purchase: { ...DEFAULT_ANALYSIS_INPUT.purchase, propertyPrice: 200000, purchasePricePerM2: 2941, renovationCost: 8000, furnishingCost: 7000 },
    rental: { ...DEFAULT_ANALYSIS_INPUT.rental, adr: 105, occupancy: 0.64, averageStay: 3.4 },
    marketBenchmark: { adrBenchmark: 102, occupancyBenchmark: 0.64, propertyPricePerM2Benchmark: 3100, regulationRisk: 55, seasonalityRisk: 52, dataConfidence: 68 },
    scenarioLabel: 'Valencia Base Case'
  },
  {
    ...DEFAULT_ANALYSIS_INPUT,
    id: 'demo-athens',
    property: {
      name: 'Demo Athens Historic Studio',
      country: 'Greece',
      region: 'Attica',
      city: 'Athens',
      neighborhood: 'Koukaki',
      propertyType: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      sizeM2: 45,
      latitude: 37.9838,
      longitude: 23.7275
    },
    purchase: { ...DEFAULT_ANALYSIS_INPUT.purchase, propertyPrice: 120000, purchasePricePerM2: 2667, renovationCost: 10000, furnishingCost: 6000 },
    rental: { ...DEFAULT_ANALYSIS_INPUT.rental, adr: 91, occupancy: 0.61, averageStay: 3.0, guestCleaningFee: 38, cleaningCost: 22 },
    operatingCosts: { ...DEFAULT_ANALYSIS_INPUT.operatingCosts, vatLocalTaxPercent: 0.13 },
    marketBenchmark: { adrBenchmark: 91, occupancyBenchmark: 0.61, propertyPricePerM2Benchmark: 2500, regulationRisk: 42, seasonalityRisk: 58, dataConfidence: 64 },
    scenarioLabel: 'Athens Base Case'
  }
];
