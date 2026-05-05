export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

function envValue(name: string): string | undefined {
  return typeof process !== 'undefined' ? process.env[name] : undefined;
}

function nodeEnv(): string | undefined {
  return envValue('NODE_ENV');
}

const levelPriority: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50
};

const sensitiveKeyPattern = /(authorization|cookie|token|secret|password|api[-_]?key|access[-_]?token|refresh[-_]?token|database_url|service_role|supabase.*key|mapbox.*token)/i;
const sensitiveValuePattern = /(bearer\s+)[a-z0-9._~+/=-]+|([?&](?:token|key|api_key|access_token|password|secret)=)[^&\s]+/gi;

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  category?: string;
  status?: number;
  stack?: string;
  cause?: SerializedError;
}

export interface LogPayload {
  requestId?: string;
  route?: string;
  durationMs?: number;
  error?: unknown;
  code?: string;
  [key: string]: unknown;
}

export interface Logger {
  requestId?: string;
  trace(message: string, payload?: LogPayload): void;
  debug(message: string, payload?: LogPayload): void;
  info(message: string, payload?: LogPayload): void;
  warn(message: string, payload?: LogPayload): void;
  error(message: string, payload?: LogPayload): void;
}

interface SerializeOptions {
  includeStack?: boolean;
  stackLines?: number;
}

export function getLogLevel(): LogLevel {
  const configured = envValue('LOG_LEVEL')?.toLowerCase();
  if (configured === 'trace' || configured === 'debug' || configured === 'info' || configured === 'warn' || configured === 'error') {
    return configured;
  }
  return nodeEnv() === 'development' ? 'debug' : 'info';
}

function shouldLog(level: LogLevel): boolean {
  return levelPriority[level] >= levelPriority[getLogLevel()];
}

function includeStacksFor(level: LogLevel): boolean {
  if (getLogLevel() === 'trace' || level === 'trace') return true;
  return envValue('LOG_STACKS')?.toLowerCase() === 'true';
}

function stackLineLimit(level: LogLevel): number {
  return getLogLevel() === 'trace' || level === 'trace' ? 20 : 5;
}

function redactString(value: string): string {
  return value.replace(sensitiveValuePattern, (_match, bearerPrefix, queryPrefix) => `${bearerPrefix ?? queryPrefix ?? ''}[REDACTED]`);
}

export function redactSensitive<T>(value: T, seen = new WeakSet<object>()): T {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') return redactString(value) as T;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return value;
  if (value instanceof Date) return value.toISOString() as T;
  if (value instanceof Error) return serializeError(value) as T;
  if (typeof value !== 'object') return value;
  if (seen.has(value as object)) return '[Circular]' as T;
  seen.add(value as object);

  if (Array.isArray(value)) {
    return value.map((item) => redactSensitive(item, seen)) as T;
  }

  const output: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    output[key] = sensitiveKeyPattern.test(key) ? '[REDACTED]' : redactSensitive(raw, seen);
  }
  return output as T;
}

function sanitizeStack(stack: string | undefined, options: SerializeOptions = {}): string | undefined {
  if (!stack || !options.includeStack) return undefined;
  const cwd = typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd().replaceAll('\\', '/') : '';
  const home = typeof process !== 'undefined' && process.env.HOME ? process.env.HOME.replaceAll('\\', '/') : '';
  const userProfile = typeof process !== 'undefined' && process.env.USERPROFILE ? process.env.USERPROFILE.replaceAll('\\', '/') : '';

  return redactString(stack)
    .split('\n')
    .slice(0, options.stackLines ?? 5)
    .map((line) => {
      let cleaned = line.replaceAll('\\', '/');
      if (cwd) cleaned = cleaned.replaceAll(cwd, '<app>');
      if (userProfile) cleaned = cleaned.replaceAll(userProfile, '<user>');
      if (home) cleaned = cleaned.replaceAll(home, '<home>');
      return cleaned;
    })
    .join('\n');
}

function errorCode(error: unknown): string | undefined {
  if (error && typeof error === 'object') {
    const maybe = error as { code?: unknown; cause?: unknown };
    if (typeof maybe.code === 'string') return maybe.code;
    if (maybe.cause && typeof maybe.cause === 'object' && typeof (maybe.cause as { code?: unknown }).code === 'string') {
      return (maybe.cause as { code: string }).code;
    }
  }
  return undefined;
}

function errorCategory(error: unknown): string | undefined {
  if (error && typeof error === 'object') {
    const maybe = error as { category?: unknown; cause?: unknown };
    if (typeof maybe.category === 'string') return maybe.category;
    if (maybe.cause && typeof maybe.cause === 'object' && typeof (maybe.cause as { category?: unknown }).category === 'string') {
      return (maybe.cause as { category: string }).category;
    }
  }
  return undefined;
}

function errorStatus(error: unknown): number | undefined {
  if (error && typeof error === 'object') {
    const maybe = error as { status?: unknown };
    return typeof maybe.status === 'number' ? maybe.status : undefined;
  }
  return undefined;
}

export function serializeError(error: unknown, options: SerializeOptions = {}): SerializedError {
  if (error instanceof Error) {
    const output: SerializedError = {
      name: error.name,
      message: redactString(error.message),
      code: errorCode(error),
      category: errorCategory(error),
      status: errorStatus(error),
      stack: sanitizeStack(error.stack, options)
    };
    const cause = (error as Error & { cause?: unknown }).cause;
    if (cause) output.cause = serializeError(cause, options);
    return output;
  }
  if (error && typeof error === 'object') {
    const maybe = error as { name?: unknown; message?: unknown; code?: unknown; category?: unknown; status?: unknown; cause?: unknown; stack?: unknown };
    const output: SerializedError = {
      name: typeof maybe.name === 'string' ? maybe.name : 'NonErrorObject',
      message: typeof maybe.message === 'string' ? redactString(maybe.message) : JSON.stringify(redactSensitive(error)),
      code: typeof maybe.code === 'string' ? maybe.code : errorCode(error),
      category: typeof maybe.category === 'string' ? maybe.category : errorCategory(error),
      status: typeof maybe.status === 'number' ? maybe.status : undefined,
      stack: typeof maybe.stack === 'string' ? sanitizeStack(maybe.stack, options) : undefined
    };
    if (maybe.cause) output.cause = serializeError(maybe.cause, options);
    return output;
  }
  return { name: 'UnknownError', message: redactString(String(error)) };
}

export function getRequestId(request?: Request): string {
  const existing = request?.headers.get('x-request-id') ?? request?.headers.get('x-correlation-id');
  return existing || crypto.randomUUID();
}

function writeLog(scope: string, level: LogLevel, message: string, defaultRequestId: string | undefined, payload: LogPayload = {}) {
  if (!shouldLog(level)) return;
  const { error, ...rest } = payload;
  const serializedError = error
    ? serializeError(error, { includeStack: includeStacksFor(level), stackLines: stackLineLimit(level) })
    : undefined;
  const entry = redactSensitive({
    timestamp: new Date().toISOString(),
    level,
    scope,
    message,
    requestId: rest.requestId ?? defaultRequestId,
    ...rest,
    error: serializedError
  });

  const line = JSON.stringify(entry);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

export function createLogger(scope: string): Logger {
  return createScopedLogger(scope);
}

function createScopedLogger(scope: string, requestId?: string): Logger {
  return {
    requestId,
    trace: (message, payload) => writeLog(scope, 'trace', message, requestId, payload),
    debug: (message, payload) => writeLog(scope, 'debug', message, requestId, payload),
    info: (message, payload) => writeLog(scope, 'info', message, requestId, payload),
    warn: (message, payload) => writeLog(scope, 'warn', message, requestId, payload),
    error: (message, payload) => writeLog(scope, 'error', message, requestId, payload)
  };
}

export function createRequestLogger(scope: string, request?: Request): Logger {
  return createScopedLogger(scope, getRequestId(request));
}
