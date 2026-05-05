import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { AnalysisInput, AnalysisResult, Scenario } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';

export function createAnalysisPdf(input: AnalysisInput, result: AnalysisResult, scenarios: Scenario[] = []): Blob {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  doc.setFontSize(20);
  doc.text('Property Investment Analysis Report', 40, 50);
  doc.setFontSize(11);
  doc.text(`Property: ${input.property.name}`, 40, 76);
  doc.text(`Location: ${[input.property.city, input.property.country].filter(Boolean).join(', ') || 'N/A'}`, 40, 94);
  doc.text('Disclaimer: This report is analytical support only and is not financial, legal, or tax advice.', 40, 114, { maxWidth: 510 });

  autoTable(doc, {
    startY: 145,
    head: [['KPI', 'Value']],
    body: [
      ['Gross annual revenue', formatCurrency(result.grossRevenue, input.outputSettings.currency)],
      ['Net annual revenue before debt', formatCurrency(result.netRevenue, input.outputSettings.currency)],
      ['Net monthly revenue before debt', formatCurrency(result.netMonthly, input.outputSettings.currency)],
      ['Monthly cash flow after debt', formatCurrency(result.monthlyCashFlowAfterDebt, input.outputSettings.currency)],
      ['Coverage ratio', formatNumber(result.coverageRatio, 2) + 'x'],
      ['Cash-on-cash ROI', formatPercent(result.cashOnCashRoi)],
      ['Payback period', result.paybackPeriodYears === null ? 'N/A' : `${formatNumber(result.paybackPeriodYears, 1)} years`],
      ['Risk score', `${result.riskScore}/100 (${result.riskLabel})`],
      ['Investment score', `${result.investmentScore}/100`]
    ]
  });

  autoTable(doc, {
    startY: (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable!.finalY + 20,
    head: [['Warning']],
    body: result.warnings.length ? result.warnings.map((w) => [w]) : [['No critical warnings.']]
  });

  if (scenarios.length > 0) {
    autoTable(doc, {
      startY: (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable!.finalY + 20,
      head: [['Rank', 'Scenario', 'Net monthly', 'ROI', 'Coverage', 'Payback', 'Score']],
      body: scenarios.slice(0, 10).map((s) => [
        s.rank ?? '', s.scenarioName, formatCurrency(s.results.netMonthly, s.outputSettings.currency), formatPercent(s.results.cashOnCashRoi), formatNumber(s.results.coverageRatio, 2), s.results.paybackPeriodYears === null ? 'N/A' : formatNumber(s.results.paybackPeriodYears, 1), s.results.investmentScore
      ])
    });
  }

  doc.addPage();
  doc.setFontSize(16);
  doc.text('Formula Appendix', 40, 50);
  doc.setFontSize(10);
  const formulas = [
    'Gross Revenue = ADR x rentable days x occupancy',
    'Net Revenue = gross revenue - platform fees - taxes/VAT + cleaning profit - fixed costs - variable costs',
    'Coverage Ratio = net monthly revenue before debt / monthly loan payment',
    'Cash-on-Cash ROI = annual net cash flow after debt / total cash invested',
    'Payback Period = total cash invested / annual net cash flow after debt',
    'ROI time (Y) from the baseline spreadsheet is treated as payback period, not ROI percentage.'
  ];
  formulas.forEach((line, idx) => doc.text(line, 40, 80 + idx * 18));
  return doc.output('blob');
}
