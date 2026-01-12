'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Book {
  id: string
  title: string
  coverUrl: string
  pdfUrl: string
  createdAt: string
}

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  // Set page title
  if (typeof document !== 'undefined') {
    document.title = 'Admin Dashboard - Hyan Stories'
  }

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

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError('')
    setSuccess('')

    if (!title.trim()) {
      setError('Please enter story title')
      setUploading(false)
      return
    }

    if (!coverFile) {
      setError('Please select cover image')
      setUploading(false)
      return
    }

    if (!pdfFile) {
      setError('Please select PDF file')
      setUploading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('cover', coverFile)
    formData.append('pdf', pdfFile)

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Story added successfully!')
        setTitle('')
        setCoverFile(null)
        setPdfFile(null)
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>
        fileInputs.forEach(input => input.value = '')
        fetchBooks()
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (error) {
      setError('An error occurred, please try again')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Story deleted successfully!')
        fetchBooks()
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (error) {
      setError('An error occurred, please try again')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-pink-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-pink-600">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border-2 border-pink-200">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Add New Story</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-pink-700 font-semibold mb-2">
                Story Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="Enter story title..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-pink-700 font-semibold mb-2">
                  Cover Image * (JPG, PNG, WebP)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-pink-700 font-semibold mb-2">
                  PDF File *
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="child-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Add Story'}
            </button>
          </form>
        </div>

        {/* Books List */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-pink-200">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Story List</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-4xl mb-4">🌸</div>
              <p className="text-pink-600">Loading...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600">No stories yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {books.map((book) => (
                <div key={book.id} className="flex items-center gap-4 p-4 border-2 border-pink-100 rounded-2xl hover:border-pink-200 transition-colors">
                  <div className="relative w-16 h-20 flex-shrink-0">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(book.createdAt).toLocaleDateString('en-US')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}