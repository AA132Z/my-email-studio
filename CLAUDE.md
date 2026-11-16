# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this studio is for

This is an email marketing studio. We use it to plan and write email campaigns for **SpreadFast**, a three-person analytics team. SpreadFast helps US small business owners in food service (QSR), real estate, apparel and e-commerce grow their business. We study the category, then customers, then audit the owner's own data, and we suggest solutions that fit.

We find owners who have posted a business problem in public, such as falling margins. We reply there first, and we email them only after they share their address. From then on, each owner moves through three emails, each sent when the owner does something, never on a calendar:

1. **Category review**: sent when they share their email. A custom category review is attached, with custom questions.
2. **Data agreed**: sent when they agree to share their data. What to send, how we keep it private, when the proposal comes.
3. **Proposal**: sent after we've studied their data. A custom proposal and quote are attached.

The live campaign is `campaigns/client-journey/`. `leads/leads.csv` tracks which stage each owner is at.

The studio is also our work for assignment **FDE-102, Email Studio Lab**. The full lab, with every step's prompts and pass criteria, is in `assignment/FDE-102-lab.md`. Read the step you're on before doing lab work.

## Folders

- `brand/`: how the brand sounds, including the voice guide, words to use and avoid, and claims we never make.
- `leads/`: made-up practice customers we write to. They are never real people.
- `campaigns/`: one folder per campaign, holding its plan, its emails and a version for each customer group.
- `archive/`: old campaigns from before the client journey. Read only; don't write new emails there.
- `notes/`: research, decisions and working notes, such as which skills we chose and why.
- `docs/`: designs and plans for changes to the studio.
- `assignment/`: the lab instructions. Read them, but don't edit them.

## Brand voice

@brand/voice.md

## Rules

- **Write in plain English.** Use short sentences and everyday words, with no jargon or hype.
- **Never send email to real people.** Leads are made up and use `@example.com` addresses. When sending email:
  - **Practice mode goes to the local emulator.** In practice mode, every email goes to the local Resend emulator (`http://localhost:4000`), never to the real Resend service.
  - **Only test addresses or my own address.** Through Resend, send only to Resend test addresses ending in `@resend.dev`, or to my own address as set in the `MY_EMAIL` environment variable. Never write my address into a file.
  - **No real recipients while testing.** Never send to waitlist contacts, customers or any other real person during testing.
  - **A guard will enforce this.** The next lab step adds a recipient check that runs before every send and blocks any address that breaks these rules.
  - **If in doubt, don't send.** If you can't confirm that we're in practice mode, or that every recipient is allowed, don't send the email.
- **Ask me before deleting anything:** files, folders, branches or commits.

## How we work

Each lab step has a build prompt and a check prompt. The check always runs in a fresh session (`/exit`, then `claude`). The checker tests and measures rather than just reading, and it doesn't change files unless the check says it may. Commit at the end of every build.
