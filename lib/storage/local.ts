import type { AnalysisInput, Scenario } from '@/lib/types';

const ANALYSES_KEY = 'property-platform:analyses';
const SCENARIOS_KEY = 'property-platform:scenarios';

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function loadGuestAnalyses(): AnalysisInput[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(window.localStorage.getItem(ANALYSES_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveGuestAnalysis(input: AnalysisInput): AnalysisInput[] {
  const analyses = loadGuestAnalyses();
  const id = input.id ?? crypto.randomUUID();
  const next = analyses.filter((item) => item.id !== id).concat({ ...input, id });
  window.localStorage.setItem(ANALYSES_KEY, JSON.stringify(next));
  return next;
}

export function deleteGuestAnalysis(id: string): AnalysisInput[] {
  const next = loadGuestAnalyses().filter((item) => item.id !== id);
  window.localStorage.setItem(ANALYSES_KEY, JSON.stringify(next));
  return next;
}

export function loadGuestScenarios(): Scenario[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(window.localStorage.getItem(SCENARIOS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveGuestScenarios(scenarios: Scenario[]): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
}
