import type { AnalysisInput, Scenario } from '@/lib/types';

export const ANALYSES_KEY = 'property-platform:analyses';
const SCENARIOS_KEY = 'property-platform:scenarios';
export const GUEST_ANALYSES_CHANGED_EVENT = 'property-platform:analyses-changed';

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function notifyGuestAnalysesChanged(analyses: AnalysisInput[]): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<AnalysisInput[]>(GUEST_ANALYSES_CHANGED_EVENT, { detail: analyses }));
}

function persistGuestAnalyses(analyses: AnalysisInput[]): AnalysisInput[] {
  if (!canUseStorage()) return analyses;
  window.localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
  notifyGuestAnalysesChanged(analyses);
  return analyses;
}

export function loadGuestAnalyses(): AnalysisInput[] {
  if (!canUseStorage()) return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ANALYSES_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGuestAnalysis(input: AnalysisInput): AnalysisInput[] {
  const analyses = loadGuestAnalyses();
  const id = input.id ?? crypto.randomUUID();
  const next = analyses.filter((item) => item.id !== id).concat({ ...input, id });
  return persistGuestAnalyses(next);
}

export function deleteGuestAnalysis(id: string): AnalysisInput[] {
  const next = loadGuestAnalyses().filter((item) => item.id !== id);
  return persistGuestAnalyses(next);
}

export function loadGuestScenarios(): Scenario[] {
  if (!canUseStorage()) return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SCENARIOS_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGuestScenarios(scenarios: Scenario[]): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
}
