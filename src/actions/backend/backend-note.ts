'use server'

import { prisma } from '@/lib/prisma'

export type searchNotesParams = {
  title?: string
  paging?: { pageIndex: number; limit: number }
  orderByType?: 'CREATEASC' | 'CREATEDESC' | 'UPDATEASC' | 'UPDATEDESC'
}

// 查询标签数据
export const searchNotes = async (params: searchNotesParams) => {
  const { title, paging, orderByType } = params

  // 设置排序变量
  let orderByName: 'createdAt' | 'updatedAt' = 'updatedAt'
  let orderByValue: 'asc' | 'desc' = 'desc'

  // 根据排序变量设置排序规则
  if (orderByType == 'CREATEASC') {
    orderByName = 'createdAt'
    orderByValue = 'asc'
  } else if (orderByType == 'CREATEDESC') {
    orderByName = 'createdAt'
    orderByValue = 'desc'
  } else if (orderByType == 'UPDATEASC') {
    orderByName = 'updatedAt'
    orderByValue = 'asc'
  } else if (orderByType == 'UPDATEDESC') {
    orderByName = 'updatedAt'
    orderByValue = 'desc'
  }

  // 查询数据
  return prisma.note.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      tags: {
        select: {
          id: true,
          name: true
        }
      }
    },
    where: {
      title: {
        contains: title,
        mode: 'insensitive' // 不区分大小写
      }
    },
    orderBy: {
      [orderByName]: orderByValue
    },
    take: paging?.limit,
    skip: paging && paging.limit * (paging.pageIndex - 1)
  })
}

type NoteInfoType = {
  id: string
  title: string
  description: string
  content: string
  cover?: string
  isPublished: boolean
  userId: string
  userName: string
  tags: string[]
}

// 创建笔记
export const createNote = async (noteInfo: NoteInfoType) => {
  return prisma.note.create({
    data: {
      title: noteInfo.title as string,
      description: noteInfo.description as string,
      content: noteInfo.content as string,
      cover: noteInfo.cover as string,
      author: noteInfo.userName as string,
      published: noteInfo.isPublished as boolean,
      userId: noteInfo.userId as string,
      tags: {
        connect: noteInfo.tags.map((item) => ({ id: item }))
      }
    }
  })
}

// 删除标签
export const deleteNotes = async (id: string[]) => {
  return prisma.note.deleteMany({
    where: {
      id: {
        in: id
      }
    }
  })
}

// 切换笔记发布状态
export const changeNotePublishStatus = async (id: string, status: boolean) => {
  return prisma.note.update({
    where: {
      id
    },
    data: {
      published: status
    }
  })
}
