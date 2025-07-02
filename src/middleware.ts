// export { auth as middleware } from '@/lib/auth'

import { auth } from '@/lib/auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. 首先处理页面路由的认证
  const authResponse = await auth()
  // console.log('authResponse: ', authResponse)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!authResponse?.user) {
      return NextResponse.redirect(new URL('/auth/sign_in', request.url))
    }
  }

  // 2. 然后处理 API 路由的校验
  if (request.nextUrl.pathname.startsWith('/api')) {
    const response = await handleApiValidation()
    if (response) return response
  }

  return NextResponse.next()
}

async function handleApiValidation() {
  // console.log('handleApiValidation: ', request)
  // const session = await auth()
  // console.log('handleApiValidation: session', session)
  // 这里实现你的 API 校验逻辑
  // 例如检查请求头、验证 token 等

  // 如果需要阻止请求继续处理，返回一个 Response
  // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 如果校验通过，返回 null 或 undefined 以继续处理
  return null
}
export const config = {
  matcher: '/admin/:path*'
}
