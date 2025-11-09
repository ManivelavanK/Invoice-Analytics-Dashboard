# Fix Vercel Root Directory Error

## The Issue:
Vercel project settings still point to "apps/api" which no longer exists.

## Fix Steps:

### Option 1: Update Project Settings
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → General
4. Change **Root Directory** from `apps/api` to `/` (root)
5. Save and redeploy

### Option 2: Delete and Redeploy
1. Delete the current Vercel project
2. Go to https://vercel.com/new
3. Import fresh: `ManivelavanK/Invoice-Analytics-Dashboard`
4. Leave Root Directory **empty** (defaults to root)
5. Deploy

### Option 3: Use Deploy Button
Click this button for instant deployment:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ManivelavanK/Invoice-Analytics-Dashboard)

## Correct Settings:
- **Framework**: Next.js (auto-detected)
- **Root Directory**: `/` or leave empty
- **Build Command**: Auto-detected
- **Output Directory**: Auto-detected

The project is now a standard Next.js app in the root directory!