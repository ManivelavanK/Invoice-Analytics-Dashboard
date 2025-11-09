# Invoice Analytics Dashboard

A full-stack monorepo application for invoice analytics with AI-powered data querying.

## Architecture

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Backend**: Node.js + Express with TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **AI Service**: Python FastAPI with Vanna AI + Groq integration
- **Monorepo**: Turborepo

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.8+
- PostgreSQL
- Groq API key

### 1. Install Dependencies

```bash
# Root level
npm install

# Install all workspace dependencies
npm run build
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb invoice_analytics

# Update connection string in apps/api/.env
DATABASE_URL="postgresql://username:password@localhost:5432/invoice_analytics?schema=public"
```

### 3. API Setup

```bash
cd apps/api

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 4. Vanna AI Service Setup

```bash
cd services/vanna

# Install Python dependencies
pip install -r requirements.txt

# Update .env with your Groq API key
GROQ_API_KEY=your_groq_api_key_here
```

### 5. Run Development Servers

```bash
# From root directory - runs all services
npm run dev

# Or run individually:
# API server (port 3001)
cd apps/api && npm run dev

# Web app (port 3000)
cd apps/web && npm run dev

# Vanna AI service (port 8000)
cd services/vanna && python main.py
```

## API Endpoints

- `GET /stats` - Overview statistics
- `GET /invoice-trends` - Monthly invoice trends
- `GET /vendors/top10` - Top 10 vendors by spend
- `GET /category-spend` - Spending by category
- `GET /cash-outflow` - Cash outflow trends
- `GET /invoices` - Paginated invoice list with search/sort
- `POST /chat-with-data` - Natural language queries

## Features

### Dashboard
- Overview cards with key metrics
- Interactive charts (trends, vendors, categories)
- Invoice table with search and sorting

### Chat with Data
- Natural language to SQL conversion
- Real-time query execution
- Results display in table format

## Project Structure

```
/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express backend
├── services/
│   └── vanna/        # Python FastAPI service
├── data/
│   └── Analytics_Test_Data.json
└── package.json      # Root package.json
```