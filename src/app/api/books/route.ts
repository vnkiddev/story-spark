import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { saveFile, validateImageFile, validatePdfFile } from '@/lib/upload'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const coverFile = formData.get('cover') as File
    const pdfFile = formData.get('pdf') as File

    // Validate inputs
    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    if (!coverFile || !validateImageFile(coverFile)) {
      return NextResponse.json(
        { success: false, error: 'Valid cover image is required (JPG, PNG, WebP)' },
        { status: 400 }
      )
    }

    if (!pdfFile || !validatePdfFile(pdfFile)) {
      return NextResponse.json(
        { success: false, error: 'Valid PDF file is required' },
        { status: 400 }
      )
    }

    // Save files
    const coverUrl = await saveFile(coverFile, 'covers')
    const pdfUrl = await saveFile(pdfFile, 'pdfs')

    // Save to database
    const book = await prisma.book.create({
      data: {
        title: title.trim(),
        coverUrl,
        pdfUrl,
      }
    })

    return NextResponse.json({ success: true, book })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create book' },
      { status: 500 }
    )
  }
}