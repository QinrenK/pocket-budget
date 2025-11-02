# 🚀 Pocket Budget - Setup Guide

## Quick Start (5 minutes)

### 1. Clone and Install

```bash
git clone https://github.com/QinrenK/pocket-budget.git
cd pocket-budget
npm install
```

### 2. Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Project name**: pocket-budget
   - **Database Password**: (generate strong password, save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"** and wait ~2 minutes

### 3. Run Database Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click **"Run"**
5. You should see ✓ Success

### 4. Setup Environment Variables

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy **Project URL** and **anon public** key
3. Create `.env.local` in project root:

```bash
cp .env.local.sample .env.local
```

4. Edit `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Configure Authentication

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add to **Redirect URLs**:
   - `http://localhost:3000/api/auth/callback`
   - (Later add your production URL)

3. Go to **Authentication** → **Email Templates**
4. Customize **Magic Link** template (optional)

### 6. Create Storage Bucket (Optional, for receipts)

1. Go to **Storage** in Supabase Dashboard
2. Click **"New bucket"**
3. Name: `receipts`
4. Public: **Off** (private)
5. Click **"Create bucket"**

6. Click on `receipts` bucket → **Policies**
7. Create three policies (click **"New Policy"**):

**Policy 1: Upload**
```sql
CREATE POLICY "Users can upload own receipts"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'receipts' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: View**
```sql
CREATE POLICY "Users can view own receipts"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'receipts' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Delete**
```sql
CREATE POLICY "Users can delete own receipts"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'receipts' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 8. First Login

1. Go to [http://localhost:3000](http://localhost:3000)
2. You'll be redirected to `/login`
3. Enter your email
4. Check inbox for magic link
5. Click link → redirected to app
6. **Default categories are auto-created!** 🎉

---

## Testing the Parser

Try these in the expense input:

```
15 beef, 12.9 carrot
牛肉 15, 胡萝卜 12.9
uber 18.45
starbucks latte 4.50
$25 gas
C$35.00 groceries
¥45 lunch
```

You should see real-time preview below the input!

---

## Deployment to Vercel

### 1. Push to GitHub (Already Done)

```bash
git remote -v  # Verify remote exists
git push origin main
```

### 2. Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your `pocket-budget` repo
4. **Environment Variables** → Add all from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (use your Vercel domain)
5. Click **"Deploy"**
6. Wait ~2 minutes

### 3. Update Supabase Redirect URLs

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Redirect URLs**:
   - `https://your-app.vercel.app/api/auth/callback`

### 4. Test Production

Visit your Vercel URL and test logging in!

---

## PWA Setup (iPhone/Android)

### iPhone (Safari)

1. Open your deployed app in Safari
2. Tap **Share** button (box with arrow)
3. Scroll down, tap **"Add to Home Screen"**
4. Tap **"Add"**
5. App appears on home screen with icon!

### Android (Chrome)

1. Open your app in Chrome
2. Tap menu (⋮)
3. Tap **"Add to Home screen"**
4. Tap **"Add"**

### Desktop (Chrome/Edge)

1. Open app in browser
2. Look for **install icon** (⊕) in address bar
3. Click **"Install"**

---

## Troubleshooting

### "Unauthorized" errors

- Check `.env.local` has correct Supabase keys
- Restart dev server after changing .env
- Clear browser cookies/localStorage

### Parser not working

- Open browser DevTools → Console
- Check for JavaScript errors
- Try the test cases from PRD section 21

### Magic link not received

- Check spam folder
- Verify email in Supabase Dashboard → Authentication → Users
- Check Supabase email quota (free tier: 4 emails/hour during dev)
- For production, configure SMTP in Supabase

### Categories not showing

- Run seed SQL: `SELECT seed_user_categories(auth.uid());` in SQL Editor
- Or insert one manually to test RLS policies

### Icons not showing

- Generate icons using https://realfavicongenerator.net/
- Place in `public/icons/` with correct sizes
- Or use placeholder 512x512 image for now

---

## Development Tips

### Hot Reload

Next.js auto-reloads on file changes. If it doesn't:

```bash
# Kill server (Ctrl+C) and restart
npm run dev
```

### Database Changes

After modifying schema:

1. Update `supabase/migrations/001_initial_schema.sql`
2. Run the new migration in SQL Editor
3. Regenerate types (optional):

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

### Test Data

Insert test transactions via SQL Editor:

```sql
INSERT INTO transactions (user_id, amount, raw_text, items, ts)
VALUES (
  auth.uid(),
  27.90,
  '15 beef, 12.9 carrot',
  '[{"name":"beef","amount":15},{"name":"carrot","amount":12.9}]'::jsonb,
  now()
);
```

### Clear All Data

```sql
-- Warning: This deletes everything!
DELETE FROM transactions WHERE user_id = auth.uid();
DELETE FROM budgets WHERE user_id = auth.uid();
DELETE FROM vendor_rules WHERE user_id = auth.uid();
```

---

## Next Steps

Now that core functionality is working:

1. ✅ Test text parser with bilingual input
2. ✅ Verify categories auto-populate
3. ✅ Check Today/Week/Month rollups update
4. ⏳ Implement receipt OCR (Tesseract.js)
5. ⏳ Add offline support (IndexedDB + Service Worker)
6. ⏳ Create History, Categories, Budgets pages
7. ⏳ Add comprehensive tests
8. ⏳ Performance optimization

---

## Support & Resources

- **Documentation**: See `/IMPLEMENTATION_PLAN.md` and `/DESIGN_SYSTEM.md`
- **PRD**: See `/PRD.md` for complete requirements
- **Issues**: GitHub Issues on the repo
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Ready to track expenses!** 💰🚀

