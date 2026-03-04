# Implementation Plan

*Written: March 2026*

---

## The Big Picture

Three distinct phases, each shippable on its own:

```
Phase 1: Manual Capture + Archive
  → User clicks "Save this T&C" in the extension
  → Document stored, viewable in a dashboard

Phase 2: AI Chat
  → User opens any saved doc and chats with it
  → "What data do they collect?" "Can they sell my info?"

Phase 3: Auto-Capture
  → Extension detects acceptance events automatically
  → No user action required
```

Start with Phase 1 because: (a) it's the hardest technically to do *well*, (b) it validates that people actually want the archive before we build the intelligence layer on top, and (c) manual capture is legally safer while we figure out the copyright/storage questions.

---

## Phase 1 — Manual Capture + Archive

**What it does:** User is on a ToS/Privacy Policy page, clicks the extension icon, hits "Save." The document gets stored with metadata. User has a dashboard to browse everything they've saved.

### Stack Decision

- **Extension:** Chrome Manifest V3 (TypeScript)
- **Backend:** Next.js API routes (reuse the landing page repo — just add `/api/` routes)
- **Database:** Postgres via Supabase (free tier, handles auth too)
- **Auth:** Supabase Auth (magic link or Google OAuth — no password complexity)
- **Hosting:** Vercel (already set up)

Everything lives in one repo. The landing page, the dashboard, and the API are all Next.js. The extension talks to the same Vercel deployment.

### What to Build

**Extension (Chrome)**
- Manifest V3 setup with `activeTab` permission
- Popup UI: "Save this page's T&C" button + status indicator
- Content script: extract the main text content from the current page (strip nav/footer/ads, keep the legal text)
- Send extracted text + metadata (URL, page title, date) to the backend API
- Show confirmation / error in popup

**Backend (Next.js API routes)**
- `POST /api/documents` — receive text + metadata, store to DB, return document ID
- `GET /api/documents` — list all documents for the authenticated user
- `GET /api/documents/[id]` — fetch a single document
- `DELETE /api/documents/[id]` — delete a document
- Auth middleware using Supabase JWT (extension sends token in Authorization header)

**Database schema (Postgres)**
```
users          — managed by Supabase Auth
documents
  id           uuid primary key
  user_id      uuid references auth.users
  url          text
  title        text            -- page title or extracted service name
  raw_text     text            -- full captured text
  captured_at  timestamptz
  word_count   int
```

**Dashboard (Next.js page at `/dashboard`)**
- List of saved documents: service name, date, word count
- Click a document → read the full text
- Delete a document
- Auth gate: redirect to login if not authenticated

**Auth flow**
- `/login` page with Supabase magic link or Google OAuth
- Extension opens this page if user is not logged in
- After login, extension stores the session token in `chrome.storage.local`

### The Hard Part of Phase 1

**Text extraction is the core technical challenge.** Legal documents live inside pages with navigation, banners, cookie notices, footers, etc. A naive "get all text" approach returns garbage. Options:

1. **Readability.js** (Mozilla's library, used by Firefox Reader View) — strips boilerplate, keeps main content. Works well on article-like pages. Good starting point.
2. **Look for semantic signals** — `<article>`, elements with class names containing "terms", "policy", "content", "legal", long `<section>` blocks, etc.
3. **Heuristic: longest text block** — the T&C is almost always the longest contiguous block of text on the page.

Start with Readability.js + a word count check (if extracted text < 200 words, fall back to full body text). Refine from there.

---

## Phase 2 — AI Chat

**What it does:** User opens a saved document and can chat with it using natural language. Powered by Claude API.

### What to Build

**Chat UI (Next.js page at `/dashboard/[id]`)**
- Document viewer (full text, scrollable)
- Chat panel alongside it
- Message history for the session

**Backend**
- `POST /api/documents/[id]/chat` — takes a message + document ID, streams a Claude response
- Use Claude's context window: pass the full document text as context + the conversation history
- For long documents (>100k tokens): chunk and use embeddings to retrieve relevant sections before passing to Claude

**Claude integration**
- System prompt: *"You are a legal document assistant. The user has saved the following Terms of Service / Privacy Policy. Answer their questions accurately and in plain English. If a clause is concerning or unusual, say so."*
- Stream the response back to the UI
- No chat history persistence in MVP — each page load starts fresh (can add later)

### Cost Considerations
- Claude Haiku for chat: ~$0.25/1M input tokens, ~$1.25/1M output tokens
- A typical ToS is 5,000–15,000 words (~7,000–20,000 tokens)
- Each chat turn costs roughly $0.005–$0.015 in input tokens
- This is cheap enough to offer free with a monthly cap, then charge for heavy use

---

## Phase 3 — Auto-Capture

**What it does:** Extension detects when the user clicks "I Accept" and automatically saves the T&C without any user action.

### Why This Is Hard
- No browser event for "user accepted T&C"
- Must detect acceptance buttons across arbitrary DOM structures
- Must correlate the button click with the legal document on the same page
- Must not fire on every button click (high false positive rate is annoying)

### Approach

**Step 1: Detect the acceptance moment**
Content script listens for button clicks. For each click, check if:
- Button text matches a pattern: "I Accept", "I Agree", "Accept All", "Continue", "Agree and Continue", "Accept Terms", etc. (case-insensitive regex)
- Page URL or title contains signals: "terms", "privacy", "policy", "signup", "register", "tos"

If both signals are present → candidate acceptance event.

**Step 2: Find the legal text**
On candidate pages, look for the T&C text before the click is processed:
- Same Readability.js extraction as Phase 1
- Additionally look for: links to external ToS pages (capture those too), iframe-embedded documents, `<dialog>` elements containing legal text

**Step 3: Save automatically**
Same API as Phase 1. Show a non-intrusive notification: "Saved: Spotify Terms of Service."

**False positive handling:**
- If extracted text < 500 words: don't save (probably not a real T&C)
- Deduplicate: if same URL was saved in the last 7 days, skip
- User can dismiss/delete any auto-saved doc from the dashboard

### Honest Assessment
Auto-detection will work well on major platforms (Google, Apple, Spotify, Netflix) and poorly on edge cases. Ship it with a "report a missed capture" button so users can tell you when it failed.

---

## What to Build First (Recommended Order)

1. **Extension skeleton** — Manifest V3, popup, content script, build system (Webpack or Vite)
2. **Text extraction** — get Readability.js working on 10 real T&C pages, evaluate quality
3. **Supabase setup** — database schema, auth, API keys
4. **Backend API** — document CRUD endpoints
5. **Dashboard** — basic list + full document view
6. **Auth flow** — login page + extension token storage
7. **Wire it all together** — extension → API → dashboard end-to-end
8. **AI chat** — Claude integration, chat UI
9. **Polish + publish** — Chrome Web Store submission, landing page waitlist → real CTA

Auto-capture comes after all of the above is working and tested with real users.

---

## Repo Structure

```
what-have-i-signed/
  app/                    ← Next.js (landing page, dashboard, API)
    page.tsx              ← landing page (done)
    dashboard/
      page.tsx            ← document list
      [id]/page.tsx       ← document view + chat
    api/
      documents/
        route.ts          ← GET (list), POST (create)
        [id]/
          route.ts        ← GET, DELETE
          chat/route.ts   ← POST (AI chat)
    login/page.tsx
  extension/              ← Chrome extension
    manifest.json
    popup/
    content/
    background/
  documentation/          ← research docs (done)
```

---

## Open Questions to Decide Before Building

1. **Auth method** — magic link (simpler) vs Google OAuth (higher conversion)?
2. **Storage limits** — how many documents per free user? (Suggest: 50 free, unlimited paid)
3. **Monetization** — freemium with AI chat behind paywall? Or free with usage cap?
4. **Copyright risk** — store raw text server-side, or only store locally and send to API on demand? (Local-only is safer but limits the "access from any device" use case)
