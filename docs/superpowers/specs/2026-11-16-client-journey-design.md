# Client journey: restructure design

Date: 2026-11-16
Status: waiting for approval

## Why

The studio was built from the lab's sample (a tea shop launching a monthly box to a waitlist). That shape leaked in: a four-week "SpreadFast Is Open" launch to about 2,000 people, a "first-look request" form, and leads marked as "waitlist form". SpreadFast doesn't work that way. We want the studio to match how we actually win clients.

## How SpreadFast wins a client

1. **Find and reply (not email).** We find an owner on Reddit or another platform who has posted a business problem. We reply there, offer help, and ask for their email.
2. **Stage 1 email: category review and questions.** Sent once they share their email. We attach a custom review of their category and ask custom questions about their business. We explain what we do in plain words.
3. **Stage 2 email: data agreed.** Sent once they agree to share their data. We thank them, say what data to send, how we keep it private, and when to expect our proposal.
4. **Stage 3 email: proposal.** Sent after we have studied their data. We attach a custom proposal with what we'd do and our quote. We only quote after seeing the data.

Each email is triggered by something the owner does. Nothing is sent on a calendar.

## What we offer (for the emails to explain)

Three services that directly affect revenue:

- **Sales analytics**: what sells, when, and at what margin. Example method: Market Basket Analysis, which means finding which items people buy together.
- **Consumer analytics**: who your customers are and how they behave. Example method: RFM, which means sorting customers by how recently, how often and how much they buy.
- **Communication analysis**: what your messages and ads say, and how they land.

We use well-known frameworks suited to each category (QSR, real estate, apparel, e-commerce). Each method is named once and explained in plain words, as `brand/voice.md` asks.

## Goals

- One campaign, `campaigns/client-journey/`, with three stage emails and a version of each per category (QSR, real estate, apparel, e-commerce).
- Emails are short templates that deliver custom content (review, questions, proposal); they don't contain it.
- Leads show which stage each owner is at.
- The lab's folder layout stays (`plan.md`, `emails/`, `groups/`, `leads/leads.csv`, `.claude/...`), so the remaining lab steps (safety guard, practice launch, review script, kit) still work.

## Non-goals

- Writing the category reviews, questions or proposals. They are custom and made by the team.
- Reddit reply drafts. Can be added later in `notes/`.
- Sending anything. Sending stays in practice mode under the existing rules.

## Anti-goals (a failure even if it works)

- Any email that diagnoses a problem before we've seen the data, promises a result, or names a price.
- Hype or jargon (for example "leverage our cutting-edge AI frameworks").
- Losing the old work. It is moved, not deleted.

## Approaches considered

- **A. One client-journey campaign, one template per stage, a version per category. (Picked.)** Matches the way we work, keeps the lab layout, and keeps the personalize skill useful.
- B. A separate campaign per stage. Three plans that repeat each other; only worth it if each stage had its own goals and reports.
- C. One email per stage with no category versions. Simplest, but drops the personalize skill the lab grades.

## The design

### Files after the change

```
campaigns/client-journey/
├── plan.md                    stages, triggers, what each email must do, how we track
├── emails/
│   ├── 01-category-review.md
│   ├── 02-data-agreed.md
│   └── 03-proposal.md
└── groups/
    ├── qsr/          01-… 02-… 03-…
    ├── real-estate/  01-… 02-… 03-…
    ├── apparel/      01-… 02-… 03-…
    └── ecommerce/    01-… 02-… 03-…
archive/
├── SpreadFast-launch/         moved as is
└── spreadfast-first-look/     moved as is
```

The group folders hold the email files directly (no nested `emails/` folder), which removes the duplicate copies.

### Each email

| Stage | Trigger | What it says | Attachment | One link |
|---|---|---|---|---|
| 1 Category review | Owner shares their email | Thanks for replying on `{{source}}`; your category review is attached; our three services in plain words; a few questions | `{{attachment}}` (category review) | `https://spreadfast.example/call` (book a short call, optional) |
| 2 Data agreed | Owner agrees to share data | Thanks; what data to send; how we keep it private; when to expect our proposal | none | `https://spreadfast.example/share-data` |
| 3 Proposal | We have studied their data | What we found worth looking at (as an estimate); proposal and quote attached; next step | `{{attachment}}` (proposal) | `https://spreadfast.example/proposal` |

- The custom questions go in the body as `{{questions}}`, so owners can reply under each one. (My call: answering in a reply is easier than filling an attachment.)
- Category versions change only a line or two: one example of what each service looks at for that category.
- All other email rules stay: subject 50 characters or fewer, preview 90 or fewer, `Hi {{first_name}},`, one link, sign-off "Happy to look at your numbers, / Team SpreadFast", and the footer.

### Leads

`leads/leads.csv` columns become:

`first_name,last_name,email,group,stage,source,updated_on,consent`

- `stage`: `email-shared`, `data-agreed` or `proposal-sent`
- `source`: where we found them, such as `your post in r/smallbusiness`
- `updated_on`: date the stage last changed (YYYY-MM-DD)
- `consent`: `shared email in reply`

The same 24 made-up leads are kept, with stages spread across them. All addresses stay `@example.com`.

### Other files to update

- `CLAUDE.md`: describe the client journey instead of a launch.
- `brand/voice.md`: add the three services and how to explain them.
- `.claude/rules/emails.md`: replace the two campaign links with the three stage links; allow `{{attachment}}` and `{{questions}}`.
- `leads/CLAUDE.md`: new columns and allowed values.
- `.claude/skills/personalize/SKILL.md`: example path becomes `campaigns/client-journey`; groups write straight into `groups/<group>/`.

## My calls (please check)

- Folder name `client-journey` and the three stage links above.
- Questions in the email body, not attached.
- Stage 1 link to an optional short call.
- Plan targets are starting guesses, marked as such: about 1 in 2 owners who get stage 1 agree to share data, and about 1 in 3 who get a proposal become clients. We review monthly.

## Left to the builder

- Exact email wording, within the voice guide and email rules.
- How stages are spread across the 24 leads.
