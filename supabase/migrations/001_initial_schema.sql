-- Pocket Budget Database Schema
-- Description: Complete schema for expense tracking with bilingual support
-- Author: Pocket Budget Team
-- Date: 2025-11-02

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  currency text default 'CAD' check (currency in ('CAD', 'USD', 'CNY')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.profiles is 'User profile information and preferences';
comment on column public.profiles.currency is 'User preferred currency: CAD, USD, or CNY';

-- ============================================================================
-- CATEGORIES TABLE
-- ============================================================================
create table if not exists public.categories (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  keywords_en text[] default '{}',
  keywords_zh text[] default '{}',
  icon text default '📦',
  color text default '#8A8A8A',
  is_system boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint unique_category_per_user unique (user_id, name)
);

comment on table public.categories is 'Expense categories with bilingual keyword matching';
comment on column public.categories.keywords_en is 'English keywords for auto-categorization';
comment on column public.categories.keywords_zh is 'Chinese (简体) keywords for auto-categorization';
comment on column public.categories.is_system is 'True for default categories, false for user-created';

-- Index for faster category lookups
create index idx_categories_user_id on public.categories(user_id);
create index idx_categories_keywords_en on public.categories using gin(keywords_en);
create index idx_categories_keywords_zh on public.categories using gin(keywords_zh);

-- ============================================================================
-- VENDOR_RULES TABLE
-- ============================================================================
create table if not exists public.vendor_rules (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  vendor text not null,
  category_id bigint references public.categories(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint unique_vendor_per_user unique (user_id, vendor)
);

comment on table public.vendor_rules is 'User-defined vendor to category mappings';
comment on column public.vendor_rules.vendor is 'Vendor name (case-insensitive matching)';

-- Index for vendor lookups
create index idx_vendor_rules_user_id on public.vendor_rules(user_id);
create index idx_vendor_rules_vendor on public.vendor_rules(vendor);

-- ============================================================================
-- TRANSACTIONS TABLE
-- ============================================================================
create table if not exists public.transactions (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  ts timestamptz not null default now(),
  source text check (source in ('text', 'receipt')) default 'text',
  raw_text text,
  amount numeric(12,2) not null check (amount > 0),
  items jsonb default '[]',
  category_id bigint references public.categories(id) on delete set null,
  vendor text,
  note text,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.transactions is 'User expense transactions';
comment on column public.transactions.ts is 'Transaction timestamp (user-entered or receipt date)';
comment on column public.transactions.source is 'Entry method: text or receipt';
comment on column public.transactions.items is 'Parsed items: [{name: string, amount: number}]';
comment on column public.transactions.image_url is 'Receipt image URL in Supabase Storage';

-- Indexes for transaction queries
create index idx_transactions_user_id on public.transactions(user_id);
create index idx_transactions_ts on public.transactions(ts desc);
create index idx_transactions_category on public.transactions(category_id);
create index idx_transactions_user_ts on public.transactions(user_id, ts desc);

-- ============================================================================
-- BUDGETS TABLE
-- ============================================================================
create table if not exists public.budgets (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  month text not null, -- Format: 'YYYY-MM'
  category_id bigint references public.categories(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint unique_budget_per_month_category unique (user_id, month, category_id)
);

comment on table public.budgets is 'Monthly budget limits per category';
comment on column public.budgets.month is 'Budget month in YYYY-MM format';

-- Index for budget lookups
create index idx_budgets_user_id on public.budgets(user_id);
create index idx_budgets_month on public.budgets(month);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.vendor_rules enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

-- Categories policies
create policy "Users can view own categories"
  on public.categories for select
  using (auth.uid() = user_id);

create policy "Users can create own categories"
  on public.categories for insert
  with check (auth.uid() = user_id);

create policy "Users can update own categories"
  on public.categories for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own categories"
  on public.categories for delete
  using (auth.uid() = user_id);

-- Vendor rules policies
create policy "Users can view own vendor rules"
  on public.vendor_rules for select
  using (auth.uid() = user_id);

create policy "Users can create own vendor rules"
  on public.vendor_rules for insert
  with check (auth.uid() = user_id);

create policy "Users can update own vendor rules"
  on public.vendor_rules for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own vendor rules"
  on public.vendor_rules for delete
  using (auth.uid() = user_id);

-- Transactions policies
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can create own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Budgets policies
create policy "Users can view own budgets"
  on public.budgets for select
  using (auth.uid() = user_id);

create policy "Users can create own budgets"
  on public.budgets for insert
  with check (auth.uid() = user_id);

create policy "Users can update own budgets"
  on public.budgets for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own budgets"
  on public.budgets for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_categories_updated_at before update on public.categories
  for each row execute function public.update_updated_at_column();

create trigger update_vendor_rules_updated_at before update on public.vendor_rules
  for each row execute function public.update_updated_at_column();

create trigger update_transactions_updated_at before update on public.transactions
  for each row execute function public.update_updated_at_column();

create trigger update_budgets_updated_at before update on public.budgets
  for each row execute function public.update_updated_at_column();

-- Function to create default profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- STORAGE BUCKETS FOR RECEIPT IMAGES
-- ============================================================================

-- Create storage bucket for receipts (run this in Supabase Dashboard > Storage)
-- insert into storage.buckets (id, name, public) values ('receipts', 'receipts', false);

-- Storage policies (enable after creating bucket)
-- create policy "Users can upload own receipts"
--   on storage.objects for insert
--   with check (bucket_id = 'receipts' and auth.uid()::text = (storage.foldername(name))[1]);

-- create policy "Users can view own receipts"
--   on storage.objects for select
--   using (bucket_id = 'receipts' and auth.uid()::text = (storage.foldername(name))[1]);

-- create policy "Users can delete own receipts"
--   on storage.objects for delete
--   using (bucket_id = 'receipts' and auth.uid()::text = (storage.foldername(name))[1]);

