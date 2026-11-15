---
paths:
  - "campaigns/**/emails/*.md"
---

# SpreadFast email rules

These rules apply to every email file in any SpreadFast campaign, and only to email files.

Each email file must:

1. **Start with the subject and preview.** The first line is `Subject: ...`, 50 characters or fewer. The second line is `Preview: ...`, 90 characters or fewer.
2. **Greet the reader by first name.** Use `{{first_name}}`, for example: `Hi {{first_name}},`
3. **Have exactly one main link.** It goes to the page for that campaign, written as a Markdown link:
   - SpreadFast launch: `[Button text](https://spreadfast.example/launch)`
   - First Look: `[Button text](https://spreadfast.example/first-look)`

   No other links in the email.
4. **End with our sign-off from `brand/voice.md`**, then this two-line footer as plain text, not inside a code block:

You're getting this because you showed interest in our services, {{source}} via SpreadFast.
SpreadFast, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

So the end of every email looks like this:

Happy to look at your numbers,
The SpreadFast team

You're getting this because you showed interest in our services, {{source}} via SpreadFast.
SpreadFast, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Leave the `{{...}}` placeholders as they are. The email tool fills them in when it sends.
