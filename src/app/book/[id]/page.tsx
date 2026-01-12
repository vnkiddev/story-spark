import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PDFViewer from '@/components/PDFViewer'
import Link from 'next/link'
import type { Metadata } from 'next'

interface BookPageProps {
  params: {
    id: string
  }
}

async function getBook(id: string) {
  try {
    const book = await prisma.book.findUnique({
      where: { id }
    })
    return book
  } catch (error) {
    console.error('Error fetching book:', error)
    return null
  }
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = await getBook(params.id)
  
  if (!book) {
    return {
      title: 'Story Not Found - Hyan Stories',
      description: 'The requested story could not be found.'
    }
  }

  return {
    title: `${book.title} - Hyan Stories`,
    description: `Read "${book.title}" - A magical story from Hyan's Stories Collection`
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBook(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="relative h-screen">
      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-4 left-4 z-10 bg-white hover:bg-pink-50 text-pink-600 font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-pink-200"
      >
        ← Back to Home
      </Link>
      
      <PDFViewer pdfUrl={book.pdfUrl} title={book.title} />
    </div>
  )
}