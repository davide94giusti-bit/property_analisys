export type ClientDebugLevel = 'debug' | 'info' | 'warn' | 'error';

export interface ClientDebugEntry {
  timestamp: string;
  level: ClientDebugLevel;
  scope: string;
  message: string;
  details?: unknown;
}

const STORAGE_KEY = 'property-alpha-debug-log';
const MAX_ENTRIES = 100;

function debugModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DEBUG_MODE === 'true' || process.env.NODE_ENV === 'development';
}

function redact(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    return value.replace(/(authorization|bearer|token|secret|password|api[_-]?key)([:=\s]+)[^\s&]+/gi, '$1$2[REDACTED]');
  }
  if (Array.isArray(value)) return value.map(redact);
  if (typeof value === 'object') {
    const output: Record<string, unknown> = {};
    for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
      output[key] = /(authorization|cookie|token|secret|password|api[_-]?key|access[_-]?token)/i.test(key) ? '[REDACTED]' : redact(raw);
    }
    return output;
  }
  return value;
}

export function getClientDebugEntries(): ClientDebugEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? '[]') as ClientDebugEntry[];
  } catch {
    return [];
  }
}

export function clearClientDebugEntries() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('property-alpha-debug-log-updated'));
}

export function clientDebugLog(level: ClientDebugLevel, scope: string, message: string, details?: unknown) {
  if (typeof window === 'undefined' || !debugModeEnabled()) return;
  const entry: ClientDebugEntry = {
    timestamp: new Date().toISOString(),
    level,
    scope,
    message,
    details: redact(details)
  };

  const entries = [...getClientDebugEntries(), entry].slice(-MAX_ENTRIES);
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent('property-alpha-debug-log-updated'));

  const method = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  method(JSON.stringify(entry));
}
