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

  const searchParams = url.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  switch (subdomain) {
    case 'auth':
      return NextResponse.rewrite(
        new URL(`/auth${path === '/' ? '' : path}`, req.url),
      )
    case null:
      return NextResponse.rewrite(
        new URL(`/home${path === '/' ? '' : path}`, req.url),
      )
    default:
      return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
  }
})

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl

//   // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
//   let hostname = req.headers
//     .get('host')!
//     .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

//   // special case for Vercel preview deployment URLs
//   if (
//     hostname.includes('---') &&
//     hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
//   ) {
//     hostname = `${hostname.split('---')[0]}.${
//       process.env.NEXT_PUBLIC_ROOT_DOMAIN
//     }`
//   }

//   const searchParams = req.nextUrl.searchParams.toString()
//   // Get the pathname of the request (e.g. /, /about, /blog/first-post)
//   const path = `${url.pathname}${
//     searchParams.length > 0 ? `?${searchParams}` : ''
//   }`

//   // rewrites for app pages
//   if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//     const session = await getToken({ req })
//     if (!session && path !== '/login') {
//       return NextResponse.redirect(new URL('/login', req.url))
//     } else if (session && path == '/login') {
//       return NextResponse.redirect(new URL('/', req.url))
//     }
//     return NextResponse.rewrite(
//       new URL(`/app${path === '/' ? '' : path}`, req.url),
//     )
//   }

//   // special case for `vercel.pub` domain
//   if (hostname === 'vercel.pub') {
//     return NextResponse.redirect(
//       'https://vercel.com/blog/platforms-starter-kit',
//     )
//   }

//   // rewrite root application to `/home` folder
//   if (
//     hostname === 'localhost:3000' ||
//     hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
//   ) {
//     return NextResponse.rewrite(
//       new URL(`/home${path === '/' ? '' : path}`, req.url),
//     )
//   }

//   // rewrite everything else to `/[domain]/[slug] dynamic route
//   return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
// }
