# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this studio is for

This is an email marketing studio. We use it to plan and write email campaigns for a small business. Our sample client is **Kettlebird Tea**, a made-up online tea shop launching a monthly tea box called **The Steep Club** to the people on its waitlist.

The studio is also our work for assignment **FDE-102, Email Studio Lab**. The full lab, with every step's prompts and pass criteria, is in `assignment/FDE-102-lab.md`. Read the step you're on before doing lab work.

## Folders

- `brand/`: how the brand sounds, including the voice guide, words to use and avoid, and claims we never make.
- `leads/`: made-up practice customers we write to. They are never real people.
- `campaigns/`: one folder per campaign, holding its plan, its emails and a version for each customer group.
- `notes/`: research, decisions and working notes, such as which skills we chose and why.
- `assignment/`: the lab instructions. Read them, but don't edit them.

## Rules

- **Write in plain English.** Use short sentences and everyday words, with no jargon or hype.
- **Never send email to real people.** Leads are made up and use `@example.com` addresses.
- **Ask me before deleting anything:** files, folders, branches or commits.

## How we work

Each lab step has a build prompt and a check prompt. The check always runs in a fresh session (`/exit`, then `claude`). The checker tests and measures rather than just reading, and it doesn't change files unless the check says it may. Commit at the end of every build.
