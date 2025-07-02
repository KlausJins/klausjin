import { prisma } from '@/lib/prisma'
import { User } from 'next-auth'

// 将用户设置为管理员
export const setAdmin = async (user: User) => {
  await prisma.user.update({
    where: { email: user.email! },
    data: { role: 'admin' }
  })
}
