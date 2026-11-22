# Step 13 · Automatic review: prompts for the client journey

The lab's step 13 prompts are written for the old tea campaign. These are the same steps, adjusted for `campaigns/client-journey/`.

What changed from the lab, and why:

- **The real campaign is `campaigns/client-journey`,** not `steep-club-launch`.
- **The review covers the group versions too.** Our campaign keeps one copy of each email per group in `groups/<group>/emails/`, and those copies are what we send.
- **The bad email is a SpreadFast email.** It plants the three problems the lab asks for. All three break our own rules: `brand/voice.md` bans health claims such as "detox" and pressure lines such as "last chance", and `.claude/rules/emails.md` allows exactly one link. Everything else follows the rules, so the review should find only the planted problems.
- **The script calls `claude` with a list of arguments, not through a shell.** On Windows, a shell can break the quotes inside the schema text.
- **If `claude` fails, the script says why and exits with code 2.** The check asks what happens when `claude` fails.

---

## Build 1 of 2 · Paste in Claude Code

```
Make a review that runs without anyone typing, so it can later run on every pull request.

1. Create review/findings.schema.json: a JSON Schema for an object with a "findings" array. Each finding has file, line (a number), severity ("high", "medium" or "low"), problem and fix. All five are required.
2. Create scripts/review.mjs, a small Node script that takes a campaign folder and runs Claude Code headless, like this:
   claude -p "Review every email file in <folder>, including the group versions in <folder>/groups/*/emails/, against brand/voice.md and .claude/rules/emails.md. Report only real problems." --output-format json --json-schema "<the schema file's text>" --allowedTools "Read,Glob,Grep"
   Call claude with a list of arguments, not through a shell, so the quotes in the schema survive on Windows. The output may be one JSON object, or a list whose last item is the result, so handle both. Take structured_output, save it to review/findings.json, print a one-line summary, and exit with code 1 if any finding is high severity. If claude fails or returns no structured_output, print why and exit with code 2.
3. To prove it catches problems, write a deliberately bad SpreadFast email at campaigns/test-bad/emails/01-bad.md. It should break our rules with a detox claim (such as "our audit will detox your margins"), a "last chance" line and two links. Keep everything else to the rules in .claude/rules/emails.md (subject, preview, greeting, sign-off and footer), so only the planted problems are wrong. Then run: node scripts/review.mjs campaigns/test-bad
4. Run it on campaigns/client-journey too, then commit everything.

Tell me what each run found and what exit code it gave.
```

## Build 2 of 2 · Same session

```
Improve scripts/review.mjs so a second review doesn't repeat itself.

If review/findings.json already exists for the same folder, include those earlier findings in the prompt and add: "These are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that have been fixed." To make that work, save the folder name inside review/findings.json too.

Then test it:
1. Run node scripts/review.mjs campaigns/test-bad and note the findings.
2. Fix only the detox claim in campaigns/test-bad/emails/01-bad.md (change it to something brand/voice.md allows).
3. Run the review again on campaigns/test-bad.
Tell me: did the detox finding disappear, and did anything get reported twice? Commit when done.
```

## Check · New session, then paste

```
Test my automatic review. The script rewrites review/findings.json; don't change any other file.

1. Run node scripts/review.mjs campaigns/test-bad. Did it exit with code 1? Does every finding in review/findings.json have all five fields from review/findings.schema.json, with severity high, medium or low?
2. Did it catch the second link? Quote that finding.
3. Run node scripts/review.mjs campaigns/client-journey. Did it exit with code 0? Did it look at the group versions in groups/*/emails/ as well as the main emails?
4. Read scripts/review.mjs. Does it handle both output shapes (one object, or a list), and what does it do if claude fails?

Give me a short table: Test | Pass or Fail | What you saw.
Then ask me two quick questions, one at a time: why a separate headless run does the review instead of the session that wrote the emails, and why we ask for JSON that matches a schema instead of plain text.
```

### You'll know it worked when

- `campaigns/test-bad` gives **exit code 1**, with findings for the detox claim and the second link. `campaigns/client-journey` gives **exit code 0**.
- After you fix the detox claim, the next review drops it and repeats nothing.
- Reviews vary a little from run to run, which is why only high severity fails.

If `client-journey` gives exit code 1, read the high finding before changing anything. It may be a real problem. One thing it may mention is the email 01 subject line: its text is 45 characters, but the whole line with the `Subject:` label is 54. That only misses the rule's softer aim, so it shouldn't be high.

**Optional:** the studio is on GitHub (`M-Ali/my-email-studio`), so you can add a GitHub Actions workflow that runs `node scripts/review.mjs` on pull requests. It needs `ANTHROPIC_API_KEY` saved as a repository secret.
