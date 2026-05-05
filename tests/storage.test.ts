import { beforeEach, describe, expect, test, vi } from 'vitest';
import { DEFAULT_ANALYSIS_INPUT } from '@/lib/constants';
import { ANALYSES_KEY, deleteGuestAnalysis, loadGuestAnalyses, saveGuestAnalysis } from '@/lib/storage/local';
import type { AnalysisInput } from '@/lib/types';

function makeAnalysis(id: string, name: string): AnalysisInput {
  return {
    ...DEFAULT_ANALYSIS_INPUT,
    id,
    property: {
      ...DEFAULT_ANALYSIS_INPUT.property,
      name
    }
  };
}

describe('guest analysis local storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  test('deletes only the selected saved apartment', () => {
    const lisbon = makeAnalysis('saved-lisbon', 'Saved Lisbon Apartment');
    const athens = makeAnalysis('saved-athens', 'Saved Athens Studio');

    saveGuestAnalysis(lisbon);
    saveGuestAnalysis(athens);

    const remaining = deleteGuestAnalysis('saved-lisbon');

    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.property.name).toBe('Saved Athens Studio');
    expect(loadGuestAnalyses().map((item) => item.id)).toEqual(['saved-athens']);
  });

  test('returns an empty saved-apartment list after deleting the last entry', () => {
    saveGuestAnalysis(makeAnalysis('saved-only', 'Only Saved Apartment'));

    expect(deleteGuestAnalysis('saved-only')).toEqual([]);
    expect(window.localStorage.getItem(ANALYSES_KEY)).toBe('[]');
  });

  test('treats corrupted saved-apartment storage as empty', () => {
    window.localStorage.setItem(ANALYSES_KEY, '{not valid json');

    expect(loadGuestAnalyses()).toEqual([]);
  });
});
