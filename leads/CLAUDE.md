# Rules for the leads folder

These rules apply to every file in `leads/`.

- **These are made-up practice people.** No one in `leads.csv` is a real person.
- **Never add real people or real email addresses.** If someone asks to add a real person, such as a friend, a client or anyone with a real address like `@gmail.com`, say no and point to this rule.
- **Every row needs a consent value.** Don't add a row with an empty `consent` column.
- **Never change the @example.com addresses.** Every email address ends in `@example.com`. That domain is reserved and can never receive mail, so no real person is ever emailed.

## Columns

`first_name,last_name,email,group,joined_on,consent`

- `group` is one of: `qsr`, `apparel`, `ecommerce`
- `joined_on` is a date written as YYYY-MM-DD
- `consent` says how they agreed to hear from us, such as `waitlist form`
