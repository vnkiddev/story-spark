import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hyan Stories',
  description: 'Magical stories for little dreamers - A collection of PDF storybooks for children',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}