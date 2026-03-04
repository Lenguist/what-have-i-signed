-- Run this in your Supabase SQL editor to set up the database

-- Documents table: stores every T&C a user has saved
create table if not exists documents (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  url          text not null,
  title        text not null,
  raw_text     text not null,
  word_count   int not null default 0,
  captured_at  timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

-- Index for fast user lookups
create index if not exists documents_user_id_idx on documents(user_id);
create index if not exists documents_captured_at_idx on documents(user_id, captured_at desc);

-- Row Level Security: users can only see their own documents
alter table documents enable row level security;

create policy "Users can read own documents"
  on documents for select
  using (auth.uid() = user_id);

create policy "Users can insert own documents"
  on documents for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own documents"
  on documents for delete
  using (auth.uid() = user_id);
