import { NextResponse } from 'next/server'
import { auth } from './auth'

export const runtime = 'experimental-edge'
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export default auth(req => {
  const url = req.nextUrl
  const hostname = req.headers.get('host')!
  const subdomain =
    (hostname.match(/^(.*?)\.(?:[^.]+\.[^.]+)$/) || [])[1] || null

  const searchParams = url.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (!subdomain) {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url))
  }

  if (subdomain === 'auth') {
    const session = req.auth
    if (!session) {
      return NextResponse.rewrite(new URL(`/auth${path}`, req.url))
    } else if (session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
})
