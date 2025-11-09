'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatResponse {
  sql: string
  results: any[]
  columns: string[]
}

export default function ChatPage() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState<ChatResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/chat-with-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })
      const data = await res.json()
      setResponse(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Chat with Your Data</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="e.g., What are the top 5 vendors by total spend?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Ask Question'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {response && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Generated SQL</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{response.sql}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              {response.results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {response.columns.map((column) => (
                          <th key={column} className="border border-gray-300 px-4 py-2 text-left">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {response.results.map((row, index) => (
                        <tr key={index}>
                          {response.columns.map((column) => (
                            <td key={column} className="border border-gray-300 px-4 py-2">
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No results found.</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}