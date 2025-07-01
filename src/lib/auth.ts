import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  // 解决这个错误：Error: PrismaClient is not configured to run in Vercel Edge Functions or Edge Middleware.
  // 参考：https://github.com/prisma/prisma/issues/21310#issuecomment-1840428931
  session: { strategy: 'jwt' },
  // 暂时找不到好方法可以安全校验类型，先忽略类型校验
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma as any),
  trustHost: true,
  // pages: {
  //   signIn: '/auth/sign_in'
  // },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'user' // 自定义字段
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role // 传到客户端用
      return session
    }
    // authorized({ request, auth }) {
    //   console.log('auth: ', auth)
    //   // 将来用作 Next.js middleware，如果是访问后台页面，校验是否登录
    //   if (request.nextUrl.pathname.startsWith('/admin')) {
    //     return !!auth?.user
    //   }

    //   // 其它路径直接放行
    //   return true
    // }
  }
})
