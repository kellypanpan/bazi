create table if not exists public.dodo_webhook_events (
  id text primary key,
  event_type text not null,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

create table if not exists public.premium_entitlements (
  user_id uuid not null,
  email text not null,
  plan_id text not null check (plan_id in ('essential', 'pro', 'annual')),
  status text not null check (status in ('active', 'cancelled', 'expired', 'failed')),
  source text,
  dodo_customer_id text,
  dodo_payment_id text,
  dodo_subscription_id text,
  product_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, plan_id)
);

create index if not exists premium_entitlements_user_id_idx
  on public.premium_entitlements (user_id);

alter table public.dodo_webhook_events enable row level security;
alter table public.premium_entitlements enable row level security;

drop policy if exists "Users can read their own premium entitlements" on public.premium_entitlements;
create policy "Users can read their own premium entitlements"
  on public.premium_entitlements
  for select
  using (auth.uid() = user_id);
