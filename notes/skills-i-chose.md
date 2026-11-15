# Skills I chose

I searched skills.sh on 2026-11-15 with `npx skills find` for "email marketing", "email sequence", "campaign plan" and "resend". Star counts come from GitHub on the same day. Nothing has been installed yet.

## Use these

**1. For writing campaigns: `anthropics/knowledge-work-plugins`**
- Skills: `campaign-plan` (3.4K installs) and `email-sequence` (3.1K installs).
- Published by Anthropic, the company that makes Claude. The repository has about 36,000 stars, an Apache-2.0 licence, and was updated two days ago.
- It turned up in both the "email sequence" and "campaign plan" searches, so one trusted source covers planning the campaign and writing the emails.

**2. For sending email: `resend/resend-skills`**
- Skills: `resend` (24.7K installs), plus `resend-cli` and `send-email`.
- Published by Resend itself, the email service this studio will send through. The repository has a modest 212 stars, but it has an MIT licence and was updated last week. A low star count is normal for a single company's tool. What matters is that the people who run the service wrote it.
- Optional extra from the same publisher: `resend/email-best-practices` (8.3K installs, 146 stars) for deliverability tips.

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`**
- It was the top result for "email marketing", with 31.7K installs, but its GitHub repository has only **2 stars**, 1 fork and no description, and it was created in March 2026. That many installs with almost no stars doesn't add up. The install count may be inflated, or it may come from installs that ran automatically. The publisher is not a known email or AI company.

**2. `okou-ai/okou-skills@resend`** (also `membranedev/application-skills@resend`)
- These are unofficial Resend skills from third parties, while Resend publishes its own. Neither repository has a licence. They have 81 and 272 stars, and neither has a description.
- A sending skill gets close to API keys and real recipients, so I only want it from the service's own publisher.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it.** Prefer the official company behind the tool (`anthropics`, `resend`) over unknown individuals or copycat repos. Open the GitHub owner page and confirm it is who it claims to be.
2. **Whether the numbers agree.** Compare installs with GitHub stars and forks, and look at how old the repo is and when it was last updated. Installs on their own are easy to inflate. Lots of installs with almost no stars is a warning sign.
3. **What the skill actually does.** Read its `SKILL.md` and any scripts before installing. Check which tools it asks for, whether it runs commands or sends data anywhere, and whether it has a licence. That matters most for anything that sends email or touches an API key.
