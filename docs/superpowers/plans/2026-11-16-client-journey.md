# Client Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the template-shaped launch campaign with a three-stage client-journey campaign that matches how SpreadFast actually wins clients.

**Architecture:** Content-only change in Markdown and CSV. Old campaigns move to `archive/` with `git mv`. Rules, voice and lead docs are updated first, so the new plan and emails are written against them. Checks are shell commands (grep/awk) run from the repo root in Git Bash.

**Tech Stack:** Markdown, CSV, Git Bash.

**Spec:** `docs/superpowers/specs/2026-11-16-client-journey-design.md`

## Global Constraints

- Plain English, short sentences, voice and claim rules from `brand/voice.md`. No promised results, no percentages promised, no price, no diagnosis before data.
- Every email: line 1 `Subject: ` (text after label ≤ 50 chars), line 2 `Preview: ` (≤ 90 chars), greeting `Hi {{first_name}},`, exactly one Markdown link, sign-off `Happy to look at your numbers,` / `Team SpreadFast`, then the two-line footer from `.claude/rules/emails.md`.
- Stage links, exactly: stage 1 `https://spreadfast.example/call`, stage 2 `https://spreadfast.example/share-data`, stage 3 `https://spreadfast.example/proposal`.
- Placeholders allowed: `{{first_name}}`, `{{source}}`, `{{attachment}}`, `{{questions}}`, `{{company_address}}`, `{{unsubscribe_url}}`.
- Groups: `qsr`, `real-estate`, `apparel`, `ecommerce`.
- Lead columns, exactly: `first_name,last_name,email,group,stage,source,updated_on,consent`. Stages: `email-shared`, `data-agreed`, `proposal-sent`. Consent: `shared email in reply`.
- Never edit `assignment/`. Never delete: move with `git mv`. Commit at the end of every task.

## Review Focus

1. Stage 3 email slipping into a price or a promised gain ("we found you're losing…") — reader expects estimates only. Check in Task 5 step 3.
2. Advanced methods named without a plain explanation (Market Basket Analysis, RFM) — check in Task 5 step 3.
3. A group version with a second link, or the wrong stage link — check in Task 6 step 2.
4. Stale references to `SpreadFast-launch`, "waitlist" or "first-look request" left in live files — check in Task 7.
5. A lead row with an empty or invalid stage/consent — check in Task 3 step 2.

---

### Task 1: Archive the old campaigns

**Files:**
- Move: `campaigns/SpreadFast-launch/` → `archive/SpreadFast-launch/`
- Move: `campaigns/spreadfast-first-look/` → `archive/spreadfast-first-look/`

- [ ] **Step 1:** `git mv campaigns/SpreadFast-launch archive/SpreadFast-launch && git mv campaigns/spreadfast-first-look archive/spreadfast-first-look` (create `archive/` first).
- [ ] **Step 2: Verify.** `ls campaigns archive` → `campaigns` holds only `.gitkeep`; `archive` holds both folders. `git status` shows renames only.
- [ ] **Step 3: Commit** `Move template-era campaigns to archive`.

### Task 2: Update rules, voice and studio docs

**Files:**
- Modify: `.claude/rules/emails.md` (rule 3 links; add placeholders note)
- Modify: `brand/voice.md` (new section "What we offer" after the method list)
- Modify: `CLAUDE.md` (describe the three-stage client journey; folders list adds `archive/`, `docs/`)
- Modify: `leads/CLAUDE.md` (columns and allowed values)
- Modify: `.claude/skills/personalize/SKILL.md` (example path `campaigns/client-journey`; write to `groups/<group>/<same file name>`, never a nested `emails/` folder; include all groups found in leads)

- [ ] **Step 1:** Edit `.claude/rules/emails.md` rule 3: one main link per email, the stage link from Global Constraints, matched by file name prefix `01-`, `02-`, `03-`. Add: `{{attachment}}` and `{{questions}}` are allowed placeholders and stay as written.
- [ ] **Step 2:** Add to `brand/voice.md` a "What we offer" section with the three services and plain explanations, copied from the spec's "What we offer" section, plus: name each method once and explain it right after.
- [ ] **Step 3:** Update `CLAUDE.md` "What this studio is for" with the four steps from the spec ("How SpreadFast wins a client"); add `archive/` (old work, read only) and `docs/` to Folders.
- [ ] **Step 4:** Update `leads/CLAUDE.md` Columns to the new header and values.
- [ ] **Step 5:** Update personalize skill as listed above.
- [ ] **Step 6: Verify.** `grep -n "first-look\|/launch" .claude/rules/emails.md` → no output. `grep -n "Sales analytics\|Consumer analytics\|Communication analysis" brand/voice.md` → 3 lines. `grep -n "nested\|groups/<group>/" .claude/skills/personalize/SKILL.md` → shows the flat rule.
- [ ] **Step 7: Commit** `Describe the client journey in rules, voice and docs`.

### Task 3: Convert leads to the journey

**Files:** Modify `leads/leads.csv`

- [ ] **Step 1:** Rewrite with the new header. Keep all 24 people, names, emails and groups. Spread stages within each group: 4 `email-shared`, 2 `data-agreed`, 2 `proposal-sent`. `source` varies across realistic subreddits (`your post in r/smallbusiness`, `r/restaurantowners`, `r/realtors`, `r/ecommerce`, `r/fashionbusiness`). `updated_on` between 2026-10-01 and 2026-11-15. `consent` = `shared email in reply`.
- [ ] **Step 2: Verify.**
  `head -1 leads/leads.csv` → exact header.
  `awk -F, 'NR>1 && ($5!~/^(email-shared|data-agreed|proposal-sent)$/ || $8!="shared email in reply" || $3!~/@example\.com$/)' leads/leads.csv` → no output.
  `awk -F, 'NR>1{print $4}' leads/leads.csv | sort | uniq -c` → 8 per group.
- [ ] **Step 3: Commit** `Track leads by journey stage`.

### Task 4: Write the client-journey plan

**Files:** Create `campaigns/client-journey/plan.md`

- [ ] **Step 1:** Sections: 1 Overview (what the journey is, no calendar window); 2 Who we write to (table of the four groups: who, what they want, what might stop them — reuse wording from `archive/spreadfast-first-look/plan.md` and add apparel/e-commerce split); 3 The stages (spec's "Each email" table, plus Reddit step 1 described as not email); 4 Key messages per stage; 5 What each group version changes (one example line per service per group); 6 Targets as starting guesses (1 in 2 email-shared → data-agreed; 1 in 3 proposal-sent → client; reviewed monthly; marked as guesses); 7 How we track (stage column in leads, replies logged by hand).
- [ ] **Step 2: Verify.** `grep -c "^## " campaigns/client-journey/plan.md` → 7. `grep -niE "waitlist|launch|guarantee" campaigns/client-journey/plan.md` → no output.
- [ ] **Step 3: Commit** `Add client journey plan`.

### Task 5: Write the three stage emails

**Files:** Create `campaigns/client-journey/emails/01-category-review.md`, `02-data-agreed.md`, `03-proposal.md`

- [ ] **Step 1:** Write each per the spec table and `.claude/rules/emails.md`. Stage 1 mentions `{{source}}`, `{{attachment}}` and has `{{questions}}` on its own line; explains the three services, naming Market Basket Analysis and RFM once each with a plain explanation. Stage 2: what data, privacy, when the proposal comes; no attachment. Stage 3: `{{attachment}}` proposal and quote; findings only as estimates.
- [ ] **Step 2: Verify format** (save as scratchpad `check-emails.sh`, takes file paths):
  for each file: line 1 matches `^Subject: .{1,50}$`; line 2 `^Preview: .{1,90}$`; contains `Hi {{first_name}},`; `grep -o '](http' | wc -l` = 1; link equals stage link for its prefix; contains `Team SpreadFast`, `{{unsubscribe_url}}`. Print `OK <file>` or `FAIL <file>: <reason>`. Expected: 3 × OK.
- [ ] **Step 3: Verify voice.** `grep -niE '\$[0-9]|[0-9]+ ?%|guarantee|we will fix|you.re losing|leverage|cutting-edge|act now|AI-powered' campaigns/client-journey/emails/*.md` → no output. `grep -n "Market Basket\|RFM" …/01-category-review.md` → each on a line with "which means" (or equivalent plain explanation).
- [ ] **Step 4: Commit** `Add three client journey emails`.

### Task 6: Write group versions

**Files:** Create `campaigns/client-journey/groups/{qsr,real-estate,apparel,ecommerce}/{01-category-review,02-data-agreed,03-proposal}.md` (12 files)

- [ ] **Step 1:** Run the updated personalize skill on `campaigns/client-journey` (or follow it by hand). Each version changes only the category example lines per plan section 5.
- [ ] **Step 2: Verify.** `find campaigns/client-journey/groups -name '*.md' | wc -l` → 12; no `emails/` folder under `groups/`. Run `check-emails.sh` on all 12 → 12 × OK. Rerun Task 5 step 3 grep over `groups/` → no output.
- [ ] **Step 3: Commit** `Add group versions of client journey emails`.

### Task 7: Final sweep

- [ ] **Step 1: Verify.** `git grep -nIiE "SpreadFast-launch|waitlist|first-look request|SpreadFast Is Open" -- . ':!archive' ':!assignment' ':!docs'` → no output (fix any hit in place).
- [ ] **Step 2:** Push: `git push`.
