'use client'

import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PDFViewerProps {
  pdfUrl: string
  title: string
}

export default function PDFViewer({ pdfUrl, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setLoading(false)
  }, [])

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1))
  }

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(numPages, prev + 1))
  }

  const zoomIn = () => {
    setScale(prev => Math.min(3.0, prev + 0.2))
  }

  const zoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.2))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-lg p-4 border-b-4 border-pink-200">
        <h1 className="text-2xl font-bold text-pink-600 text-center truncate">
          {title}
        </h1>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-md p-4 flex flex-wrap justify-center items-center gap-4 border-b-2 border-pink-100">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="child-button disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          ← Previous
        </button>
        
        <span className="bg-pink-100 px-4 py-2 rounded-xl font-semibold text-pink-700">
          Page {pageNumber} / {numPages}
        </span>
        
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="child-button disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Next →
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={zoomOut}
            className="bg-pink-200 hover:bg-pink-300 text-pink-700 font-semibold py-2 px-4 rounded-xl transition-colors"
          >
            🔍-
          </button>
          <button
            onClick={zoomIn}
            className="bg-pink-200 hover:bg-pink-300 text-pink-700 font-semibold py-2 px-4 rounded-xl transition-colors"
          >
            🔍+
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-pink-200 hover:bg-pink-300 text-pink-700 font-semibold py-2 px-4 rounded-xl transition-colors"
          >
            ⛶
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto flex justify-center items-start p-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin text-6xl mb-4">🌸</div>
            <p className="text-pink-600 text-xl font-semibold">Loading story...</p>
          </div>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
          error={
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😢</div>
              <p className="text-red-500 text-xl">Cannot load the story</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="shadow-2xl rounded-lg overflow-hidden"
            loading=""
          />
        </Document>
      </div>
    </div>
  )
}