'use client'

import { useState, useEffect } from 'react'
import BookCard from './BookCard'
import LoadingSkeleton from './LoadingSkeleton'
import EmptyState from './EmptyState'

interface Book {
  id: string
  title: string
  coverUrl: string
  createdAt: string
}

export default function BookGrid() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (books.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          coverUrl={book.coverUrl}
        />
      ))}
    </div>
  )
}