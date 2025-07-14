// export { auth as middleware } from '@/lib/auth'

import { auth } from '@/lib/auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 处理页面路由的认证
  const authResponse = await auth()
  // console.log('authResponse: ', authResponse)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!authResponse?.user) {
      return NextResponse.redirect(new URL('/auth/sign_in', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
