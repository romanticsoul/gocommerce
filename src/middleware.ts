import { NextResponse } from 'next/server'
import { auth } from './auth'

// export const runtime = 'experimental-edge'
export const config = {
  // matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export default auth(req => {
  const url = req.nextUrl

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get('host')!
    .replace(
      '.gocommerce.local:3000',
      `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    )

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes('---') &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`
  }

  const searchParams = req.nextUrl.searchParams.toString()
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname == `auth.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const session = req.auth
    if (!session) {
      return NextResponse.rewrite(
        new URL(`/auth${path === '/' ? '' : path}`, req.url),
      )
    } else if (session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // rewrite root application to `/home` folder
  if (
    hostname === 'gocommerce.local:3000' ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === '/' ? '' : path}`, req.url),
    )
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
})

// export default auth(req => {
//   const url = req.nextUrl

//   const hostname = req.headers.get('host')!
//   const subdomain = hostname.replace(`${url.host}`, '').replace('.', '') || null

//   const searchParams = req.nextUrl.searchParams.toString()
//   const path = `${url.pathname}${
//     searchParams.length > 0 ? `?${searchParams}` : ''
//   }`

//   if (subdomain === 'auth') {
//     return NextResponse.rewrite(new URL(`/auth${path}`, req.url))
//   }
//   if (subdomain === null) {
//     return NextResponse.rewrite(new URL(`/home${path}`, req.url))
//   }
//   return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
// })
