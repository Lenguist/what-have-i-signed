# Market Research: T&C / Privacy Policy Tools

*Research date: March 2026*

---

## Key Takeaway Up Front

**There is no dominant consumer winner in this space.** The market is fragmented between a few nonprofits/volunteer projects and a long tail of small AI-powered extensions. The core summarization feature has been commoditized by LLMs — differentiation must come from trust, brand, and unique features (like auto-capture + history + chat).

---

## Existing Tools

### ToS;DR (Terms of Service; Didn't Read)
- **tosdr.org** | Chrome extension + browser widget
- Volunteer-run nonprofit; rates services A–E with curated clause analysis
- DuckDuckGo integration gives it indirect reach to ~100M daily users
- Chrome extension: 3.7/5 stars — limited coverage, volunteer lag, past controversy (changed search engine settings)
- Funding: donation-only via Open Collective; very modest
- **Key gap:** Manual curation only covers major services; can't auto-capture anything you sign

### Polisis / PriBot (Academic)
- **pribot.org** | Academic tool from EPFL/UW/UMich (USENIX Security 2018)
- Trained on 130,000 privacy policies; includes Q&A chatbot (PriBot)
- Pioneer, but never commercialized; superseded by modern LLMs
- **Key gap:** Not a product, just a research demo

### Privacy Badger (EFF)
- **privacybadger.org** | ~1M Chrome users | 4.4/5 stars
- Blocks trackers, not a T&C summarizer — adjacent space only
- Free, nonprofit (EFF-backed)
- Hit hard by Chrome's Manifest V3 transition in 2024

### Wave of AI Summarizer Extensions (2023-2025)
All small, indie, freemium. None have broken through:
- **T&See** — Gemini-powered, one-click summaries
- **TermsAi** — flags red flags (arbitration, hidden fees); 4.9/5 stars
- **Termsy** — sidebar with highlighted clauses; 173 Product Hunt upvotes
- **SummIt** — includes Q&A chat about the document
- **Polirizer** — GPT-4o-mini + Claude; HN discussion Nov 2024

**Common pattern:** All require manual triggering. None auto-capture when you actually accept. None store history. None let you revisit later.

### Guardio (Adjacent — Browser Security)
- **guard.io** | 1M+ users | $100M ARR | $127M raised (Series A + B)
- NOT a T&C tool — malware/phishing/identity protection
- Proves browser security extensions CAN scale and monetize
- Shows the model: free extension → upsell to paid subscription

### TLDRLegal
- **tldrlegal.com** | Owned by FOSSA
- Plain-English summaries of open-source software licenses (not consumer T&C)
- 1.5M+ summaries delivered; trusted in developer community
- Good precedent for the brand/trust angle

### Legalese Decoder
- **legalesedecoder.com** | Freemium, ~$5/mo
- AI plain-English translator for legal docs; beta stage; ~24 Trustpilot reviews
- Billing complaints (continued charging after cancellation)

### Docracy (Dead — Historical)
- Crowd-sourced legal templates; 500K users at peak
- Shut down 2018, acquired by eversign 2019
- Lesson: free legal document tools are hard to monetize

---

## Market Size

- **Legal Technology (global):** $27-32B in 2024, growing to $46-64B by 2030
- **Privacy Enhancing Technologies:** $3.1B in 2024, growing at 25% CAGR to $12B by 2030
- **Consumer T&C tools specifically:** Tiny and fragmented — no major commercial player

---

## User Behavior Stats

- **56%** of US internet users always/almost always accept privacy policies without reading
- **75%** of 18-29 year olds never read before accepting
- **98%** of mobile users never read app agreements
- **67%** know "little to nothing" about what companies do with their data

The problem is massive and validated. The tools that exist don't solve it at scale.

---

## Key Risks & Lessons

### The Honey Scandal (Dec 2024)
PayPal's Honey extension (20M users) lost 8M users after allegations it replaced affiliate links and suppressed better discount codes. **Trust is the core asset for browser extensions. Once broken, user exodus is instant.**

### Manifest V3
Google's 2024 Chrome extension API changes crippled tracker-blocking extensions (killed uBlock Origin's main version). T&C summarizers are less affected (they use AI APIs, not request blocking) but platform risk is real.

### The B2B vs. B2C gap
B2B legal AI (contract review for legal teams) is more commercially proven. Consumer-facing T&C awareness tools haven't found strong monetization yet.

---

## Competitive Gap / Opportunity

**What nobody has built (and this idea does):**
1. **Auto-capture** — saves T&C automatically when you accept, without manual triggering
2. **History** — a personal archive of everything you've ever agreed to
3. **Retrospective chat** — ask questions about docs you signed months ago
4. **Change tracking** — alert when a company updates terms you accepted

The closest tools (SummIt, TermsAi) only do on-demand summaries in the moment. They don't remember anything.

---

## Sources
- tosdr.org, privacyspy.org, pribot.org, guard.io, tldrlegal.com
- TechCrunch (Guardio Series A/B), USENIX Security 2018 (Polisis paper)
- Grand View Research (legal tech market), Statista (privacy policy acceptance stats)
- Wikipedia (Privacy Badger, Honey scandal), Hacker News (Polirizer thread)
- Product Hunt (Termsy, PriBot launches)
