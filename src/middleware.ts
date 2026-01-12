import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Protect admin dashboard routes
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get('session')?.value
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    const sessionData = await decrypt(session)
    if (!sessionData) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}