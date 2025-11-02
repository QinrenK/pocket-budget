# 💰 Pocket Budget PWA

> Ultra-fast expense tracking with bilingual (English/中文) support, offline-first architecture, and sub-6-second logging.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

## ✨ Features

- 🚀 **Lightning Fast**: Add expenses in under 6 seconds
- 🌐 **Bilingual**: Full English and Simplified Chinese support
- 📱 **PWA**: Install on iPhone, Android, and desktop
- 📸 **Receipt OCR**: Snap photos and extract totals automatically
- 🔒 **Privacy First**: Your data stays yours with RLS security
- 📡 **Offline Mode**: Works without internet, syncs when online
- 🎯 **Smart Categories**: Auto-categorization with vendor/keyword matching
- 💵 **Multi-Currency**: CAD, USD, CNY with symbol support
- 📊 **Budget Tracking**: Set monthly budgets per category
- 📤 **Export**: Download your data as CSV anytime

## 🎯 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or pnpm
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pocket-budget.git
cd pocket-budget

# Install dependencies
npm install

# Copy environment template
cp .env.local.sample .env.local

# Edit .env.local with your Supabase credentials
# Get them from: https://supabase.com/dashboard/project/_/settings/api
```

### Setup Supabase

1. Create a new Supabase project at https://supabase.com
2. Run the migration to create tables:
   ```bash
   # Copy contents of supabase/migrations/001_initial_schema.sql
   # Paste into Supabase SQL Editor and run
   ```
3. Run seed data for default categories:
   ```bash
   # Copy contents of supabase/seed.sql
   # Paste into Supabase SQL Editor and run
   ```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

## 📖 Usage Examples

### Quick Text Entry

```
15 beef, 12.9 carrot          → Grocery · $27.90
牛肉 15, 胡萝卜 12.9           → Grocery · ¥27.90
uber 18.45                    → Transport · $18.45
starbucks latte 4.50          → Dining · $4.50
C$25.00 gas                   → Transport · C$25.00
```

### Supported Formats

- **Number + Text**: `12.9 carrot`, `18.45 uber`
- **Text + Number**: `carrot 12.9`, `牛肉 15`
- **Multiple Items**: `15 beef, 12.9 carrot；牛奶 4.5`
- **Currency Symbols**: `$12.90`, `¥35.00`, `C$5.00`, `CAD 5.00`, `RMB 35.00`

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL with RLS)
- **Auth**: Supabase Auth (Magic Link + OAuth)
- **Storage**: Supabase Storage (receipt images)
- **OCR**: Tesseract.js (client-side, privacy-first)
- **Offline**: IndexedDB + Service Workers
- **Deployment**: Vercel

### Project Structure

```
pocket-budget/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home - quick entry
│   │   ├── history/        # Transaction history
│   │   ├── categories/     # Category management
│   │   ├── budgets/        # Budget tracking
│   │   ├── settings/       # User settings
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── lib/                # Core utilities
│   │   ├── parser.ts       # Text parsing engine
│   │   ├── categorizer.ts  # Category matching
│   │   ├── ocr.ts          # Receipt OCR
│   │   └── supabase/       # Database client
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript types
├── supabase/
│   ├── migrations/         # Database schema
│   └── seed.sql            # Default categories
├── public/
│   ├── manifest.json       # PWA manifest
│   └── icons/              # App icons
└── tests/                  # Unit + E2E tests
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📱 PWA Installation

### iPhone (Safari)

1. Open app in Safari
2. Tap Share button (box with arrow)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)

1. Open app in Chrome
2. Tap menu (three dots)
3. Tap "Add to Home screen"
4. Tap "Add"

### Desktop

1. Open app in Chrome/Edge
2. Look for install icon in address bar
3. Click "Install"

## 🔒 Security

- **Row Level Security**: All data isolated per user
- **No API Keys in Client**: Service role key only on server
- **Input Validation**: Zod schemas on all endpoints
- **Rate Limiting**: 120 requests/min per user
- **XSS Prevention**: Sanitized user inputs
- **Account Deletion**: Complete data removal

## 📊 Performance Targets

- ✅ First Load (cold): < 2.5s on 4G
- ✅ Interactive: < 1s after first paint
- ✅ Add Expense: < 400ms (good network)
- ✅ Offline Capable: 100% functionality

## 🌍 Internationalization

Currently supports:
- 🇺🇸 English
- 🇨🇳 Simplified Chinese (简体中文)

Both languages work simultaneously in parsing:
- `15 beef, 牛肉 12.9` → automatically categorizes

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR engine
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment platform

## 📮 Support

- 📧 Email: support@pocketbudget.app
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/pocket-budget/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/pocket-budget/discussions)

---

**Built with ❤️ for fast, private expense tracking**

