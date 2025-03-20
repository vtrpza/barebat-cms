import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access protected routes
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    const baseUrl = request.nextUrl.origin
    const loginPath = '/auth/login'
    const redirectUrl = `${baseUrl}${loginPath}?redirectTo=${encodeURIComponent(request.nextUrl.pathname)}`
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/callback',
  ],
} 