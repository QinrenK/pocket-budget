# 🚀 Deployment Guide - Pocket Budget

## Quick Start (5 Minutes)

### **Option 1: Deploy to Vercel (Recommended)**

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to project
cd /Users/kang/Proj-sh/PocketBudget

# 3. Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - What's your project's name? pocket-budget
# - In which directory is your code located? ./
# - Want to modify settings? No

# 4. Get your preview URL (e.g., https://pocket-budget-xxx.vercel.app)
```

### **Set Environment Variables**

After first deploy, add environment variables:

```bash
# Option A: Via Vercel Dashboard
# 1. Go to https://vercel.com/dashboard
# 2. Select your project
# 3. Go to Settings → Environment Variables
# 4. Add these variables:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Option B: Via CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### **Deploy to Production**

```bash
# After setting environment variables
vercel --prod

# Your production URL: https://pocket-budget.vercel.app
```

---

## 📋 Pre-Deployment Checklist

### **1. Environment Variables**
- [ ] Create `.env.local` from `.env.local.sample`
- [ ] Add Supabase URL
- [ ] Add Supabase Anon Key
- [ ] Add Supabase Service Role Key
- [ ] Test locally with real credentials

### **2. Database Setup**
- [ ] Run migrations: `001_initial_schema.sql`
- [ ] Insert categories: `INSERT_CATEGORIES_USER.sql`
- [ ] Verify RLS policies are active
- [ ] Test authentication flow

### **3. Local Testing**
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test all features:
# - Login/Signup
# - Add transaction
# - View dashboard
# - Test offline mode
# - Check PWA install
```

### **4. Build Verification**
```bash
# Test production build
npm run build
npm start

# Verify no build errors
# Check console for warnings
```

---

## 🔧 Deployment Options

### **Option 1: Vercel (Easiest)**

**Pros:**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ Free for personal projects
- ✅ Perfect for Next.js

**Setup:**
```bash
# Deploy via CLI
vercel

# Or connect GitHub:
# 1. Go to vercel.com
# 2. Import Git Repository
# 3. Select pocket-budget
# 4. Configure environment variables
# 5. Deploy
```

---

### **Option 2: Netlify**

**Pros:**
- ✅ Free hosting
- ✅ Easy Git integration
- ✅ Good for static sites

**Setup:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Build command: npm run build
# Publish directory: .next
```

---

### **Option 3: Self-Hosted (VPS/Cloud)**

**Requirements:**
- Node.js 18+
- PM2 or similar process manager
- Nginx or Apache (reverse proxy)
- SSL certificate (Let's Encrypt)

**Setup:**
```bash
# 1. Clone repository
git clone https://github.com/QinrenK/pocket-budget.git
cd pocket-budget

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.local.sample .env.local
# Edit .env.local with your credentials

# 4. Build
npm run build

# 5. Start with PM2
pm2 start npm --name "pocket-budget" -- start
pm2 save
pm2 startup

# 6. Configure Nginx reverse proxy
# Example Nginx config:
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 7. Setup SSL with Certbot
sudo certbot --nginx -d your-domain.com
```

---

## 🌐 Custom Domain Setup

### **Vercel**
```bash
# 1. Go to Project Settings → Domains
# 2. Add your domain (e.g., pocket-budget.app)
# 3. Configure DNS:

# Option A: Using Vercel nameservers
# Update at your domain registrar

# Option B: Using CNAME
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com
```

### **DNS Records**
```
# For Vercel
A Record:    @     → 76.76.21.21
CNAME:       www   → cname.vercel-dns.com

# For custom setup
A Record:    @     → Your_Server_IP
CNAME:       www   → your-domain.com
```

---

## 📱 Post-Deployment Testing

### **1. PWA Installation Test**

**Desktop (Chrome):**
```
1. Open https://your-domain.com
2. Wait 3 seconds for install prompt
3. Click "Install App"
4. Verify app opens in standalone window
5. Test offline mode (DevTools → Network → Offline)
```

**Mobile (Android):**
```
1. Open in Chrome
2. Wait for install banner
3. Tap "Install"
4. App appears on home screen
5. Test offline functionality
```

**Mobile (iOS):**
```
1. Open in Safari
2. Tap Share button
3. "Add to Home Screen"
4. Confirm installation
5. Test offline mode (Airplane mode)
```

### **2. Lighthouse Audit**
```bash
# Run Lighthouse in Chrome DevTools
# Expected scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 100 ✓
```

### **3. Feature Testing Checklist**
- [ ] User registration/login
- [ ] Add transaction (text input)
- [ ] View transactions on home page
- [ ] Navigate to History
- [ ] Filter by date range
- [ ] Filter by category
- [ ] View Dashboard
- [ ] Interactive pie chart
- [ ] Date range picker
- [ ] Settings page access
- [ ] Offline mode (queue transaction)
- [ ] Auto-sync when online
- [ ] PWA install prompt
- [ ] Standalone app launch
- [ ] Service worker caching

---

## 🐛 Troubleshooting

### **Issue: Build Fails**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### **Issue: Environment Variables Not Working**
```bash
# Verify variables are set
vercel env ls

# Pull environment variables locally
vercel env pull

# Redeploy after adding variables
vercel --prod
```

### **Issue: PWA Not Installing**
```
1. Check manifest.json is accessible
2. Verify service worker is registered
3. Ensure site is HTTPS (required for PWA)
4. Check browser console for errors
5. Clear browser cache and try again
```

### **Issue: Database Connection Fails**
```
1. Verify Supabase URL is correct
2. Check API keys are valid
3. Ensure RLS policies allow access
4. Test connection in Supabase dashboard
5. Check network requests in DevTools
```

### **Issue: Icons Not Loading**
```bash
# Verify icons exist
ls -la public/icons/

# Should see:
# icon-72.png through icon-512.png
# apple-touch-icon.png
# favicon.ico

# If missing, regenerate:
cd PocketBudgetIcon/web
cp *.png ../../public/icons/
```

---

## 🔒 Security Checklist

### **Before Production**
- [ ] Never commit `.env.local` (in `.gitignore`)
- [ ] Use environment variables for secrets
- [ ] Enable RLS on all Supabase tables
- [ ] Verify API routes are authenticated
- [ ] Check CORS settings
- [ ] Review security headers
- [ ] Enable Vercel/Netlify security features
- [ ] Setup domain SSL/HTTPS
- [ ] Test authentication flows
- [ ] Review Supabase auth settings

---

## 📊 Monitoring & Analytics

### **Setup Vercel Analytics**
```bash
# Install package
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### **Performance Monitoring**
- Vercel Analytics (free tier)
- Google Analytics (optional)
- Supabase Dashboard (database metrics)
- Service Worker cache stats

---

## 🚀 Continuous Deployment

### **Auto-Deploy from Git**

**Vercel:**
```bash
# 1. Connect GitHub repo in Vercel dashboard
# 2. Configure build settings
# 3. Every push to main → auto-deploy
# 4. Pull requests → preview deployments
```

**Setup Git Hooks:**
```bash
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📈 Scaling Considerations

### **Performance Optimization**
```bash
# Enable production optimizations
# next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  images: {
    domains: ['your-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### **Database Optimization**
- Index frequently queried columns
- Use connection pooling (Supabase does this)
- Implement rate limiting on API routes
- Cache dashboard queries (Redis optional)

---

## 🎉 Launch Checklist

### **Final Steps Before Launch**
- [ ] Test on production URL
- [ ] Test on multiple devices (iOS, Android, Desktop)
- [ ] Verify PWA install on all platforms
- [ ] Test offline functionality thoroughly
- [ ] Run Lighthouse audit (score > 90)
- [ ] Check all links work
- [ ] Verify authentication flows
- [ ] Test with real transaction data
- [ ] Setup error monitoring
- [ ] Prepare announcement/launch materials
- [ ] Share with beta testers (if any)
- [ ] Monitor first users closely
- [ ] Collect feedback
- [ ] Iterate based on user input

---

## 📞 Support & Resources

### **Documentation**
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.io/docs
- PWA Docs: https://web.dev/progressive-web-apps/

### **Community**
- Next.js Discord
- Vercel Discord
- Supabase Discord
- GitHub Issues (your repo)

---

## 🎯 Success Metrics

Track these after launch:
- Daily Active Users (DAU)
- PWA Install Rate
- Transaction creation rate
- Offline usage percentage
- Page load times
- Error rates
- User retention (7-day, 30-day)

---

**Your app is ready for the world! 🌍**

**Deployment Command:**
```bash
vercel --prod
```

**Then test at:** `https://your-app.vercel.app`

Good luck with your launch! 🚀🎉

