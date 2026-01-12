'use client'

import Image from 'next/image'
import Link from 'next/link'

interface BookCardProps {
  id: string
  title: string
  coverUrl: string
}

export default function BookCard({ id, title, coverUrl }: BookCardProps) {
  return (
    <Link href={`/book/${id}`}>
      <div className="child-card p-6 h-full cursor-pointer group relative overflow-hidden">
        {/* Magical sparkle effect */}
        <div className="absolute top-2 right-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
          ✨
        </div>
        <div className="absolute bottom-2 left-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">
          🌟
        </div>
        
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors mb-2">
            {title}
          </h3>
          <div className="inline-flex items-center gap-2 text-pink-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Read Story</span>
            <span className="text-lg">📖</span>
          </div>
        </div>
      </div>
    </Link>
  )
}