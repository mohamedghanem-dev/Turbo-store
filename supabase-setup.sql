-- =====================================================
-- Nexus Arab Store — Supabase Setup SQL
-- Run this once in your Supabase SQL Editor
-- =====================================================

-- 1. apps table (main content table)
create table if not exists public.apps (
  id              bigint generated always as identity primary key,
  title           text not null,
  description     text,
  icon_url        text,
  screenshots     text[]    default '{}',
  download_links  text[]    default '{}',
  demo_video_url  text,
  is_free         boolean   default true,
  price           numeric   default 0,
  category        text      not null,
  created_at      timestamptz default now()
);

-- Enable public read, restrict write to service role (RLS)
alter table public.apps enable row level security;

-- Allow anyone to read
create policy "Public read apps" on public.apps
  for select using (true);

-- Allow anyone to insert/update/delete (no auth yet — protect with admin UI password)
-- Change this later when you add Supabase Auth
create policy "Admin write apps" on public.apps
  for all using (true) with check (true);

-- 2. admin_settings table (single row for admin password)
create table if not exists public.admin_settings (
  id       int primary key default 1 check (id = 1),  -- only 1 row allowed
  password text not null default 'nexus2026'
);

alter table public.admin_settings enable row level security;

-- Anyone can read (password checked client-side, fine for simple use)
create policy "Read admin settings" on public.admin_settings
  for select using (true);

-- Anyone can update (protected by the app's password check)
create policy "Update admin settings" on public.admin_settings
  for all using (true) with check (true);

-- Insert the first admin_settings row
insert into public.admin_settings (id, password)
values (1, 'nexus2026')
on conflict (id) do nothing;

-- 3. Storage bucket (run separately in Storage > New Bucket if not done)
-- Bucket name: nexus-assets
-- Public: true
-- If creating via SQL:
insert into storage.buckets (id, name, public)
values ('nexus-assets', 'nexus-assets', true)
on conflict (id) do nothing;

-- Allow public read on storage objects
create policy "Public read nexus-assets" on storage.objects
  for select using (bucket_id = 'nexus-assets');

-- Allow anyone to upload (protected by admin UI password)
create policy "Anyone upload nexus-assets" on storage.objects
  for insert with check (bucket_id = 'nexus-assets');

-- Allow anyone to delete (protected by admin UI)
create policy "Anyone delete nexus-assets" on storage.objects
  for delete using (bucket_id = 'nexus-assets');
