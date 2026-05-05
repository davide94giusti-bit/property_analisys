import { describe, expect, it } from 'vitest';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { generateSpreadsheetBaselineScenarios } from '@/lib/scenarios/generator';
import { calculateScenarioRank } from '@/lib/scenarios/ranking';

describe('scenario generation and ranking', () => {
  it('generates spreadsheet-style scenario matrix', () => {
    const scenarios = generateSpreadsheetBaselineScenarios(DEFAULT_ANALYSIS_INPUT);
    expect(scenarios.length).toBe(210);
    expect(scenarios[0].rank).toBe(1);
    expect(scenarios[0].results.investmentScore).toBeGreaterThanOrEqual(scenarios.at(-1)!.results.investmentScore - 100);
  });

  it('ranking is deterministic', () => {
    const scenarios = generateSpreadsheetBaselineScenarios(DEFAULT_ANALYSIS_INPUT);
    const reranked = calculateScenarioRank([...scenarios].reverse());
    expect(reranked[0].scenarioName).toBe(scenarios[0].scenarioName);
  });
});
