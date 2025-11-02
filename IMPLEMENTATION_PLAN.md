# Pocket Budget PWA - Implementation Plan

## 🎯 Project Overview
Building a production-ready, minimalist financial management PWA with bilingual (EN/中文) support, offline-first architecture, and sub-6-second expense logging.

## 📋 Implementation Phases

### Phase 1: Foundation (Days 1-2)
- [x] Repository setup with GitHub CLI
- [ ] Next.js 14 (App Router) + TypeScript + Tailwind CSS
- [ ] PWA configuration (manifest + service worker)
- [ ] Supabase database schema + RLS policies
- [ ] Seed data with default categories (EN/中文 keywords)
- [ ] Environment configuration

### Phase 2: Core Parsing & Categorization (Days 3-4)
- [ ] Text parser with EN/中文 support
  - Currency normalization (CAD, USD, CNY, $, ¥, C$, RMB)
  - Multi-format support (number+text, text+number, mixed)
  - Delimiter handling (comma, Chinese comma, semicolon)
- [ ] Categorization engine
  - Vendor mapping (exact + substring match)
  - Keyword matching (EN/中文 arrays)
  - Heuristics for tie-breaking
- [ ] Comprehensive unit tests (90%+ coverage target)

### Phase 3: Authentication & Core UI (Days 4-5)
- [ ] Supabase Auth integration (Magic Link + OAuth)
- [ ] Protected routes with middleware
- [ ] Home page with auto-focused input
- [ ] Period chips (Today/Week/Month) with totals
- [ ] Recent transactions list
- [ ] Toast notification system

### Phase 4: Transaction Management (Days 5-6)
- [ ] POST /api/ingest endpoint
- [ ] GET /api/rollups endpoint
- [ ] Real-time parsing preview
- [ ] Category picker component
- [ ] Transaction validation + rate limiting
- [ ] Error handling with graceful degradation

### Phase 5: Receipt OCR (Days 6-7)
- [ ] Tesseract.js integration (client-side)
- [ ] Image preprocessing pipeline
- [ ] Chinese total keyword detection (合计, 总计, 应付, 金额, 小计)
- [ ] Multi-candidate selection UI
- [ ] Receipt image storage (Supabase Storage)
- [ ] Web Worker for non-blocking OCR

### Phase 6: Offline & PWA (Days 7-8)
- [ ] Service worker with cache strategies
- [ ] IndexedDB offline queue
- [ ] Background sync implementation
- [ ] Online/offline status indicators
- [ ] Conflict resolution logic
- [ ] Add to Home Screen prompt (iOS Safari optimized)

### Phase 7: Management Pages (Days 8-9)
- [ ] History page with filters
- [ ] Categories management (CRUD + keyword editor)
- [ ] Vendor rules management
- [ ] Budgets setup and progress tracking
- [ ] Settings (currency, profile, export, account deletion)

### Phase 8: Polish & QA (Days 9-10)
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Performance optimization (< 2.5s cold load)
- [ ] E2E tests (Playwright)
- [ ] iOS Safari testing
- [ ] Error tracking setup
- [ ] Analytics instrumentation

## 🚨 Critical Success Factors

### Parser Robustness (90%+ accuracy target)
**Test Cases:**
- `15 beef, 12.9 carrot` → 27.9 Grocery
- `牛肉 15, 胡萝卜 12.9` → 27.9 Grocery
- `uber 18.45` → 18.45 Transport
- `$4.50, C$4.50, CAD 4.50, ¥35.00, RMB 35.00`
- Mixed delimiters: `,，;；`

**Edge Cases:**
- Mixed EN/中文: `星巴克 coffee 4.50`
- Multiple amounts: `15.5 beef 12.9 carrot` (show picker)
- Currency conflicts: `C$5 CAD 10` (prioritize first)
- No amounts detected: Show gentle error with examples
- Chinese numerals: Consider `十五` → `15` (Phase 2 enhancement)

### Performance Targets
- **First load (cold)**: < 2.5s on 4G
- **Interactive**: < 1s after first paint
- **Add expense**: < 400ms (good network), < 800ms (typical)
- **Median interaction**: ≤ 6 seconds end-to-end

### Offline Resilience
- All transactions saved to IndexedDB if offline
- Background sync when online
- Duplicate prevention via UUID
- Conflict resolution by timestamp

### Mobile Safari PWA
- iOS 16.4+ compatibility
- Standalone mode optimization
- Camera permissions in PWA context
- IndexedDB quota management
- Add to Home Screen detection

## 🏗️ Architecture Decisions

### Frontend Stack
- **Framework**: Next.js 14 (App Router) with React Server Components
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design tokens
- **State**: Zustand (lightweight) + React Query (server state)
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest (unit) + Playwright (E2E)

### Backend Stack
- **Database**: Supabase Postgres with Row Level Security
- **Auth**: Supabase Auth (Magic Link + OAuth)
- **Storage**: Supabase Storage for receipt images
- **API**: Next.js API Routes (Edge Runtime where possible)
- **Deployment**: Vercel (frontend + edge functions)

### Libraries
- **OCR**: Tesseract.js (client-side, privacy-first)
- **Offline**: idb (IndexedDB wrapper), Workbox (service worker)
- **Validation**: Zod (runtime type safety)
- **Currency**: Custom formatter with Intl.NumberFormat
- **Dates**: date-fns (lightweight, tree-shakeable)

## 📊 Data Model

### Tables
1. **profiles**: user_id, display_name, currency (CAD/USD/CNY)
2. **categories**: id, user_id, name, keywords_en[], keywords_zh[], is_system
3. **vendor_rules**: id, user_id, vendor, category_id
4. **transactions**: id, user_id, ts, source, raw_text, amount, items[], category_id, vendor, note, image_url
5. **budgets**: id, user_id, month, category_id, amount

### Default Categories (Seed Data)
- Grocery: [beef, chicken, carrot, milk, costco, no frills, 牛肉, 鸡胸, 胡萝卜, 牛奶]
- Dining: [latte, coffee, cafe, restaurant, 星巴克, 咖啡, 餐厅]
- Transport: [uber, bus, subway, metro, gas, 油费, 出租车, 滴滴]
- Shopping: [amazon, clothing, electronics, 淘宝, 衣服, 电子]
- Bills: [rent, utilities, phone, internet, 房租, 水电, 手机费]
- Entertainment: [movie, netflix, spotify, game, 电影, 游戏]
- Health: [pharmacy, doctor, medicine, gym, 药店, 医生, 健身]
- Other: [] (fallback)

## 🔐 Security Considerations

1. **Row Level Security**: All tables enforce user_id = auth.uid()
2. **Input Validation**: Zod schemas on all API endpoints
3. **Rate Limiting**: 120 req/min per user via Vercel Edge
4. **XSS Prevention**: DOMPurify for user-generated content
5. **CSRF Protection**: Supabase handles CSRF tokens
6. **Image Upload**: 8MB limit, MIME type validation
7. **Account Deletion**: Cascade delete with confirmation

## 📱 PWA Features

### Manifest.json
```json
{
  "name": "Pocket Budget",
  "short_name": "Pocket Budget",
  "description": "Fast expense tracking with EN/中文 support",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0ea5e9",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Service Worker Strategy
- **Shell**: Cache-first (HTML, CSS, JS)
- **API**: Network-first with 5s timeout → cache fallback
- **Images**: Cache-first with 30-day expiry
- **Background Sync**: Queue failed requests, retry when online

## 🎨 UI/UX Principles

1. **One-Screen Priority**: Minimize navigation, maximize quick entry
2. **Auto-Focus**: Input field focused on load
3. **Large Tap Targets**: ≥44pt for mobile
4. **Subtle Motion**: Fade/slide animations, never block input
5. **Tabular Numbers**: Monospace for amounts alignment
6. **System Fonts**: -apple-system, BlinkMacSystemFont, "Segoe UI"
7. **WCAG AA**: 4.5:1 contrast ratio, semantic HTML, ARIA labels

## 📈 Success Metrics Instrumentation

```typescript
// Track via analytics (privacy-respecting, no PII)
events = {
  add_text_expense: { duration_ms, parse_success, category_auto },
  add_receipt_expense: { ocr_duration_ms, total_detected },
  category_override: { from, to },
  budget_set: { category, amount },
  export_csv: { date_range },
  offline_sync: { queue_size, success_count }
}
```

## 🧪 Testing Strategy

### Unit Tests (Vitest)
- Parser: 50+ test cases covering all formats
- Categorizer: Vendor + keyword matching logic
- Currency formatter: All supported currencies
- Offline queue: CRUD operations

### Integration Tests
- API routes: Ingest, rollups, auth callbacks
- Supabase: RLS policies enforcement
- Service worker: Cache strategies

### E2E Tests (Playwright)
- Quick text entry flow
- Receipt OCR flow
- Offline → online sync
- Category management
- Budget tracking

### Accessibility Tests
- Lighthouse CI
- axe-core automated checks
- Manual keyboard navigation
- Screen reader testing (VoiceOver, NVDA)

## 🚀 Deployment Strategy

### Vercel Configuration
- **Framework**: Next.js 14
- **Node Version**: 20.x
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Environment**: All Supabase keys in Vercel dashboard

### Performance Monitoring
- Vercel Analytics
- Sentry for error tracking
- Custom performance marks for critical user journeys

## 📝 Documentation Plan

1. **README.md**: Quick start, tech stack, deployment
2. **CONTRIBUTING.md**: Code style, PR process, testing
3. **API.md**: Endpoint documentation with examples
4. **PARSER.md**: Text parsing rules and test cases
5. **DEPLOYMENT.md**: Production deployment checklist

## 🎯 MVP Definition of Done

- [ ] User can sign up/login with magic link
- [ ] User can add text expense in < 6 seconds
- [ ] Parser handles 90%+ of test cases correctly
- [ ] Receipt OCR works with Chinese keywords
- [ ] Today/Week/Month totals display correctly
- [ ] Works offline, syncs when online
- [ ] Category override persists for future
- [ ] Budgets track per-category monthly limits
- [ ] Export to CSV works
- [ ] Passes WCAG AA audit
- [ ] < 2.5s cold load on 4G
- [ ] iOS Safari Add to Home Screen works
- [ ] All E2E tests pass

## 📅 Timeline Estimate

**Total: 10-12 days of focused development**

Week 1: Foundation + Core Logic
- Days 1-2: Setup + Schema
- Days 3-4: Parser + Categorizer
- Days 5-6: Auth + Home Page + API

Week 2: Features + Polish
- Days 7-8: OCR + Offline
- Days 9-10: Management Pages
- Days 11-12: Testing + Deployment

## 🎬 Next Steps

1. ✅ Initialize Git repository
2. ✅ Create project structure
3. ⏳ Setup Next.js with all configs
4. ⏳ Create Supabase project + migrations
5. ⏳ Implement parser with tests

