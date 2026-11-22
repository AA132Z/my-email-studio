#!/usr/bin/env node
// Headless email review.
// Usage: node scripts/review.mjs <campaign folder>
// Runs Claude Code without chat, checks every email in the folder (and its group
// versions) against brand/voice.md and .claude/rules/emails.md, and saves the
// findings to review/findings.json.
// Exit 0 = no high findings. Exit 1 = at least one high finding. Exit 2 = the review could not run.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(here, '..', 'review', 'findings.schema.json');
const outDir = join(process.cwd(), 'review');
const outPath = join(outDir, 'findings.json');

function fail(reason) {
  console.error(`Review could not run: ${reason}`);
  process.exit(2);
}

const folder = (process.argv[2] || '').replace(/[\\/]+$/, '');
if (!folder) fail('no campaign folder given. Example: node scripts/review.mjs campaigns/client-journey');
if (!existsSync(folder) || !statSync(folder).isDirectory()) fail(`folder not found: ${folder}`);
if (!existsSync(schemaPath)) fail(`schema not found: ${schemaPath}`);

const schemaText = readFileSync(schemaPath, 'utf8');

const prompt =
  `Review every email file in ${folder}, including the group versions in ${folder}/groups/*/emails/, ` +
  `against brand/voice.md and .claude/rules/emails.md. Report only real problems. ` +
  `Give each file as a path relative to the repo root, and the line number where the problem is.`;

const args = [
  '-p', prompt,
  '--output-format', 'json',
  '--json-schema', schemaText,
  '--allowedTools', 'Read,Glob,Grep',
];

// No shell: the argument list goes to claude as is, so the schema's quotes survive on Windows.
const run = spawnSync('claude', args, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

if (run.error) fail(`could not start claude (${run.error.message})`);
if (run.status !== 0) {
  // claude often puts the real reason in its JSON result on stdout, not on stderr.
  let reason = '';
  try {
    const out = JSON.parse(run.stdout);
    const last = Array.isArray(out) ? out[out.length - 1] : out;
    reason = last?.result || '';
  } catch {}
  fail(`claude exited with code ${run.status}. ${reason || (run.stderr || run.stdout || '').trim().slice(0, 500)}`);
}

let parsed;
try {
  parsed = JSON.parse(run.stdout);
} catch {
  fail(`claude's output was not JSON: ${run.stdout.trim().slice(0, 300)}`);
}

// The output is one result object, or a list of messages whose last item is the result.
const result = Array.isArray(parsed)
  ? [...parsed].reverse().find((m) => m && m.type === 'result') ?? parsed[parsed.length - 1]
  : parsed;

if (!result) fail('claude returned nothing');
if (result.is_error) fail(`claude reported an error: ${result.result || result.subtype || 'unknown'}`);

const output = result.structured_output;
if (!output || !Array.isArray(output.findings)) {
  fail('claude returned no structured_output with a findings list');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');

const count = { high: 0, medium: 0, low: 0 };
for (const f of output.findings) if (f.severity in count) count[f.severity] += 1;

console.log(
  `Review of ${folder}: ${output.findings.length} finding(s): ` +
  `${count.high} high, ${count.medium} medium, ${count.low} low. Saved to review/findings.json.`,
);

process.exit(count.high > 0 ? 1 : 0);
