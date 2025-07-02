import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { setAdmin } from '@/actions/backend'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  // 解决这个错误：Error: PrismaClient is not configured to run in Vercel Edge Functions or Edge Middleware.
  // 参考：https://github.com/prisma/prisma/issues/21310#issuecomment-1840428931
  session: { strategy: 'jwt' },
  // 目前找不到好方法可以安全校验类型，先忽略类型校验
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma as any),
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  events: {
    async signIn({ user, profile, isNewUser }) {
      if (isNewUser) {
        // 如果是新用户
        if (profile?.id && process.env.ADMIN_GITHUB_IDS.includes(profile.id.toString())) {
          // 匹配为管理员，自动设置为管理员
          setAdmin(user)
        }
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  }
})
