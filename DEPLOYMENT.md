# Vercel Deployment Guide

## Quick Deploy Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Project Root
```bash
vercel --prod
```

## Alternative: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `ManivelavanK/Invoice-Analytics-Dashboard`
4. Configure:
   - Framework: Next.js
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && npm run build`
   - Output Directory: `apps/web/.next`

## Environment Variables (Add in Vercel Dashboard)

```
DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
```

## Live URLs After Deployment
- **Web App**: https://your-project.vercel.app
- **API**: https://your-project.vercel.app/api

## Note
The Python Vanna AI service needs separate deployment (Railway, Render, or Heroku).