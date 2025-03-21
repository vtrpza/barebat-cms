import { createClient } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Handle authentication state
  const pathname = request.nextUrl.pathname

  // Public routes - accessible whether logged in or not
  if (pathname.startsWith('/auth')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return response
  }

  // Protected routes - must be logged in
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return response
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/auth/:path*'],
} 