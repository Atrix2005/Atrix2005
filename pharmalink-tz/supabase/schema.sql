-- PharmaLink TZ — database schema
-- Run this in the Supabase SQL editor (or `supabase db push`).

-- ── Reference tables ──────────────────────────────────────────────
create table if not exists suppliers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  country     text not null,
  created_at  timestamptz not null default now()
);

create table if not exists pharmacies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  city        text not null,
  region      text,
  created_at  timestamptz not null default now()
);

create table if not exists medicines (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null
);

-- ── Live stock levels (per pharmacy, per category) ────────────────
create table if not exists stock_levels (
  id           uuid primary key default gen_random_uuid(),
  pharmacy_id  uuid references pharmacies(id) on delete cascade,
  category     text not null,
  level        int  not null check (level between 0 and 100),
  recorded_at  timestamptz not null default now()
);

-- ── Orders ────────────────────────────────────────────────────────
create type order_status as enum ('placed', 'shipped', 'in_transit', 'delivered', 'cancelled');

create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),
  pharmacy_id   uuid references pharmacies(id) on delete set null,
  supplier      text not null,
  medicine      text not null,
  quantity      int  not null check (quantity > 0),
  status        order_status not null default 'placed',
  created_at    timestamptz not null default now()
);

-- ── Cargo ships (positions can be refreshed from an AIS feed) ──────
create table if not exists ships (
  id           bigint primary key,
  name         text not null,
  lat          double precision not null,
  lng          double precision not null,
  port         text,
  status       text,
  cargo        text,
  eta          text,
  updated_at   timestamptz not null default now()
);

-- ── Realtime + read access ────────────────────────────────────────
alter table orders        enable row level security;
alter table stock_levels  enable row level security;
alter table ships         enable row level security;

-- Demo policies: allow anonymous read; restrict writes as you add auth.
create policy "public read orders"  on orders       for select using (true);
create policy "public read stock"   on stock_levels for select using (true);
create policy "public read ships"   on ships        for select using (true);
create policy "anon insert orders"  on orders       for insert with check (true);
