import { NextResponse } from 'next/server'
import { auth } from './auth'

export const runtime = 'experimental-edge'
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export default auth(req => {
  const url = req.nextUrl

  const hostname = req.headers.get('host')!
  const subdomain = hostname.replace(`${url.host}`, '').replace('.', '') || null

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (subdomain === 'auth') {
    return NextResponse.rewrite(new URL(`/auth${path}`, req.url))
  }
  if (subdomain === null) {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url))
  }
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
})
