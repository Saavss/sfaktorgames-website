-- SFAKTOR GAMES CMS

create extension if not exists pgcrypto;

-- =========================
-- GAMES
-- =========================

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  long_description text,
  status text default 'Published',
  platforms text[] default '{}',
  google_play_url text,
  app_store_url text,
  steam_url text,
  trailer_url text,
  cover_url text,
  banner_url text,
  logo_url text,
  featured boolean default true,
  screenshots text[] default '{}',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.games add column if not exists banner_url text;
alter table public.games add column if not exists logo_url text;
alter table public.games add column if not exists featured boolean default true;
alter table public.games add column if not exists screenshots text[] default '{}';

-- =========================
-- NEWS
-- =========================

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text,
  cover_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================
-- PAGES
-- =========================

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  body text,
  language text default 'tr',
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================
-- SITE SETTINGS
-- =========================

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  studio_name text default 'SFAKTOR GAMES',
  contact_email text default 'contact@sfaktorgames.com',
  hero_title text default 'WE CREATE WORLDS.',
  hero_text text,
  about_text text,
  logo_url text,
  favicon_url text,
  youtube_url text,
  instagram_url text,
  discord_url text
);

alter table public.site_settings add column if not exists logo_url text;
alter table public.site_settings add column if not exists favicon_url text;
alter table public.site_settings add column if not exists youtube_url text;
alter table public.site_settings add column if not exists instagram_url text;
alter table public.site_settings add column if not exists discord_url text;

-- =========================
-- RLS
-- =========================

alter table public.games enable row level security;
alter table public.news enable row level security;
alter table public.pages enable row level security;
alter table public.site_settings enable row level security;

-- eski policies
drop policy if exists "Public can read games" on public.games;
drop policy if exists "Authenticated manage games" on public.games;
drop policy if exists "Admin manage games" on public.games;

drop policy if exists "Public can read news" on public.news;
drop policy if exists "Authenticated manage news" on public.news;
drop policy if exists "Admin manage news" on public.news;

drop policy if exists "Public can read pages" on public.pages;
drop policy if exists "Authenticated manage pages" on public.pages;
drop policy if exists "Admin manage pages" on public.pages;

drop policy if exists "Public can read settings" on public.site_settings;
drop policy if exists "Authenticated manage settings" on public.site_settings;
drop policy if exists "Admin manage settings" on public.site_settings;

-- herkes site içeriğini okuyabilir
create policy "Public can read games"
on public.games
for select
using (true);

create policy "Public can read news"
on public.news
for select
using (true);

create policy "Public can read pages"
on public.pages
for select
using (
  published = true
  or auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);

create policy "Public can read settings"
on public.site_settings
for select
using (true);

-- SADECE ADMIN DEĞİŞTİREBİLİR

create policy "Admin manage games"
on public.games
for all
to authenticated
using (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
)
with check (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);

create policy "Admin manage news"
on public.news
for all
to authenticated
using (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
)
with check (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);

create policy "Admin manage pages"
on public.pages
for all
to authenticated
using (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
)
with check (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);

create policy "Admin manage settings"
on public.site_settings
for all
to authenticated
using (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
)
with check (
  auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);

-- =========================
-- DEFAULT SETTINGS
-- =========================

insert into public.site_settings (
  id,
  studio_name,
  contact_email,
  hero_title,
  hero_text,
  about_text
)
values (
  1,
  'SFAKTOR GAMES',
  'contact@sfaktorgames.com',
  'WE CREATE WORLDS.',
  'SFAKTOR GAMES develops memorable games for mobile and PC.',
  'SFAKTOR GAMES is an independent game studio focused on creating memorable experiences.'
)
on conflict (id) do nothing;

-- =========================
-- STORAGE
-- =========================

insert into storage.buckets (
  id,
  name,
  public
)
values (
  'site-assets',
  'site-assets',
  true
)
on conflict (id)
do update set public = true;

drop policy if exists "Public view site assets" on storage.objects;
drop policy if exists "Authenticated upload site assets" on storage.objects;
drop policy if exists "Authenticated update site assets" on storage.objects;
drop policy if exists "Authenticated delete site assets" on storage.objects;

drop policy if exists "Admin upload site assets" on storage.objects;
drop policy if exists "Admin update site assets" on storage.objects;
drop policy if exists "Admin delete site assets" on storage.objects;

-- herkes görselleri görebilir
create policy "Public view site assets"
on storage.objects
for select
using (
  bucket_id = 'site-assets'
);

-- sadece admin görsel yükleyebilir
create policy "Admin upload site assets"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-assets'
  and auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);

create policy "Admin update site assets"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'site-assets'
  and auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
)
with check (
  bucket_id = 'site-assets'
  and auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);

create policy "Admin delete site assets"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'site-assets'
  and auth.jwt() ->> 'email' = 'admin@sfaktorgames.com'
);
