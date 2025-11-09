'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface Stats {
  totalSpendYTD: number
  totalInvoices: number
  documentsUploaded: number
  avgInvoiceValue: number
}

interface Invoice {
  id: string
  invoiceNumber: string
  vendor: { name: string }
  totalAmount: number
  status: string
  invoiceDate: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [topVendors, setTopVendors] = useState([])
  const [categorySpend, setCategorySpend] = useState([])
  const [trends, setTrends] = useState([])

  useEffect(() => {
    // Fetch stats
    fetch('http://localhost:3001/stats')
      .then(res => res.json())
      .then(setStats)

    // Fetch invoices
    fetch('http://localhost:3001/invoices?limit=10')
      .then(res => res.json())
      .then(data => setInvoices(data.invoices))

    // Fetch top vendors
    fetch('http://localhost:3001/vendors/top10')
      .then(res => res.json())
      .then(setTopVendors)

    // Fetch category spend
    fetch('http://localhost:3001/category-spend')
      .then(res => res.json())
      .then(setCategorySpend)

    // Fetch trends
    fetch('http://localhost:3001/invoice-trends')
      .then(res => res.json())
      .then(setTrends)
  }, [])

  if (!stats) return <div>Loading...</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Invoice Analytics Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spend YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(Number(stats.totalSpendYTD))}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvoices}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documents Uploaded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsUploaded}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Invoice Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(Number(stats.avgInvoiceValue))}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topVendors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySpend}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {categorySpend.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">{invoice.vendor.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(Number(invoice.totalAmount))}</p>
                    <p className="text-sm text-gray-500">{invoice.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}