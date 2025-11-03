# 🔐 Environment Variables Setup

## Issue: Build failing on Vercel

The build is failing because **environment variables are not configured** in Vercel yet.

---

## ✅ Solution: Add Environment Variables in Vercel Dashboard

### **Step 1: Go to Vercel Dashboard**
1. Visit: https://vercel.com/qinren-kangs-projects/pocket-budget
2. Click on **Settings** tab
3. Click on **Environment Variables** in the left sidebar

### **Step 2: Add These 3 Variables**

#### Variable 1: `NEXT_PUBLIC_SUPABASE_URL`
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase project URL
  - Format: `https://your-project-id.supabase.co`
  - Get it from: Supabase Dashboard → Project Settings → API
- **Environment**: Production, Preview, Development (check all 3)

#### Variable 2: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anonymous/public key
  - Get it from: Supabase Dashboard → Project Settings → API → `anon` / `public` key
- **Environment**: Production, Preview, Development (check all 3)

#### Variable 3: `SUPABASE_SERVICE_ROLE_KEY`
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Your Supabase service role key (KEEP SECRET!)
  - Get it from: Supabase Dashboard → Project Settings → API → `service_role` key
  - ⚠️ **WARNING**: This is a secret key with full database access
- **Environment**: Production, Preview, Development (check all 3)

---

## 📝 Where to Find Your Supabase Keys

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click on **⚙️ Settings** (bottom left)
4. Click on **API** in the left sidebar
5. You'll see:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys**:
     - `anon` `public` key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key → Use for `SUPABASE_SERVICE_ROLE_KEY`

---

## 🔄 Step 3: Redeploy

After adding all 3 environment variables:

### Option A: Through Vercel Dashboard
1. Go to **Deployments** tab
2. Click on the latest failed deployment
3. Click **Redeploy**

### Option B: Through CLI
```bash
cd /Users/kang/Proj-sh/PocketBudget
vercel --prod
```

---

## ✅ Expected Result

After adding environment variables and redeploying:
- ✅ Build should complete successfully
- ✅ Deployment URL will be active
- ✅ App will work with your Supabase database

---

## 🧪 Verify Deployment

Once deployed successfully:

1. **Visit your deployment URL**
   - Format: `https://pocket-budget-xxx.vercel.app`

2. **Test these features:**
   - [ ] Home page loads
   - [ ] Can navigate to Login
   - [ ] Can create account / login
   - [ ] Can add transaction
   - [ ] Transactions show on home page
   - [ ] Can navigate to History, Dashboard, Settings
   - [ ] PWA install prompt appears (wait 3 seconds)

---

## 🐛 Troubleshooting

### Build still fails after adding env vars?
```bash
# Check if variables are set correctly
vercel env ls

# Pull env vars locally to verify
vercel env pull .env.vercel

# Check the .env.vercel file
cat .env.vercel
```

### Database connection errors?
- Verify Supabase URL is correct
- Check that RLS policies are enabled
- Run the database migration: `001_initial_schema.sql`
- Run the categories seed: `INSERT_CATEGORIES_USER.sql`

### Build works locally but not on Vercel?
- Make sure all dependencies are in `package.json`
- Check Node.js version (should be 18+)
- Verify no local-only imports (`fs`, `path`, etc. in client components)

---

## 📞 Need Help?

If you continue to have issues:
1. Check the build logs in Vercel dashboard
2. Compare with local build output
3. Verify all env vars are set correctly
4. Check Supabase project is active

---

**Current Status: ⏳ Waiting for environment variables to be configured**

**Next Step: Add the 3 environment variables in Vercel dashboard, then redeploy**

