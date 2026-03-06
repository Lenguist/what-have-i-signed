# Next Steps — What Have I Signed?

## Blocked: Supabase setup required first
Everything else depends on this.

1. **Create a Supabase project** at supabase.com
2. **Create the `documents` table:**
   ```sql
   create table documents (
     id uuid primary key default gen_random_uuid(),
     user_id uuid references auth.users not null,
     url text not null,
     title text,
     raw_text text,
     word_count int,
     captured_at timestamptz default now()
   );
   alter table documents enable row level security;
   create policy "Users can access own documents"
     on documents for all using (auth.uid() = user_id);
   ```
3. **Add env vars to Vercel** (Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - (Get values from Supabase → project → Settings → API)
4. Redeploy on Vercel after adding env vars
5. Test sign-in flow end-to-end

---

## Chrome Web Store submission
Extension zip is ready at `extension/extension.zip`.

1. Register at chrome.google.com/webstore/devconsole ($5 one-time fee)
2. Take screenshots (1280×800) of popup + dashboard
3. **Build a `/privacy` page** on the web app — required by Google for extensions that store user data
4. Upload the zip, fill in the listing, submit

---

## Phase 2: AI chat (main feature)
Once Supabase is working and users can save documents:

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
