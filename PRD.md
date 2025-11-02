1. Product overview
Name: Pocket Budget PWA
Platforms: iPhone Safari (Add to Home Screen), Mac desktop browsers, modern Android/desktop browsers
Core idea: A single-screen experience to log expenses by quick text or receipt photo, auto-sum and auto-categorize, show today/week/month totals at a glance, and sync securely.
Primary audience: Individuals who want ultra-fast logging with minimal taps and optional family/friends “budget game” later.
2. Goals and non-goals
Goals
Zero-friction capture: one field for text, one camera button for receipts
Robust free-text parsing that supports English and Simplified Chinese, e.g.
15 beef, 12.9 carrot → Grocery 27.9
牛肉 15, 胡萝卜 12.9 → Grocery 27.9
uber 18.45 → Transport 18.45
On-device OCR for receipts, with confirm/edit before save
Fast, clear rollups (Today, Week, Month) with category breakdowns
Private by default with secure auth; scalable to multi-user
Works offline; syncs when online
Non-goals (MVP)
Bank account auto-sync
Advanced ML classification beyond keyword/vendor rules (we’ll allow a path to upgrade later)
Complex budgeting (MVP supports simple per-category monthly budgets; advanced scenarios are roadmap)
3. Personas and top user stories
Solo user
As a user, I want to add an expense in under 5 seconds by typing “15 beef, 12.9 carrot.”
As a user, I want to snap a receipt, have the app suggest the total, and let me confirm.
As a user, I want to see today/week/month totals and where I’m spending the most.
Family/friends (later)
As a user, I want to invite others and compare progress against monthly budgets.
4. Success metrics (MVP)
Median time to log an expense ≤ 6 seconds
≥ 90% of text entries correctly parsed into total amount
≥ 80% of entries pre-categorized (user can override)
≤ 1% error rate in save operations over 30 days
At least 50% repeat logging on day 3 and day 7 for pilot users
5. Information architecture
Home: input area, camera button, primary KPIs (Today, Week, Month), recent transactions
History: searchable, filter by date range and category, inline edit
Categories: user keyword rules (English + 中文), vendor mapping
Budgets: optional monthly per-category amounts
Settings: profile, language inputs help, currency, export, privacy, delete account
6. UX flows (high level)
A. Quick text entry
Tap app icon → Home loads instantly (PWA cached)
Focus auto-in state on input field
Type or dictate: 15 beef, 12.9 carrot or 牛肉 15, 胡萝卜 12.9
Press Add → parser returns items and total → category is inferred
Inline toast “Added Grocery · 27.90. Today 54.20”
Empty/error states
If no numbers detected → gentle prompt: “I couldn’t find an amount. Try ‘latte 4.50’ 或 ‘拿铁 4.50’”
If multiple totals detected → “Pick a total” sheet with candidates
B. Receipt entry
Tap camera icon → choose Photo/Camera
On-device OCR fetches text, shows preview with detected numbers
App highlights suggested total (largest plausible total near bottom lines, or “Total/合计/金额” proximity)
User confirms or taps another detected amount
Category suggestion appears; user can change
Save → toast with updated KPIs
C. Category refine (one-tap)
After save, a small pill “Grocery” is shown; tapping it opens a quick chooser
Changes update immediately and persist for future vendor mapping
D. Offline
Saves to IndexedDB queue if offline; UI shows “Saved offline” badge
Syncs automatically when online; reconciles duplicates by client uuid
7. UI design guidelines
One-screen priority: Large text box at top, immediately focused
Top chips: Today, Week, Month; each chip shows total; active period highlighted
Primary buttons: “Add” (prominent), Camera (secondary)
List: Recent 10 entries with amount right-aligned; category pill and note below
Typography: System font stack; numeric tabular lining for amounts
Motion: Subtle fade/slide on save; never block the input field
Accessibility: WCAG AA; sufficient contrast; large tap targets (≥44pt)
International inputs: Hints show dual examples EN/中文; input method editor friendly; never strip CJK chars
8. Language and input rules (EN + 简体中文)
Permitted formats:
number + text: 12.9 carrot, 18.45 uber, 12.9 胡萝卜
text + number: carrot 12.9, 牛肉 15
multiple separated by comma/Chinese comma/semicolon: 15 beef, 12.9 carrot；牛奶 4.5
currency: $12.90, ¥35.00, C$5.00, CAD 5.00, RMB 35.00
Chinese keys recognized for totals: 合计, 总计, 应付, 金额, RMB, 小计
Decimal separators: dot (.) expected; if comma detected in a European style, show confirm dialog
9. Categorization logic (max capability without ML)
Order of inference:
Vendor mapping: exact/substring match against stored vendor names (EN/中文), e.g., “Costco”, “No Frills”, “星巴克”
Keyword rules: per-user list of keywords mapped to categories; supports EN and 中文 arrays per category
Example:
Grocery: [beef, chicken, carrot, milk, costco, no frills, 牛肉, 鸡胸, 胡萝卜, 牛奶]
Dining: [latte, coffee, cafe, 星巴克, 咖啡]
Transport: [uber, bus, subway, metro, 油费, 出租车, 滴滴]
Heuristics: if multiple categories match, choose the one with highest hit count; tie-break by vendor match, then by recent user overrides
User override: one tap to change; we store (vendor → category) and (keyword → category) so next time it auto-applies
Fallback: Uncategorized with unobtrusive prompt to set category
10. Data model (Supabase Postgres)
-- auth.users holds users

create table profiles (
  user_id uuid primary key references auth.users(id),
  display_name text,
  currency text default 'CAD' -- or 'USD'/'CNY'
);

create table categories (
  id bigserial primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,                        -- e.g., Grocery
  keywords_en text[] default '{}',           -- ['beef','milk','costco']
  keywords_zh text[] default '{}',           -- ['牛肉','牛奶','超市']
  is_system boolean default false            -- seed defaults per new user
);

create table vendor_rules (
  id bigserial primary key,
  user_id uuid references auth.users(id) not null,
  vendor text not null,                      -- 'Costco', '星巴克'
  category_id bigint references categories(id)
);

create table transactions (
  id bigserial primary key,
  user_id uuid references auth.users(id) not null,
  ts timestamptz not null default now(),
  source text,                               -- 'text' | 'receipt'
  raw_text text,
  amount numeric(12,2) not null,
  items jsonb,                               -- [{name, amount}]
  category_id bigint references categories(id),
  vendor text,                               -- optional extracted vendor
  note text,
  image_url text                             -- receipt image in Supabase Storage
);

create table budgets (
  id bigserial primary key,
  user_id uuid references auth.users(id) not null,
  month text not null,                       -- '2025-11'
  category_id bigint references categories(id),
  amount numeric(12,2) not null
);

-- RLS
alter table categories enable row level security;
alter table vendor_rules enable row level security;
alter table transactions enable row level security;
alter table budgets enable row level security;

create policy "own_categories" on categories for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_vendor_rules" on vendor_rules for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_transactions" on transactions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_budgets" on budgets for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
11. APIs and edge functions
Auth
Supabase Auth: Magic link or Apple/Google. Store JWT in httpOnly cookies when possible.
Endpoints (Next.js App Router)
POST /api/ingest
Body: { raw_text: string, source?: 'text' | 'receipt', items?: [{name, amount}] (optional if raw_text given), note?: string, image_url?: string }
Logic: parse text → extract items/total → infer vendor/category → insert transaction → return { ok, total, categoryName, txId }
POST /api/ocr (optional server helper if needed)
Body: { image: base64 } → returns { text }
MVP uses client-side Tesseract.js; server route is for future managed OCR
GET /api/rollups?range=today|week|month
Returns totals and per-category sums for the range
Parsing (Edge Function or serverless route)
Steps:
Normalize separators: comma , ， semicolon ; ；
Tokenize into segments
Pattern 1: ^(\$|¥|C\$|CAD|RMB)?\d+(\.\d{1,2})?\s+(.+)$
Pattern 2: ^(.+?)\s+(\$|¥|C\$|CAD|RMB)?\d+(\.\d{1,2})?$
If none matched, collect all monetary numbers and surface a “choose total” UI
Detect vendor candidates from raw text using vendor_rules and a small dictionary of common store names (EN/中文)
Categorize via vendor_rules → keywords_en/keywords_zh
Return {items, total, vendor, category_id}
Rate limiting and safety
Per-user short burst limit (e.g., 120 requests/min) via Supabase rate limits or Vercel Edge rate limit
Input length caps (raw_text ≤ 8KB; image ≤ 8MB)
Server validation on amount, arrays, IDs
12. PWA and offline
Manifest.json: name, icons, display: 'standalone', theme color
Service Worker: cache shell (HTML, JS, CSS), image lazy cache, background sync for queued requests
IndexedDB: queue unsent transactions; upon online, POST to /api/ingest, then purge
13. Privacy and security
RLS policies enforce per-user isolation
Only store receipt images if the user confirms; allow per-image delete
Option to mask vendor in shared leaderboards (later)
Allow full account deletion (cascade delete)
14. Performance targets
First load (cache cold) < 2.5s on 4G
Interactive in < 1s after first paint
Add expense action end-to-end < 400ms (network good), < 800ms (typical)
15. Accessibility
Labels for all inputs, aria-live region for “Added” toast
Keyboard accessible controls
Voice dictation works in the input without focus traps
16. Analytics and telemetry
Events (privacy-respecting): add_text_expense, add_receipt_expense, category_override, budget_set, export_csv
No PII in analytics payloads; only generic timings and counts
17. Error handling
Parsing failure: show inline “Couldn’t detect an amount. Try ‘latte 4.50’ 或 ‘拿铁 4.50’”
OCR failure: show the raw recognized text area so user can edit; suggest confirm total
Network failure: save offline; show “Will sync when online”
Conflicts: de-dupe by hashing (user_id, ts_bucket, amount, vendor?)
18. Settings
Currency: CAD, USD, CNY; symbols shown on UI; parsing accepts $, ¥, CAD, RMB, C$
Language helpers: on/off hints for Chinese examples (UI kept in English)
Export: CSV for selected period; email link or instant download
Reset: clear local cache, sign out
19. Budget game (post-MVP)
Per-group monthly budget targets; invite via link
Leaderboard by “% under budget” and “streaks”
Weekly digest (email or in-app)
20. Seed data and defaults
Default categories created on first sign-in: Grocery, Dining, Transport, Shopping, Bills, Entertainment, Health, Other
Seed keyword arrays in both English and 中文 for each system category (user can edit)
21. QA checklist and acceptance criteria
Parsing
15 beef, 12.9 carrot → 27.9 Grocery
牛肉 15, 胡萝卜 12.9 → 27.9 Grocery
uber 18.45 → 18.45 Transport
Currency variations: $4.50, C$4.50, CAD 4.50, ¥35.00, RMB 35.00
Mixed delimiters: comma , Chinese comma ， semicolon ; Chinese semicolon ；
OCR
Clear receipt produces text; candidates show; selecting the right one saves correctly
Offline
Airplane mode: save → queued; reconnect → auto sync
Security
User A cannot fetch User B data (verify with API calls)
Performance
First load and add action within targets above
22. Technical stack and components
Frontend: Next.js 14 (App Router), TypeScript, React Server Components, PWA (workbox or custom SW), IndexedDB (idb)
Auth/DB/Storage: Supabase (Postgres + Auth + RLS + Storage)
OCR: Tesseract.js client-side; optional server/cloud OCR toggle
Styling: Tailwind CSS (or minimal CSS modules) with focus states and large tap targets
State: lightweight Zustand or React Query for server synchronization
Deployment: Vercel (frontend + edge routes), Supabase hosted DB and storage
23. Implementation plan (MVP ~1–2 weekends)
Supabase: create project, tables, RLS, seed default categories + keywords (EN/中文)
Next.js app: auth, layout shell, PWA manifest/SW
Home page: input, add flow, receipt upload + Tesseract, totals chips, recent list
Parse function: shared util; robust tests with EN/中文 fixtures
Categories page: keyword management EN/中文, vendor rules
Budgets: simple monthly per category and progress display
Offline queue: IndexedDB + background sync
Rollups endpoint and charts
QA, a11y, polish; add to Home Screen prompt; shareable URL