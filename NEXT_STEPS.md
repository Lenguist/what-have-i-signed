# Next Steps — What Have I Signed?

## Current state (frozen March 2026)

### Done
- [x] Supabase project created, `documents` table set up with RLS
- [x] Env vars added to Vercel — auth works end-to-end in production
- [x] Chrome extension submitted to Web Store — **pending review** (can take a few business days)
- [x] `/privacy` page live at https://what-have-i-signed.vercel.app/privacy
- [x] Store assets generated in `store-assets/`

### When Chrome review completes
- Check the [developer dashboard](https://chrome.google.com/webstore/devconsole) for approval/rejection
- If rejected, address the feedback and resubmit

---

## Phase 2: AI chat (main feature)
Once extension is approved and users are saving documents:

- Add a `/dashboard/[id]/chat` route
- Wire up Claude API (`claude-sonnet-4-6`) with the document as context
- Stream responses
- Add `ANTHROPIC_API_KEY` to Vercel env vars

---

## Phase 3: Proactive clause flagging
- On extension popup, auto-analyze the current page if it looks like a T&C
- Flag suspicious clauses before the user clicks accept
- Categories: data selling, arbitration, auto-renewal, IP ownership grabs

---

## Phase 4: Change tracking
- Store document snapshots over time
- Diff when a site updates its T&Cs
- Email notification when terms change
