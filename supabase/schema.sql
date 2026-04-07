-- ============================================================
-- Vestigh — full schema
-- Run this once in your Supabase SQL editor.
-- Safe to re-run (all statements are idempotent).
-- ============================================================


-- ── 1. Stores ────────────────────────────────────────────────

create table if not exists public.stores (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  owner_name    text        not null,
  owner_email   text        not null,
  owner_phone   text,
  plan          text        not null default 'free'
                            check (plan in ('free', 'pro')),
  status        text        not null default 'pending'
                            check (status in ('active', 'inactive', 'pending')),
  subdomain     text        not null unique,
  custom_domain text,
  commitment    text        check (commitment in ('3', '6', '12')),
  notes         text,
  -- URL of the store's own edge function — Vestigh proxies verified Paystack events here
  webhook_url   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists stores_updated_at on public.stores;
create trigger stores_updated_at
  before update on public.stores
  for each row execute function public.set_updated_at();

alter table public.stores enable row level security;

drop policy if exists "Authenticated users can do everything" on public.stores;
create policy "Authenticated users can do everything"
  on public.stores for all to authenticated
  using (true) with check (true);


-- ── 2. Payments ──────────────────────────────────────────────

create table if not exists public.payments (
  id                 uuid        primary key default gen_random_uuid(),

  -- Which store this payment belongs to (null if store can't be identified)
  store_id           uuid        references public.stores(id) on delete set null,

  -- Paystack event fields
  paystack_reference text        not null,
  event_type         text        not null,         -- e.g. 'charge.success'
  amount             bigint      not null,          -- in lowest denomination (pesewas/kobo)
  currency           text        not null default 'GHS',
  customer_email     text,
  customer_name      text,
  channel            text,                          -- 'card', 'mobile_money', etc.
  status             text        not null,          -- 'success', 'failed', etc.
  metadata           jsonb,                         -- data.metadata from Paystack payload
  raw_payload        jsonb       not null,          -- full raw webhook body

  -- Proxy tracking
  proxy_url          text,
  proxy_status       integer,
  proxy_response     text,                          -- first 1000 chars of proxy response
  proxied_at         timestamptz,

  created_at         timestamptz not null default now(),

  -- Paystack retries the same event: upsert on conflict, don't duplicate
  unique (paystack_reference, event_type)
);

create index if not exists payments_store_id_idx   on public.payments (store_id);
create index if not exists payments_created_at_idx on public.payments (created_at desc);

alter table public.payments enable row level security;

-- Edge function uses service role → bypasses RLS automatically.
-- Authenticated admin users can read all payments.
drop policy if exists "Admins can read payments" on public.payments;
create policy "Admins can read payments"
  on public.payments for select to authenticated
  using (true);
