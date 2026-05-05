import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import os from 'node:os';

const root = process.cwd();
const outDir = join(root, 'debug-artifacts');
mkdirSync(outDir, { recursive: true });

const secretKeyPattern = /(authorization|cookie|token|secret|password|api[-_]?key|access[-_]?token|refresh[-_]?token|database_url|service_role|supabase.*key|mapbox.*token)/i;
const secretValuePattern = /(bearer\s+)[a-z0-9._~+/=-]+|([?&](?:token|key|api_key|access_token|password|secret)=)[^&\s]+/gi;
const skipDirs = new Set(['node_modules', '.next', '.git', 'debug-artifacts', 'coverage', 'playwright-report', 'test-results', 'raw', 'cache', 'benchmarks', 'normalized']);

function timestamp() {
  return new Date().toISOString();
}

function redactString(value) {
  return String(value).replace(secretValuePattern, (_match, bearerPrefix, queryPrefix) => `${bearerPrefix ?? queryPrefix ?? ''}[REDACTED]`);
}

function redact(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') return redactString(value);
  if (Array.isArray(value)) return value.map(redact);
  if (typeof value === 'object') {
    const output = {};
    for (const [key, raw] of Object.entries(value)) {
      output[key] = secretKeyPattern.test(key) ? '[REDACTED]' : redact(raw);
    }
    return output;
  }
  return value;
}



function write(name, content) {
  writeFileSync(join(outDir, name), redactString(String(content)), 'utf8');
}

function run(name, command) {
  const started = timestamp();
  const result = spawnSync(command, {
    cwd: root,
    shell: true,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }
  });
  const ended = timestamp();
  const content = [
    `timestamp_started=${started}`,
    `timestamp_finished=${ended}`,
    `command=${command}`,
    `exit_code=${result.status ?? 'null'}`,
    `signal=${result.signal ?? ''}`,
    '',
    '--- stdout ---',
    result.stdout ?? '',
    '',
    '--- stderr ---',
    result.stderr ?? '',
    result.error ? `\n--- spawn_error ---\n${result.error.stack ?? result.error.message}` : ''
  ].join('\n');
  write(name, content);
  return { command, exitCode: result.status, signal: result.signal, file: name };
}

function fileTree(dir, prefix = '', lines = []) {
  if (lines.length > 4000) return lines;
  const entries = readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !(entry.isDirectory() && skipDirs.has(entry.name)))
    .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name));
  for (const entry of entries) {
    const full = join(dir, entry.name);
    const rel = relative(root, full) || '.';
    if (entry.isDirectory()) {
      lines.push(`${prefix}${rel}/`);
      fileTree(full, `${prefix}  `, lines);
    } else {
      const size = statSync(full).size;
      lines.push(`${prefix}${rel} (${size} bytes)`);
    }
    if (lines.length > 4000) break;
  }
  return lines;
}

const summary = [];

write('system-info.txt', JSON.stringify(redact({
  collectedAt: timestamp(),
  platform: process.platform,
  arch: process.arch,
  release: os.release(),
  type: os.type(),
  cpus: os.cpus().map((cpu) => cpu.model),
  totalMemoryBytes: os.totalmem(),
  freeMemoryBytes: os.freemem(),
  node: process.version,
  cwd: root
}), null, 2));

summary.push(run('npm-version.txt', 'npm --version'));
summary.push(run('node-version.txt', 'node --version'));

if (existsSync(join(root, 'package.json'))) {
  const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  write('package-json.txt', JSON.stringify(redact(packageJson), null, 2));
  write('npm-scripts.txt', JSON.stringify(redact(packageJson.scripts ?? {}), null, 2));
}

write('env-redacted.txt', Object.entries(redact(process.env)).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join('\n'));
write('file-tree.txt', fileTree(root).join('\n'));

summary.push(run('npm-ls.txt', 'npm ls --all'));
summary.push(run('npm-audit.txt', 'npm audit --json'));
summary.push(run('test.log', 'npm run test:verbose'));
summary.push(run('typecheck.log', 'npm run typecheck'));
summary.push(run('lint.log', 'npm run lint'));
summary.push(run('build.log', 'npm run build'));
summary.push(run('next-info.txt', 'npx next info'));
summary.push(run('git-status.txt', 'git status --short --branch'));

write('README-debug-instructions.txt', [
  'Debug artifact bundle instructions',
  '==================================',
  '',
  `Collected at: ${timestamp()}`,
  '',
  'This folder was created by:',
  'npm run debug:collect',
  '',
  'Windows PowerShell zip command:',
  'Compress-Archive -Path .\\debug-artifacts\\* -DestinationPath .\\debug-artifacts.zip -Force',
  '',
  'Send debug-artifacts.zip to the debugging agent.',
  '',
  'Raw .env files are not included. Environment values in env-redacted.txt are redacted by key/value pattern.',
  'node_modules, .next, .git, coverage, test-results, large generated directories and previous debug artifacts are excluded from file-tree.txt.',
  '',
  'Command summary:',
  JSON.stringify(summary, null, 2)
].join('\n'));

console.log(`Debug artifacts written to ${outDir}`);
