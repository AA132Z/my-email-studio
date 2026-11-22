# Step 14 · Package your studio kit: prompts for SpreadFast

The lab's step 14 prompts are written for the old Kettlebird studio. These are the same steps, adjusted for this studio. **Do step 13 first.** This step copies `review/findings.schema.json` and `scripts/review.mjs`, which step 13 creates.

What changed from the lab, and why:

- **"Kettlebird-specific" becomes "SpreadFast-specific".** Our personalize skill uses `client-journey` and `qsr` as examples, so those get made general.
- **The kit also carries `send-guard.test.mjs`,** so the guard can be tested in any client.
- **`review.mjs` must work from inside a client repo.** It finds its schema next to itself in the kit, and reads and writes the client's own files.
- **This studio's own hook stays.** The kit is a copy, and the studio keeps working without it.
- **Rise & Crumb gets its own footer and leads columns.** Our footer says "after we replied to {{source}}", which only fits SpreadFast. We also have three links, one per stage of the journey, and the bakery gets a single spring link. Our `stage` and `consent` values describe the client journey, so the bakery gets its own.
- **The check searches for "SpreadFast"** in both folders, not "Kettlebird".

Folders: `studio-kit` and `client-two` go next to this studio, so `D:\Personal\studio-kit` and `D:\Personal\client-two`.

---

## Before you start

Press `Shift+Tab` until the bottom of the screen says **plan mode**.

## Build 1 of 3 · Paste in plan mode

```
Plan this first. Don't build anything yet.

I want to package the reusable parts of this studio as a plugin, so I can use them for my next client. Plan a new folder next to this one, called studio-kit (D:\Personal\studio-kit), with:
- .claude-plugin/plugin.json (name studio-kit, version 0.1.0, a one-line description) and .claude-plugin/marketplace.json listing the plugin with source "./"
- skills/personalize/SKILL.md, copied from .claude/skills/personalize/SKILL.md, with anything SpreadFast-specific made general (such as the client-journey and qsr examples)
- hooks/hooks.json, registering our send guard as a PreToolUse hook on mcp__resend__.*, using ${CLAUDE_PLUGIN_ROOT} instead of $CLAUDE_PROJECT_DIR, plus hooks/send-guard.mjs and hooks/send-guard.test.mjs copied from .claude/hooks/
- agents/email-reviewer.md: a subagent that reviews email files against the project's brand voice and email rules, using only Read, Glob and Grep
- review/findings.schema.json and scripts/review.mjs, copied from step 13. The script should find the schema next to itself in the kit, but read the emails and rules, and write review/findings.json, in the client repo it runs from.
- README.md: what's inside and how to install it

Brand voice, leads, campaigns, CLAUDE.md, .claude/rules/ and .mcp.json stay in each client's own repo. The README should say why. Leave this studio's own hook in .claude/settings.json as it is.

Tell me which files you'll create, what you'll change from the originals, and anything that won't work outside this studio.
```

**Then:** read the plan and find one thing it says won't travel to a new client. Likely ones: the guard needs `MY_EMAIL` set in each client's own `.claude/settings.local.json`; each client needs its own `.mcp.json` and the practice emulator; and personalize expects `leads/leads.csv` with a `group` column, `brand/voice.md` and `.claude/rules/emails.md`. Then accept the plan, or paste Build 2.

## Build 2 of 3 · After you read the plan

```
The plan looks good. Build it. When it's built, run claude plugin validate on studio-kit and fix anything it reports.
```

## Build 3 of 3 · Same session

```
Set up a second, made-up client so I can test studio-kit somewhere new. Create a folder next to this one called client-two (D:\Personal\client-two), for a small bakery called Rise & Crumb, with:
- brand/voice.md: a short voice guide (warm and cheerful, no health claims, sign off with "Fresh from the oven," then "The Rise & Crumb team")
- CLAUDE.md: one paragraph about the studio, plus the line @brand/voice.md. Include our rules about never sending email to real people and using the practice emulator at http://localhost:4000, but nothing about SpreadFast, the client journey or the FDE-102 lab.
- leads/leads.csv: 6 made-up people, 3 in each of two groups, weekend-bakers and coffee-lovers, all at @example.com, with the same columns as our leads file (first_name,last_name,email,group,joined_on,consent,stage,source). Use bakery values: consent "signed up in our shop", stage "subscribed", and a source such as "our sign-up sheet at the counter".
- leads/CLAUDE.md: our leads folder rules, with the group, consent, stage and source values changed to Rise & Crumb's, plus a "Groups" section with one line describing each group
- .claude/rules/emails.md and .mcp.json, copied from this studio. In the email rule, replace our three stage links with one link to https://riseandcrumb.example/spring, use Rise & Crumb's sign-off, and change the footer to two lines: "You're getting this because you signed up at {{source}}." and "Rise & Crumb, {{company_address}} · Unsubscribe: {{unsubscribe_url}}". Drop {{attachment}} and {{questions}}, since a bakery email doesn't use them.
- campaigns/spring-bake/emails/01-hello.md: one short email that follows the email rules
Then search client-two for "SpreadFast" and "spreadfast.example" and fix any match. Then run git init in client-two and commit everything there. Don't install studio-kit; I'll load it myself.
```

**Then:**

- `/exit`, then `cd ../client-two`
- Make sure the practice Resend emulator is running at `http://localhost:4000`.
- Start Claude Code with your kit loaded: `claude --plugin-dir ../studio-kit`
- Approve the resend server when asked. If it fails to connect, fix that before the check, because test 3 needs it.

## Check · Inside client-two, then paste

```
Test the studio-kit plugin in this client. Only the personalize skill may write files.

1. Is the studio-kit plugin loaded? List the studio-kit skills and agents you can see.
2. Use the studio-kit personalize skill on campaigns/spring-bake. Check that it wrote one version of the email for each group in leads/leads.csv (weekend-bakers and coffee-lovers).
3. Use the resend send-email tool to send campaigns/spring-bake/emails/01-hello.md to the first person in leads/leads.csv. The kit's guard should block it. Quote the block message word for word, and don't try to get around it.
4. Search the ../studio-kit folder and this folder for the words SpreadFast and spreadfast.example. There should be no matches.

Give me a short table: Test | Pass or Fail | What happened.
Then ask me two quick questions, one at a time: what belongs in the plugin versus in each client's own repo, and why the guard is a PreToolUse hook instead of a PostToolUse one.
```

### You'll know it worked when

- `claude plugin validate` says **Validation passed**. A missing-icon warning is fine.
- In client-two you see `studio-kit:personalize` and `studio-kit:email-reviewer`, and personalize writes `groups/weekend-bakers/` and `groups/coffee-lovers/`.
- The kit's guard blocks a send to a bakery lead at `@example.com`.

### If something goes wrong

**"SpreadFast" shows up in client-two:** a rule was copied without being adapted. Rules belong to each client, so ask Claude to update the footer, sign-off and link for Rise & Crumb.
