import { Prisma, PrismaClient } from '@prisma/client';
import { demoProperties } from '../lib/demo-data';
import { calculateAnalysis } from '../lib/calculations/engine';

const prisma = new PrismaClient();

const toJsonInput = <T>(value: T): Prisma.InputJsonValue =>
  JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@property-analysis.local' },
    update: {},
    create: { email: 'demo@property-analysis.local', name: 'Demo Investor' }
  });

  for (const input of demoProperties) {
    const property = await prisma.property.create({
      data: {
        userId: user.id,
        name: input.property.name,
        country: input.property.country,
        region: input.property.region,
        city: input.property.city,
        neighborhood: input.property.neighborhood,
        latitude: input.property.latitude ?? undefined,
        longitude: input.property.longitude ?? undefined,
        propertyType: input.property.propertyType,
        bedrooms: input.property.bedrooms,
        bathrooms: input.property.bathrooms,
        sizeM2: input.property.sizeM2,
        propertyPrice: input.purchase.propertyPrice
      }
    });
    const analysis = await prisma.analysisInput.create({
      data: {
        propertyId: property.id,
        scenarioLabel: input.scenarioLabel,
        scenarioType: input.scenarioType,
        purchaseAssumptions: toJsonInput(input.purchase),
        financingAssumptions: toJsonInput(input.financing),
        rentalAssumptions: toJsonInput(input.rental),
        operatingCostAssumptions: toJsonInput(input.operatingCosts),
        taxAssumptions: toJsonInput({ vatLocalTaxPercent: input.operatingCosts.vatLocalTaxPercent }),
        outputSettings: toJsonInput(input.outputSettings)
      }
    });
    const result = calculateAnalysis(input);
    await prisma.analysisResult.create({
      data: {
        analysisInputId: analysis.id,
        grossRevenue: result.grossRevenue,
        netRevenue: result.netRevenue,
        netMonthly: result.netMonthly,
        annualDebtService: result.annualDebtService,
        monthlyLoanPayment: result.monthlyLoanPayment,
        annualCashFlowAfterDebt: result.annualCashFlowAfterDebt,
        monthlyCashFlowAfterDebt: result.monthlyCashFlowAfterDebt,
        coverageRatio: result.coverageRatio,
        cashOnCashRoi: result.cashOnCashRoi,
        paybackPeriod: result.paybackPeriodYears,
        breakEvenOccupancy: result.breakEvenOccupancy,
        breakEvenAdr: result.breakEvenAdr,
        grossYield: result.grossYield,
        netYield: result.netYield,
        capRate: result.capRate,
        irr: result.irr,
        equityMultiple: result.equityMultiple,
        riskScore: result.riskScore,
        investmentScore: result.investmentScore
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
