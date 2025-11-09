'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const stats = {
  totalSpend: 18650,
  totalInvoices: 5,
  documentsUploaded: 5,
  avgInvoice: 3730
}

const trendsData = [
  { month: 'Jan', amount: 6200 },
  { month: 'Feb', amount: 9250 },
  { month: 'Mar', amount: 3200 }
]

const vendorsData = [
  { name: 'Marketing Agency', total: 8500 },
  { name: 'Tech Solutions', total: 8200 },
  { name: 'Office Supplies', total: 1200 },
  { name: 'Utilities', total: 750 }
]

const categoryData = [
  { name: 'Technology', value: 8200, color: '#8884d8' },
  { name: 'Marketing', value: 8500, color: '#82ca9d' },
  { name: 'Office', value: 1200, color: '#ffc658' },
  { name: 'Utilities', value: 750, color: '#ff7300' }
]

const invoices = [
  { id: 'INV-001', vendor: 'Tech Solutions Inc', amount: 5000, status: 'Paid', date: '2024-01-15' },
  { id: 'INV-002', vendor: 'Office Supplies Co', amount: 1200, status: 'Pending', date: '2024-01-20' },
  { id: 'INV-003', vendor: 'Marketing Agency', amount: 8500, status: 'Paid', date: '2024-02-01' }
]

export default function Dashboard() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Invoice Analytics Dashboard
      </h1>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Total Spend YTD</h3>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>${stats.totalSpend.toLocaleString()}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Total Invoices</h3>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{stats.totalInvoices}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Documents Uploaded</h3>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{stats.documentsUploaded}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Avg Invoice Value</h3>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>${stats.avgInvoice.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Top Vendors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Invoices</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#666' }}>Invoice #</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#666' }}>Vendor</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#666' }}>Amount</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#666' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', color: '#333' }}>{invoice.id}</td>
                    <td style={{ padding: '10px', color: '#333' }}>{invoice.vendor}</td>
                    <td style={{ padding: '10px', color: '#333' }}>${invoice.amount.toLocaleString()}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        backgroundColor: invoice.status === 'Paid' ? '#d4edda' : '#fff3cd',
                        color: invoice.status === 'Paid' ? '#155724' : '#856404'
                      }}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}