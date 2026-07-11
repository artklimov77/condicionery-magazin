import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE = 'na_admin'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const password = process.env.ADMIN_PASSWORD
  if (!password) return NextResponse.next()

  const cookie = req.cookies.get(COOKIE)?.value
  const expected = btoa(password)

  if (cookie !== expected) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
