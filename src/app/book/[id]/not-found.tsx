import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Story Not Found - Hyan Stories',
  description: 'The requested story could not be found.'
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-bounce-slow">😢</div>
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Story Not Found</h1>
        <p className="text-gray-600 text-lg mb-8">
          The story you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" className="child-button">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  )
}