---
paths:
  - "campaigns/**/emails/*.md"
  - "campaigns/**/groups/**/*.md"
---

# SpreadFast email rules

These rules apply to every email file in any SpreadFast campaign, including the group versions in `groups/`, and only to email files.

Each email file must:

1. **Start with the subject and preview.** The first line is `Subject: ...` and the second line is `Preview: ...`. Count only the text after the label: the subject is 50 characters or fewer and the preview is 90 characters or fewer. Aim to keep the whole line, label included, within the same limits so the email passes either way.
2. **Greet the reader by first name.** Use `{{first_name}}`, for example: `Hi {{first_name}},`
3. **Have exactly one main link.** It goes to the page for that stage of the client journey, written as a Markdown link. The file name's number tells you the stage:
   - `01-...` category review: `[Button text](https://spreadfast.example/call)`
   - `02-...` data agreed: `[Button text](https://spreadfast.example/share-data)`
   - `03-...` proposal: `[Button text](https://spreadfast.example/proposal)`

   No other links in the email.
4. **End with our sign-off from `brand/voice.md`**, then this two-line footer as plain text, not inside a code block:

You're getting this because you shared your email with us after we replied to {{source}}.
SpreadFast, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

So the end of every email looks like this:

Happy to look at your numbers,
Team SpreadFast

You're getting this because you shared your email with us after we replied to {{source}}.
SpreadFast, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Leave the `{{...}}` placeholders as they are. The email tool fills them in when it sends. Besides `{{first_name}}`, `{{source}}`, `{{company_address}}` and `{{unsubscribe_url}}`, two more are allowed:

- `{{attachment}}`: the name of the custom file we attach, such as the category review or the proposal.
- `{{questions}}`: the custom questions we write for this owner. Put it on a line of its own.
