import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET /stats
app.get('/stats', async (req, res) => {
  try {
    const totalSpend = await prisma.invoice.aggregate({
      _sum: { totalAmount: true }
    });
    
    const totalInvoices = await prisma.invoice.count();
    
    const avgInvoiceValue = await prisma.invoice.aggregate({
      _avg: { totalAmount: true }
    });

    const documentsUploaded = totalInvoices; // Assuming each invoice is a document

    res.json({
      totalSpendYTD: totalSpend._sum.totalAmount || 0,
      totalInvoices,
      documentsUploaded,
      avgInvoiceValue: avgInvoiceValue._avg.totalAmount || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /invoice-trends
app.get('/invoice-trends', async (req, res) => {
  try {
    const trends = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "invoiceDate") as month,
        SUM("totalAmount") as total,
        COUNT(*) as count
      FROM invoices 
      GROUP BY DATE_TRUNC('month', "invoiceDate")
      ORDER BY month
    `;
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoice trends' });
  }
});

// GET /vendors/top10
app.get('/vendors/top10', async (req, res) => {
  try {
    const topVendors = await prisma.vendor.findMany({
      include: {
        invoices: {
          select: { totalAmount: true }
        }
      }
    });

    const vendorsWithTotals = topVendors.map(vendor => ({
      name: vendor.name,
      total: vendor.invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0)
    })).sort((a, b) => b.total - a.total).slice(0, 10);

    res.json(vendorsWithTotals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top vendors' });
  }
});

// GET /category-spend
app.get('/category-spend', async (req, res) => {
  try {
    const categorySpend = await prisma.$queryRaw`
      SELECT 
        COALESCE(category, 'Uncategorized') as category,
        SUM("totalAmount") as total
      FROM invoices 
      GROUP BY category
      ORDER BY total DESC
    `;
    res.json(categorySpend);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category spend' });
  }
});

// GET /cash-outflow
app.get('/cash-outflow', async (req, res) => {
  try {
    const cashOutflow = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "paymentDate") as month,
        SUM(amount) as outflow
      FROM payments 
      GROUP BY DATE_TRUNC('month', "paymentDate")
      ORDER BY month
    `;
    res.json(cashOutflow);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cash outflow' });
  }
});

// GET /invoices
app.get('/invoices', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'invoiceDate', sortOrder = 'desc' } = req.query;
    
    const where = search ? {
      OR: [
        { invoiceNumber: { contains: search as string, mode: 'insensitive' } },
        { vendor: { name: { contains: search as string, mode: 'insensitive' } } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ]
    } : {};

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        vendor: true,
        payments: true
      },
      orderBy: { [sortBy as string]: sortOrder },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    });

    const total = await prisma.invoice.count({ where });

    res.json({
      invoices,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// POST /chat-with-data
app.post('/chat-with-data', async (req, res) => {
  try {
    const { question } = req.body;
    
    // Proxy to Vanna AI service
    const response = await axios.post('http://localhost:8000/generate-sql', {
      question
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});