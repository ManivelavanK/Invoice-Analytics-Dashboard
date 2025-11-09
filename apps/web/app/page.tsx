import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Invoice Analytics Dashboard
        </h1>
        <div className="space-x-4">
          <Link href="/dashboard">
            <Button size="lg">View Dashboard</Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" size="lg">Chat with Data</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}