'use server'

import { prisma } from '@/lib/prisma'
import { User } from 'next-auth'

// 将用户设置为管理员
export const setAdmin = async (user: User) => {
  await prisma.user.update({
    where: { email: user.email! },
    data: { role: 'admin' }
  })
}

// 获取当前用户的id
export const getCurrentUserId = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email }
  })

  return user?.id
}

// 判断权限是否为管理员
export const isAdmin = async (id: string) => {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      role: true,
      accounts: {
        select: {
          providerAccountId: true
        }
      }
    },
    where: {
      accounts: {
        some: {
          providerAccountId: id
        }
      }
    }
  })

  return user?.role === 'admin'
}
