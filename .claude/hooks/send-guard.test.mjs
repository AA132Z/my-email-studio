// Tests for send-guard.mjs. Run: node --test .claude/hooks/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const guard = fileURLToPath(new URL('./send-guard.mjs', import.meta.url));
const ME = 'owner@test.invalid';

const NO_EMAIL = Symbol('no MY_EMAIL');
function run(input, myEmail = ME) {
  const env = { ...process.env, MY_EMAIL: myEmail };
  if (myEmail === NO_EMAIL) delete env.MY_EMAIL;
  const stdin = typeof input === 'string' ? input : JSON.stringify(input);
  const r = spawnSync(process.execPath, [guard], { input: stdin, env, encoding: 'utf8' });
  return { code: r.status, err: r.stderr };
}
const call = (tool, tool_input) => ({ tool_name: `mcp__resend__${tool}`, tool_input });

test('send-email to a practice lead is blocked and names the address', () => {
  const r = run(call('send-email', { to: ['ayesha.khan@example.com'], subject: 's', text: 't' }));
  assert.equal(r.code, 2);
  assert.match(r.err, /ayesha\.khan@example\.com/);
});

test('send-email to @resend.dev is allowed', () => {
  assert.equal(run(call('send-email', { to: 'delivered@resend.dev', subject: 's', text: 't' })).code, 0);
});

test('send-email to MY_EMAIL is allowed, ignoring capital letters', () => {
  assert.equal(run(call('send-email', { to: ['Owner@Test.Invalid'], subject: 's', text: 't' })).code, 0);
});

test('a bad cc or bcc blocks the whole send', () => {
  assert.equal(run(call('send-email', { to: 'delivered@resend.dev', cc: 'x@gmail.com' })).code, 2);
  assert.equal(run(call('send-email', { to: 'delivered@resend.dev', bcc: ['y@gmail.com'] })).code, 2);
});

test('lookalike domains are blocked', () => {
  assert.equal(run(call('send-email', { to: 'a@resend.dev.evil.com' })).code, 2);
  assert.equal(run(call('send-email', { to: 'a@notresend.dev' })).code, 2);
});

test('display-name addresses are checked by their real address', () => {
  assert.equal(run(call('send-email', { to: 'Test <delivered@resend.dev>' })).code, 0);
  assert.equal(run(call('send-email', { to: 'Ayesha <ayesha.khan@example.com>' })).code, 2);
});

test('send-email with no recipients is blocked', () => {
  assert.equal(run(call('send-email', { subject: 's' })).code, 2);
});

test('without MY_EMAIL only @resend.dev passes', () => {
  assert.equal(run(call('send-email', { to: ME }), NO_EMAIL).code, 2);
  assert.equal(run(call('send-email', { to: 'delivered@resend.dev' }), NO_EMAIL).code, 0);
});

test('send-batch-emails checks every email in the batch', () => {
  const ok = { to: ['delivered@resend.dev'], subject: 's', text: 't' };
  assert.equal(run(call('send-batch-emails', { emails: [ok, ok] })).code, 0);
  const r = run(call('send-batch-emails', { emails: [ok, { ...ok, to: ['tom.becker@example.com'] }] }));
  assert.equal(r.code, 2);
  assert.match(r.err, /tom\.becker@example\.com/);
});

test('forward-inbox-thread-email checks its addresses', () => {
  assert.equal(run(call('forward-inbox-thread-email', { to: ['delivered@resend.dev'] })).code, 0);
  assert.equal(run(call('forward-inbox-thread-email', { to: ['x@gmail.com'] })).code, 2);
});

test('list-reaching and unseen-recipient tools are always blocked', () => {
  for (const t of ['send-broadcast', 'create-automation', 'send-inbox-draft', 'send-new-inbox-email',
                   'reply-to-inbox-thread-email', 'send-event', 'duplicate-automation', 'update-automation']) {
    const r = run(call(t, {}));
    assert.equal(r.code, 2, t);
    assert.ok(r.err.trim().length > 0, `${t} gives a reason`);
  }
});

test('other resend tools are allowed', () => {
  assert.equal(run(call('list-emails', {})).code, 0);
  assert.equal(run(call('get-email', { id: 'x' })).code, 0);
});

test('unreadable input is blocked', () => {
  assert.equal(run('not json').code, 2);
});
