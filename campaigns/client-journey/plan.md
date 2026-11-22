# SpreadFast client journey plan

Business: SpreadFast, a three-person team that provides advanced analytics for business growth (we look for patterns in a business's sales, customers and messages, then suggest what to change)
Channel: replies on Reddit and similar sites first, then email only, no paid ads
Pilot window: Monday 7 December 2026 to Sunday 31 January 2027 (8 weeks)
Voice: follows `brand/voice.md`. Friendly, careful and clear. Every email ends "Happy to look at your numbers, Team SpreadFast".

## 1. Overview

- **What this is:** the path every new owner takes with us, from our first reply on their post to our proposal. Each email is sent when the owner does something, not on a fixed calendar.
- **Goal:** 15 owners agree to share their data with us by Sunday 31 January 2027.
- **Other aims:**
  - Send a proposal to everyone who shares their data within three weeks of getting it.
  - Learn which of our four groups moves through the stages best, so we know where to spend our time.
  - Keep unsubscribes low (under 3% across the three emails).

We expect about 40 owners to share their email during the pilot. Our starting guess is that about 1 in 2 of them agree to share data in time. The goal of 15 allows for owners who agree after the window closes. These are guesses, not promises, and we check them every Monday (see section 7).

## 2. Who we write to

US small business owners who posted a business problem in public, such as "sales are fine but margins keep dropping." We replied there first, and they then shared their email with us. They know us a little, so they are warm, not cold.

| Group | Who they are | What they want | What might stop them |
|---|---|---|---|
| QSR owners | Run one to a few quick-service restaurants. Busy every day. | To know why margins slip while sales hold up, and what to change first. | No time. Doubt that analytics is for a business their size. |
| Real estate owners | Run a small agency or manage a few properties. | To know where leads come from and which ones turn into deals. | Data spread across many places. Unsure what we would need from them. |
| Apparel owners | Sell clothes in a shop, online or both. | To know which styles, sizes and seasons really make money, and why stock piles up. | Worry about sharing sales data. Think analytics is only for big brands. |
| E-commerce owners | Sell online and check their numbers every day. | To know which customers, products and channels bring profit, not just sales. | Already have dashboards. Unsure what we add. |

## 3. The stages and when each email goes

| Stage | Trigger | Email | Send date | Audience | Purpose | Link |
|---|---|---|---|---|---|---|
| Find and reply | We see a post about a business problem | None (reply on the site) | Same day we see the post | Owners posting in the four groups | Offer help and ask for their email | None |
| 1 Category review | Owner shares their email | `01-category-review` | Within one working day of the trigger. First sends: Tuesday 8 December 2026 | Leads at stage `email-shared`, one version per group | Send the custom category review (attached) and custom questions, and explain our three services | `https://spreadfast.example/call` |
| 2 Data agreed | Owner agrees to share their data | `02-data-agreed` | Within one working day of the trigger. First sends: Tuesday 8 December 2026 | Leads at stage `data-agreed`, one version per group | Say what data to send, how we keep it private, and when our proposal comes | `https://spreadfast.example/share-data` |
| 3 Proposal | We have studied their data | `03-proposal` | Within three weeks of getting the data | Leads moving to `proposal-sent`, one version per group | Send the custom proposal and quote (attached) and the next step | `https://spreadfast.example/proposal` |

Send time is 10 am US Eastern, Monday to Friday. When a lead's email goes out, we update their `stage` in `leads/leads.csv`.

## 4. Key messages

**Main message:** We analyze your data, find the problems, and give you solutions that grow your business.

- **Stage 1:** We start with your category, then customers, then your own business. Here is our review of your category, and a few questions so our advice fits you. Our three services are sales analytics, consumer analytics and communication analysis.
- **Stage 2:** Thank you for trusting us. Here is the data we'd need, how we keep it private, and when to expect our proposal.
- **Stage 3:** Here is what we'd look at and what it would cost, based on your own data. Any size of opportunity is an estimate, never a promise.

We never promise a result or a percentage, never name a price before we've seen the data, and never name clients without their written permission.

## 5. What each group version changes

Each version keeps the main email and changes only the opening line and one example. These are the examples to use:

| Group | Sales analytics example | Consumer analytics example | Communication example |
|---|---|---|---|
| QSR | Which menu items sell together, so your combos fit what people already buy | How often your regulars come back | What your menu and delivery app listings say |
| Real estate | Which listings and price bands close, and how fast | Which leads turn into deals, by where they came from | How your listings and follow-up messages read |
| Apparel | Which styles and sizes sell together, and which sit on the shelf | Which customers come back each season | What your posts and product pages say about fit and price |
| E-commerce | Which products end up in the same cart | Which customers buy again and which buy once | Which emails and ads bring buyers, not just clicks |

Other changes by group:

- **Real estate:** leave out the named methods Market Basket Analysis and RFM, and their explanations. They are about items bought together and repeat buying, which don't fit an agency. Keep the plain description of each service.

## 6. What we need to make

| Item | What it holds | Ready by |
|---|---|---|
| Category review for each group | Custom review, attached to email 1 | Monday 7 December 2026 (first owners), then per owner |
| Questions for each owner | Custom questions, placed in email 1 | Per owner, before email 1 |
| Call page | Optional short call booking | Monday 7 December 2026 |
| Data sharing page | What to send and a safe upload | Monday 7 December 2026 |
| Proposal page | Where owners accept or ask about a proposal | Monday 7 December 2026 |
| Proposal and quote | Custom, attached to email 3 | Per owner, after we study their data |

## 7. How we'll measure success

**Main number:** owners who agree to share their data, with a target of 15 by Sunday 31 January 2027.

| Monday review | Owners who agreed to share data so far (rough target) |
|---|---|
| Monday 14 December 2026 | 2 |
| Monday 28 December 2026 | 5 |
| Monday 11 January 2027 | 9 |
| Monday 25 January 2027 | 13 |

Other numbers we watch:
- Owners at each stage, by group, from the `stage` column in `leads/leads.csv`
- Replies to email 1 that answer our questions
- Proposals sent within three weeks of getting the data
- Owners who become clients after a proposal (starting guess: about 1 in 3)
- Unsubscribes for each email (aim: under 3% in total)

How we track them: the `stage` column in `leads/leads.csv`, the email tool's reports for opens, clicks and unsubscribes, and replies logged by hand. We review the numbers every Monday.
