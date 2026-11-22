# Step 15 · What owners value: prompts for SpreadFast

The lab's step 15 prompts are written for the old Kettlebird studio, using reviews of a tea sampler box. These are the same steps, adjusted for this studio. This is a stretch step: nothing is sent and no plugin is needed.

What changed from the lab, and why:

- **Tea box reviews become owner feedback on our free category review.** Our closest thing to a product that people review is the custom category review we send at stage 1 of the client journey. So the practice data is made-up feedback from owners who got one.
- **The feedback covers our four groups:** QSR, apparel, e-commerce and real estate. Each piece of feedback names the group and refers to the parts of our method it mentions: the category study, the customer study, the audit, Market Basket Analysis, RFM and the size-of-the-opportunity estimate.
- **The complaints fit an analytics service, not a tea box.** Wet packaging becomes **a slow category review**: owners waiting too long for it. Other complaints: worry about sharing their data, jargon, questions that don't fit their business, and wanting a price before we've seen the data.
- **The feedback is marked as made up.** Our brand rules ban client names or results without written permission. So the files say they are practice data, and no feedback may be quoted in an email.
- **The build commits at the end,** as `CLAUDE.md` asks.

---

## Build 1 of 3 · Paste in Claude Code (in this studio)

```
Create practice data: notes/reviews/ with 120 short made-up pieces of feedback from small business owners who received SpreadFast's free custom category review, in 6 files of 20 each (reviews-1.md to reviews-6.md).

Start each file with this line: "Made-up practice data for lab step 15. Not real clients. Never quote in an email."

Each piece of feedback gets a star rating (1 to 5), the owner's first name only, and their group (qsr, apparel, ecommerce or real-estate). Mix the four groups across the files. No business names, no real people and no email addresses.

Make the feedback varied and realistic. Name specific parts of our work, such as the category study, the customer study, Market Basket Analysis (which items people buy together), RFM (how recently, how often and how much customers buy), the questions we asked, and the size-of-the-opportunity estimate. Mix praise with complaints: the review took too long to arrive, worry about sharing their sales data, too much jargon, questions that didn't fit their business, and wanting a price before we'd seen their data. Spread the complaints unevenly across the files, so some files have more of one complaint than others.

Don't summarise them. Commit when done.
```

**Then:** start a named session:

```
/exit
claude -n review-dig
```

## Build 2 of 3 · Paste in the named session

```
Find the top 5 things owners value and the top 3 complaints across all the feedback in notes/reviews/.

Use a subagent to read the feedback files, so the raw feedback doesn't fill up this conversation. Tell the subagent to keep a scratchpad at notes/scratchpad.md and to add to it after each file, one line per finding: the file, the finding, how many pieces of feedback mention it, and one short quote. At the end, give me the top 5 and top 3 with how often each came up, and which group (qsr, apparel, ecommerce or real-estate) mentioned each one most.
```

**Then:** type `/compact`. This squeezes the conversation into a short summary.

## Build 3 of 3 · Same session, after /compact

```
Which feedback file had the most complaints about the category review taking too long to arrive? Quote one. Answer from memory first. Then check notes/scratchpad.md and the files, and tell me whether your memory was right.
```

## Check · New session, then paste

`/exit`, then `claude`.

```
Check my scratchpad. Don't change any files.

1. Does notes/scratchpad.md have lines for every file in notes/reviews/?
2. Pick three lines and check each one against the feedback file it names: is the quote real, and is the count right?
3. Does every file in notes/reviews/ start with the "Made-up practice data" line, with no business names or email addresses in it?

Give me a short table: Test | Pass or Fail | What you found.
Then ask me two quick questions, one at a time: why we write to a scratchpad as we go, and what /compact does to Claude's memory.
```

### You'll know it worked when

- Your main session only sends work to a subagent. The raw feedback never fills your chat.
- After `/compact`, memory gets details wrong or can't answer, and the scratchpad can.
- The scratchpad has one line per finding, not one line per file. In the lab's own test, a thin scratchpad couldn't answer either.

### If something goes wrong

**The subagent writes the scratchpad only at the end:** ask it again, and stress "after each file". If it's interrupted, a scratchpad written at the end is empty.

**The feedback reads like real client results:** this is made-up practice data. Don't use any of it as proof in a campaign. Our brand rules ban client results without written permission.

### Exam note

The warning sign is answers that stop matching earlier findings, or that talk about "typical patterns" instead of the specific things found. The fixes are scratchpad files, subagents, summaries between phases, saved state files and `/compact`. A bigger context window is never the answer.
