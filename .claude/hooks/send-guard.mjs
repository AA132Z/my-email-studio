// PreToolUse guard for the resend MCP server.
// Allows email only to @resend.dev test addresses or to MY_EMAIL.
// Exit 0 = allow. Exit 2 = block (the reason on stderr is shown to Claude).

// Tools that check every address in to, cc and bcc.
const CHECKED = new Set(['send-email', 'send-batch-emails', 'forward-inbox-thread-email']);

// Tools that can reach whole lists, or people we can't see, so they are always blocked.
const ALWAYS_BLOCKED = {
  'send-broadcast': 'it sends to a whole segment of contacts',
  'create-automation': 'automations can email whole lists of people',
  'duplicate-automation': 'automations can email whole lists of people',
  'update-automation': 'automations can email whole lists of people',
  'send-event': 'events can start automations that email people',
  'send-inbox-draft': 'its recipients are not checked here',
  'send-new-inbox-email': 'its recipients are not checked here',
  'reply-to-inbox-thread-email': 'it replies to whoever wrote in, which we cannot check',
};

function block(reason) {
  process.stderr.write(`Send blocked by send-guard: ${reason}\n`);
  process.exit(2);
}

// "Name <a@b.com>" -> "a@b.com", lower case.
function bareAddress(value) {
  const s = String(value).trim();
  const m = s.match(/<([^>]+)>\s*$/);
  return (m ? m[1] : s).trim().toLowerCase();
}

function asList(value) {
  if (value === undefined || value === null || value === '') return [];
  return Array.isArray(value) ? value : [value];
}

function isAllowed(address, myEmail) {
  return address.endsWith('@resend.dev') || (myEmail !== '' && address === myEmail);
}

function checkRecipients(message, myEmail, label) {
  const all = ['to', 'cc', 'bcc'].flatMap((field) => asList(message?.[field]));
  if (all.length === 0) block(`${label} has no recipients to check.`);
  for (const raw of all) {
    const address = bareAddress(raw);
    if (!isAllowed(address, myEmail)) {
      block(`${address} is not allowed. Send only to @resend.dev test addresses or to your own MY_EMAIL address.`);
    }
  }
}

let raw = '';
for await (const chunk of process.stdin) raw += chunk;

let input;
try {
  input = JSON.parse(raw);
} catch {
  block('could not read the tool call, so nothing is sent. If in doubt, don\'t send.');
}

const tool = String(input?.tool_name ?? '').replace(/^mcp__resend__/, '');
const args = input?.tool_input ?? {};
const myEmail = String(process.env.MY_EMAIL ?? '').trim().toLowerCase();

if (tool in ALWAYS_BLOCKED) block(`${tool} is never allowed: ${ALWAYS_BLOCKED[tool]}.`);

if (CHECKED.has(tool)) {
  if (tool === 'send-batch-emails') {
    const emails = asList(args.emails);
    if (emails.length === 0) block('send-batch-emails has no emails to check.');
    emails.forEach((email, i) => checkRecipients(email, myEmail, `Email ${i + 1} in the batch`));
  } else {
    checkRecipients(args, myEmail, tool);
  }
}

process.exit(0);
