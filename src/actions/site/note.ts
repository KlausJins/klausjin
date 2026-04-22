'use server'

import { prisma } from '@/lib/prisma'

// 获取笔记列表
export const getNotesList = async () => {
  const notes = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      tags: {
        select: {
          name: true,
          icon: true,
          iconDark: true
        }
      }
    },
    where: {
      published: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return notes
}
