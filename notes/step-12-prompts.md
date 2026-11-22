# Step 12 · Resume and fork: prompts for the client journey

The lab's step 12 prompts are written for the old tea campaign. These are the same steps, adjusted for `campaigns/client-journey/` and its four lead groups: apparel, ecommerce, qsr and real-estate.

What changed from the lab, and why:

- **Part A asks for five bullets: one per group plus one shared.** The lab had three groups and five bullets. We have four groups.
- **Angle A echoes the owner's own words.** It repeats the problem they posted but never says what's causing it. The voice guide says we don't diagnose before we've seen the data.
- **Each angle says what it must not do.** This keeps the two forks apart, so the check can tell if one used the other's idea.
- **Subjects count the text only, not the `Subject:` label.** This matches `.claude/rules/emails.md`.
- **The last session only suggests the final line.** It doesn't edit any email files.

Name every fork with `-n`. A fork without a name keeps `journey-angles`, and later resumes fail with "matches 2 sessions".

---

## Part A · Start a named session

Run: `claude -n journey-angles`

```
Read campaigns/client-journey/plan.md and each group's version of email 01 (campaigns/client-journey/groups/<group>/emails/01-category-review.md). In five short bullets, tell me what the lead groups care about most: one bullet each for apparel, ecommerce, qsr and real-estate, and one bullet on what all four share. Don't write any files.
```

Then `/exit`.

## Part B · Come back later

Run: `claude --resume journey-angles`

```
Remind me: what did you say the QSR owners care about most? One sentence.
```

Then `/exit`.

## Part C · First fork, with its own name

Run: `claude --resume journey-angles --fork-session -n angle-a`

```
Angle A: write three subject lines for email 01, the category review email, that focus on the problem the owner posted in public, such as sales holding steady while margins slip. Echo their problem in their own words, for example "Sales steady, margins slipping?" Never say what's causing it or what's wrong with their business, because we haven't seen their data yet. Don't mention studying their category.

Follow brand/voice.md and .claude/rules/emails.md: each subject is 50 characters or fewer (count the text only, not the "Subject:" label), with no hype, no promises, no "Quick question" and no "Re:". Save them to notes/angle-a.md with the character count after each line.
```

Then `/exit`.

## Part D · Second fork, from the same spot

Run: `claude --resume journey-angles --fork-session -n angle-b`

```
Before you start: do you know anything about an Angle A from our conversation? Answer yes or no first.

Angle B: write three subject lines for email 01, the category review email, that focus on how their category works, meaning what we learned when we studied businesses like theirs. Don't mention the owner's own problem or post.

Follow brand/voice.md and .claude/rules/emails.md: each subject is 50 characters or fewer (count the text only, not the "Subject:" label), with no hype, no promises, no "Quick question" and no "Re:". Save them to notes/angle-b.md with the character count after each line.
```

Then `/exit`.

## Part E · Start fresh from a summary

Run: `claude --resume journey-angles` and ask:

```
Read notes/angle-a.md and notes/angle-b.md. Then write notes/handoff.md in 10 lines or fewer: what each of the four groups cares about, both angles, and which one you'd pick and why.
```

Then `/exit`, start a brand-new session with `claude`, and ask:

```
Read notes/handoff.md and continue from it: suggest the final subject line for email 01, the category review email, with its character count. Don't edit any email files.
```

## Check · New session, then paste

```
Check my session experiment. Don't change any files.

1. Do notes/angle-a.md and notes/angle-b.md each have three subject lines of 50 characters or fewer, counting the text only? Count them yourself; don't trust the counts in the files.
2. Does either file use the other angle's idea? Angle A echoes the owner's own posted problem; Angle B is what we learned about their category. They were written in separate forks, so they shouldn't overlap.
3. Do any of the six lines break brand/voice.md: hype, promises, saying what's wrong before we've seen the data, "Quick question" or "Re:"?
4. Is notes/handoff.md 10 lines or fewer, does it cover all four groups, and does everything it says match the files it describes?

Give me a short table: Test | Pass or Fail | What you saw.
Then ask me two quick questions, one at a time: when I should resume a session and when I should start fresh with a summary, and what --fork-session gave me that resuming didn't.
```

### You'll know it worked when

- The resumed session in Part B remembers what it said about QSR owners.
- Fork B answers "no" about Angle A. It may notice `notes/angle-a.md`, because forks share files but not the conversation.
