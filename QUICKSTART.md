# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Python 3.8+ installed
- PostgreSQL installed and running
- Groq API key (get from https://console.groq.com/)

## Setup (5 minutes)

### 1. Run Setup Script
```bash
setup.bat
```

### 2. Create Database
```bash
createdb invoice_analytics
```

### 3. Update Environment Variables
- Edit `apps/api/.env` - update DATABASE_URL with your PostgreSQL credentials
- Edit `services/vanna/.env` - add your GROQ_API_KEY

### 4. Initialize Database
```bash
cd apps/api
npx prisma db push
npm run db:seed
cd ../..
```

### 5. Start Development Servers
```bash
start-dev.bat
```

## Access Points
- **Web App**: http://localhost:3000
- **API**: http://localhost:3001
- **Vanna AI**: http://localhost:8000

## Features
- **Dashboard**: Overview cards, charts, invoice table
- **Chat with Data**: Natural language SQL queries

## Troubleshooting
- Ensure PostgreSQL is running
- Check environment variables are set correctly
- Verify all ports (3000, 3001, 8000) are available