# 🔐 Google OAuth Setup Guide

## Current Error:
```
Error 400: redirect_uri_mismatch
Request details: redirect_uri=https://gjtckvgdaurxzneybysr.supabase.co/auth/v1/callback
```

---

## ✅ Solution: Complete Google OAuth Configuration

### **Your Supabase Project:**
- **Project ID:** gjtckvgdaurxzneybysr
- **Callback URL:** `https://gjtckvgdaurxzneybysr.supabase.co/auth/v1/callback`

---

## 📝 Step-by-Step Instructions

### **Part 1: Google Cloud Console Setup**

#### 1. Create/Configure OAuth Client ID

**Go to:** https://console.cloud.google.com/apis/credentials

**If you don't have an OAuth Client ID yet:**
1. Click **"+ CREATE CREDENTIALS"**
2. Select **"OAuth client ID"**
3. If prompted, configure OAuth consent screen first (see Part 3)

**Configure your OAuth Client:**
- **Application type:** `Web application`
- **Name:** `Pocket Budget` (or any name you prefer)

#### 2. Add Authorized JavaScript Origins

Add these origins (where the requests originate from):
```
https://gjtckvgdaurxzneybysr.supabase.co
https://pocket-budget-6p66wxem0-qinren-kangs-projects.vercel.app
https://pocket-budget.vercel.app
http://localhost:3000
```

#### 3. Add Authorized Redirect URIs ⭐ CRITICAL

Add these exact URIs (where Google sends the response):
```
https://gjtckvgdaurxzneybysr.supabase.co/auth/v1/callback
https://pocket-budget-6p66wxem0-qinren-kangs-projects.vercel.app/auth/callback
https://pocket-budget.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

#### 4. Save and Copy Credentials

After saving, you'll get:
- **Client ID** - Example: `123456789-abc123.apps.googleusercontent.com`
- **Client Secret** - Example: `GOCSPX-abc123def456`

**⚠️ Keep these secret!** You'll need them in the next step.

---

### **Part 2: Supabase Configuration**

#### 1. Enable Google Auth Provider

**Go to:** https://supabase.com/dashboard/project/gjtckvgdaurxzneybysr/auth/providers

1. Find **"Google"** in the providers list
2. Click to expand
3. Toggle **"Enable Sign in with Google"** to ON
4. Enter your credentials:
   - **Client ID (for OAuth):** Paste your Google Client ID
   - **Client Secret (for OAuth):** Paste your Google Client Secret
5. Click **"Save"**

#### 2. Configure Site URL and Redirect URLs

**Go to:** https://supabase.com/dashboard/project/gjtckvgdaurxzneybysr/auth/url-configuration

**Set Site URL:**
```
https://pocket-budget-6p66wxem0-qinren-kangs-projects.vercel.app
```

**Add Redirect URLs (comma or newline separated):**
```
https://pocket-budget-6p66wxem0-qinren-kangs-projects.vercel.app/**
https://pocket-budget.vercel.app/**
http://localhost:3000/**
```

**Save changes**

---

### **Part 3: OAuth Consent Screen (if needed)**

If you haven't configured the OAuth consent screen:

**Go to:** https://console.cloud.google.com/apis/credentials/consent

#### External (for public use):
1. **App name:** Pocket Budget
2. **User support email:** Your email
3. **App logo:** (optional)
4. **Application home page:** Your Vercel URL
5. **Authorized domains:**
   ```
   supabase.co
   vercel.app
   ```
6. **Developer contact:** Your email

#### Scopes to add:
- `email`
- `profile`
- `openid`

#### Test users (while in "Testing" mode):
- Add your email and any other test users

**Save and Continue**

---

### **Part 4: Verify Configuration**

#### Checklist:

**Google Cloud Console:**
- [ ] OAuth Client ID created
- [ ] Authorized JavaScript origins added (4 URLs)
- [ ] Authorized redirect URIs added (4 URLs)
- [ ] Client ID and Secret copied
- [ ] OAuth consent screen configured

**Supabase:**
- [ ] Google provider enabled
- [ ] Client ID added to Supabase
- [ ] Client Secret added to Supabase
- [ ] Site URL configured
- [ ] Redirect URLs added

**Testing:**
- [ ] Test login on production URL
- [ ] Test login on localhost (optional)
- [ ] Verify no redirect_uri_mismatch error

---

### **Part 5: Update Your App (Optional)**

If you want to add custom domain support later:

**In Google Cloud Console:**
- Add your custom domain to JavaScript origins
- Add `https://yourdomain.com` to redirect URIs
- Add `https://yourdomain.com/auth/callback` to redirect URIs

**In Supabase:**
- Update Site URL to your custom domain
- Add `https://yourdomain.com/**` to redirect URLs

---

## 🧪 Testing

### Test the Login Flow:

1. **Go to your app:**
   ```
   https://pocket-budget-6p66wxem0-qinren-kangs-projects.vercel.app/login
   ```

2. **Click "Sign in with Google"**

3. **Expected flow:**
   - Redirects to Google sign-in
   - Shows consent screen (first time)
   - Redirects back to your app
   - User is logged in
   - Redirects to home page

4. **If you still get errors:**
   - Wait 5-10 minutes for Google's changes to propagate
   - Clear browser cache and cookies
   - Try in incognito/private window
   - Check Google Cloud Console for any warnings

---

## 🐛 Common Issues

### Issue 1: "redirect_uri_mismatch"
**Solution:** Double-check the redirect URI in Google Console matches exactly:
```
https://gjtckvgdaurxzneybysr.supabase.co/auth/v1/callback
```
(No trailing slash, exact match)

### Issue 2: "Access blocked: This app's request is invalid"
**Solution:** 
- Make sure OAuth consent screen is configured
- Add test users if app is in "Testing" mode
- Verify scopes are added (email, profile, openid)

### Issue 3: "The OAuth client was not found"
**Solution:**
- Verify Client ID is correct in Supabase
- Check that the OAuth client exists in Google Console
- Make sure you're using the correct Google Cloud project

### Issue 4: Works on localhost but not production
**Solution:**
- Add production URL to authorized origins
- Add production callback URL to redirect URIs
- Update Supabase Site URL to production

---

## 📋 Quick Reference

### Your URLs:
```
Supabase Project: gjtckvgdaurxzneybysr
Callback URL: https://gjtckvgdaurxzneybysr.supabase.co/auth/v1/callback
Production URL: https://pocket-budget-6p66wxem0-qinren-kangs-projects.vercel.app
```

### Required Redirect URIs:
```
https://gjtckvgdaurxzneybysr.supabase.co/auth/v1/callback
https://pocket-budget-6p66wxem0-qinren-kangs-projects.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

### Links:
- Google Cloud Console: https://console.cloud.google.com/apis/credentials
- Supabase Auth Providers: https://supabase.com/dashboard/project/gjtckvgdaurxzneybysr/auth/providers
- Supabase URL Config: https://supabase.com/dashboard/project/gjtckvgdaurxzneybysr/auth/url-configuration

---

## ✅ Success Criteria

After completing all steps:
- ✅ No redirect_uri_mismatch errors
- ✅ Google sign-in button works
- ✅ Users can authenticate with Google
- ✅ Users are redirected back to your app
- ✅ User data is stored in Supabase

---

**Need help?** Check the logs:
- Supabase Logs: https://supabase.com/dashboard/project/gjtckvgdaurxzneybysr/logs/explorer
- Vercel Logs: https://vercel.com/qinren-kangs-projects/pocket-budget/logs

Good luck! 🚀

