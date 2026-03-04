# What Exists, What Doesn't, and Why

*Research date: March 2026*

---

## What Exists

### ToS;DR — The "winner" that never won
- **tosdr.org** | ~13,000 weekly active Chrome users | ~12,600 daily Firefox users
- Volunteer nonprofit, founded 2012, donation-funded, ~8 person team
- Rates services A–E based on community-curated clause analysis
- **Why it hasn't scaled:**
  - Only covers a curated list of major services — visit anything niche, you get nothing
  - Grading algorithm is broken (Tor Browser gets a C despite zero negative flags; contradictory ratings within the same service)
  - No distinction between EU and US versions of ToS for the same service
  - Nearly died in 2024 when Chrome killed Manifest V2 and the extension went years without an update
  - The "DuckDuckGo partnership" was a one-time crowdfunding campaign that raised $14,640. Not a partnership.
  - No business model after 13 years

### AI Summarizer Extensions (2023–2026 wave)
All manual-trigger: user has to actively open the extension on a ToS page. None auto-capture. None store history.

| Tool | Users | Status |
|---|---|---|
| TermsAi | 24 | Dead |
| Polirizer | 19 (9 days post-launch) | Dead |
| Termsy | Launched Feb 2026 | Unknown |
| SummIt | 0 reviews | Dead on arrival |
| TERMSinator | 0 reviews | Dead on arrival |
| ClearTerms | 5 ratings | Barely alive |
| T&See | No data | Minimal traction |
| T&C Reader | No data | Minimal traction |

**No manual-trigger T&C summarizer has reached 100k users. The ceiling appears to be low thousands even for the best-known tools.**

### Open Terms Archive (opentermsarchive.org)
- French government/NGO-backed public database tracking version history of major service terms
- Covers 48 generative AI services, 24 major social media platforms
- A public research infrastructure tool, not a personal user product
- Does not trigger on individual acceptance events; no AI chat; no per-user records

### Adjacent tools (not T&C focused)
- **Privacy Badger (EFF)** — blocks trackers, not a T&C summarizer. ~1M Chrome users. Hit hard by MV3.
- **Guardio** — malware/phishing/identity protection browser extension. $100M ARR, $127M raised. Proves the extension→subscription model works at scale, but different problem.

---

## Why They All Fail

### The activation gap
User is mid-signup, already about to click Accept. Stopping to open an extension and wait for an AI response is more friction than agreeing blindly. Manual-trigger tools require the user to want them *in the moment*, which they reliably don't.

### No memory
Even if a tool summarizes the ToS right now, it forgets immediately. The user can't come back 6 months later and ask "what did I agree to with Spotify?" This is the core missing feature.

### API costs kill freemium
GPT-4/Claude per-call costs don't work when users won't pay for occasional utility. Polirizer tried freemium. Got 19 users.

### Coverage doesn't scale (ToS;DR problem)
Manual curation only covers popular services. The long tail of the internet — niche SaaS tools, new startups, gaming platforms — is unrated. Users install, see nothing useful, uninstall.

### Copyright grey zone
T&C documents are protected by copyright. Storing copies — even locally on a user's device for personal reference — has never been tested in court. This scared off serious commercial attempts at archiving.

### No viral loop
No sharing mechanism, no social component, no reason to tell anyone. Compare to ad blockers or password managers.

### Business model unclear
The most likely users (privacy-conscious people) are also most resistant to ads or data monetization. No one has cracked the monetization problem after 13 years of trying.

---

## What Doesn't Exist (The Gap)

No tool does all of this:

1. **Auto-capture** — saves T&C automatically at the moment of acceptance, without manual triggering
2. **Persistent personal archive** — a record of every agreement you've ever accepted, timestamped and tied to you
3. **Retrospective AI chat** — ask questions about docs you signed months ago ("what did I agree to with Adobe?")
4. **Change tracking** — alert when a company updates terms you previously accepted
5. **Universal coverage** — works on any website, not just a pre-curated list

The closest tools (SummIt, TermsAi) only do on-demand summaries in the moment. They don't remember anything.

---

## Why Now Is the Right Moment

### Demand is massive and validated
- 91% of people accept T&Cs without reading them (Deloitte, 2,000 respondents)
- Reading all your annual T&Cs would take **76 full work days** (Carnegie Mellon)
- 87% say they *want* to understand what they're agreeing to

### 2024 was the inflection point
A string of high-profile T&C scandals made this mainstream:
- **Adobe (June 2024)** — one clause about content access went viral (5M views), triggered mass cancellation threats, forced a full rewrite of their terms within weeks. Millions discovered they'd unknowingly agreed to something they hated and had no record of what changed.
- **LinkedIn (September 2024)** — began scraping user data for AI training *before* updating their privacy policy
- **Meta (May–June 2024)** — planned to use EU user posts for AI training; a TikTok tutorial on opting out hit 4.3M views
- **Zoom (2023)** — clauses implying training on user conversations; reversed within days under pressure

### Regulatory tailwinds
- **FTC (February 2024)** — formally warned that quietly changing T&Cs for AI training "could be unfair or deceptive." Implicitly makes the *version you originally agreed to* legally significant — a timestamped personal archive becomes a legal instrument.
- **CPPA (September 2024)** — enforcement advisory explicitly targeting dark patterns in consent flows
- **20 US states** now have comprehensive privacy laws covering 43% of the US population
- **EU AI Act (August 2026)** — transparency obligations entering into force; institutionalizes the right to know what AI systems are doing with your data

### The AI layer is now commodity infrastructure
The LLM capability needed to make a captured archive queryable only became cheap and reliable in 2023–2024. The technical barrier to the AI chat layer is now low.

---

## The One-Line Summary

Every existing tool tells you what a T&C says. **No tool captures and preserves what *you specifically* agreed to, when you agreed to it, and lets you interrogate that record later.**
