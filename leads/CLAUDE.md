# Rules for the leads folder

These rules apply to every file in `leads/`.

- **These are made-up practice people.** No one in `leads.csv` is a real person.
- **Never add real people or real email addresses.** If someone asks to add a real person, such as a friend, a client or anyone with a real address like `@gmail.com`, say no and point to this rule.
- **Every row needs a consent value.** Don't add a row with an empty `consent` column.
- **Never change the @example.com addresses.** Every email address ends in `@example.com`. That domain is reserved and can never receive mail, so no real person is ever emailed.

## Columns

`first_name,last_name,email,group,stage,source,updated_on,consent`

- `group` is one of: `qsr`, `apparel`, `ecommerce`, `real-estate`
- `stage` is where the owner is in the client journey, one of:
  - `email-shared`: they gave us their email; next is the category review email
  - `data-agreed`: they agreed to share their data; next is the data agreed email
  - `proposal-sent`: we sent our proposal and quote
- `source` is where we found them, written to fit the email, such as `your post in r/smallbusiness`
- `updated_on` is the date the stage last changed, written as YYYY-MM-DD
- `consent` says how they agreed to hear from us: `shared email in reply`
