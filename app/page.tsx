'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const data = {
  stats: { totalSpend: 18650, totalInvoices: 5, documentsUploaded: 5, avgInvoice: 3730 },
  trends: [{ month: 'Jan', amount: 6200 }, { month: 'Feb', amount: 9250 }, { month: 'Mar', amount: 3200 }],
  vendors: [{ name: 'Marketing Agency', total: 8500 }, { name: 'Tech Solutions', total: 8200 }, { name: 'Office Supplies', total: 1200 }],
  categories: [{ name: 'Technology', value: 8200, color: '#8884d8' }, { name: 'Marketing', value: 8500, color: '#82ca9d' }, { name: 'Office', value: 1200, color: '#ffc658' }],
  invoices: [
    { id: 'INV-001', vendor: 'Tech Solutions Inc', amount: 5000, status: 'Paid' },
    { id: 'INV-002', vendor: 'Office Supplies Co', amount: 1200, status: 'Pending' },
    { id: 'INV-003', vendor: 'Marketing Agency', amount: 8500, status: 'Paid' }
  ]
}

const Card = ({ children, style = {} }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', ...style }}>
    {children}
  </div>
)

export default function Dashboard() {
  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '32px' }}>
        📊 Invoice Analytics Dashboard
      </h1>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <Card>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Total Spend YTD</h3>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#2563eb' }}>${data.stats.totalSpend.toLocaleString()}</p>
        </Card>
        <Card>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Total Invoices</h3>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#059669' }}>{data.stats.totalInvoices}</p>
        </Card>
        <Card>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Documents Uploaded</h3>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#7c3aed' }}>{data.stats.documentsUploaded}</p>
        </Card>
        <Card>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Avg Invoice Value</h3>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#dc2626' }}>${data.stats.avgInvoice.toLocaleString()}</p>
        </Card>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <Card>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>📈 Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.trends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        
        <Card>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>🏢 Top Vendors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.vendors}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="total" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        <Card>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>🥧 Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categories}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
        
        <Card>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>📋 Recent Invoices</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#374151', fontWeight: '600' }}>Invoice #</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#374151', fontWeight: '600' }}>Vendor</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#374151', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#374151', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map((invoice) => (
                  <tr key={invoice.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', color: '#2563eb', fontWeight: '500' }}>{invoice.id}</td>
                    <td style={{ padding: '12px', color: '#374151' }}>{invoice.vendor}</td>
                    <td style={{ padding: '12px', color: '#374151', fontWeight: '600' }}>${invoice.amount.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: invoice.status === 'Paid' ? '#d1fae5' : '#fef3c7',
                        color: invoice.status === 'Paid' ? '#065f46' : '#92400e'
                      }}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#6b7280' }}>
        <p>🚀 Built with Next.js 14 & Recharts | Ready for Vercel deployment</p>
      </div>
    </div>
  )
}