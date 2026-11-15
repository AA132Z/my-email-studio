---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails for each lead group

Campaign folder: $ARGUMENTS

## 1. Check the input

- If no campaign folder was given, stop. Use Glob on `campaigns/*/plan.md` and `campaigns/*/emails/*.md`, then reply with the list of campaign folders that exist and how to run the skill, for example `/personalize campaigns/SpreadFast-launch`. Write nothing.
- If the folder doesn't exist, or has no `emails/*.md` files, stop the same way: say what's missing and list the campaign folders that do exist.

## 2. Read what you need

1. Every email in `<campaign folder>/emails/*.md`, in file-name order. These are the main emails. Never change them.
2. `<campaign folder>/plan.md`, if it exists. Look for the messages by group (opening lines and examples), and for any group the plan says is **not** part of this campaign.
3. `brand/voice.md`, for the voice, the words to avoid and the claims we never make.
4. `.claude/rules/emails.md`, for the email file rules.
5. `leads/leads.csv`. Take only the distinct values in the `group` column. Don't use names, emails or any other lead data in the emails.

The groups to write for are every group in `leads/leads.csv`, minus any group the plan says is left out of this campaign.

## 3. Write one version per email per group

Save each version to `<campaign folder>/groups/<group>/emails/<same file name>`. If the file already exists, replace it.

**Keep exactly the same as the main email:**
- The structure: the order of paragraphs, headings, lists and questions.
- The `Subject:` line.
- The one link, with the same button text and URL.
- The sign-off and the two-line footer, character for character.
- All `{{...}}` placeholders, left as they are.

**Change only these two things:**
1. **The opening line**: the first sentence after the greeting. Make it fit the group. Use the plan's opening line for that group when it has one.
2. **One example**: the main email's example, so it fits the group. If the main email lists an example for several groups, keep only this group's example, written for this group.

If the `Preview:` line names several groups or samples and would no longer be true, change only as much as needed to make it true. Keep it to 90 characters or fewer.

**Brand rules:**
- Follow `brand/voice.md`: friendly, careful and clear, with short sentences and plain words.
- Don't add any claim, number, price, promise or percentage that isn't already in the main email or the plan.
- Keep any made-up sample clearly marked as made up.
- Don't diagnose a problem before we've seen the owner's data. Say what we'd check first.

## 4. Check before you finish

For every file you wrote, confirm:
- The subject is 50 characters or fewer, and the preview is 90 or fewer (counting the text after the label).
- The greeting is `Hi {{first_name}},`.
- There is exactly one link, and it matches the main email's link.
- The last five lines match the main email's last five lines exactly.
- Only the opening line and one example (and, if needed, the preview) differ from the main email.

Fix anything that fails before you reply.

## 5. Reply with a short summary only

Don't paste the emails. Reply with:
- How many files you wrote (number of emails × number of groups) and where.
- Any group you skipped, and why.
- One example opening line per group, taken from its version of the first email.
