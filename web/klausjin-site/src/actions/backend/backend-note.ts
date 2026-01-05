'use server'

import { prisma } from '@/lib/prisma'

export type searchNotesParams = {
  title?: string
  selectedTags?: string[]
  paging?: { pageIndex: number; limit: number }
  orderByType?: 'CREATEASC' | 'CREATEDESC' | 'UPDATEASC' | 'UPDATEDESC'
}

// 查询标签数据
export const searchNotes = async (params: searchNotesParams) => {
  const { title, selectedTags, paging, orderByType } = params

  // 设置排序变量
  let orderByName: 'createdAt' | 'updatedAt' = 'createdAt'
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
      },
      tags: {
        some: {
          name: {
            in: selectedTags?.length ? selectedTags : undefined
          }
        }
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

// 加载笔记详情数据
export const getNoteDetail = async (id: string) => {
  return prisma.note.findUnique({
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      cover: true,
      author: true,
      published: true,
      createdAt: true,
      tags: {
        select: {
          id: true,
          name: true,
          icon: true,
          iconDark: true
        }
      }
    },
    where: {
      id
    }
  })
}

// 加载笔记详情数据
export const getNoteTitleDesc = async (id: string) => {
  return prisma.note.findUnique({
    select: {
      title: true,
      description: true,
      published: true,
      tags: {
        select: {
          id: true,
          name: true,
          icon: true,
          iconDark: true
        }
      }
    },
    where: {
      id
    }
  })
}

type UpdateNoteInfoType = {
  id: string
  userId: string
  title: string
  description: string
  content: string
  cover?: string
  userName: string
  tags: string[]
  isPublished: boolean
}

// 更新笔记
export const updateNote = async (noteInfo: UpdateNoteInfoType) => {
  // 更新标签
  return prisma.note.update({
    data: {
      title: noteInfo.title as string,
      description: noteInfo.description as string,
      content: noteInfo.content as string,
      cover: noteInfo.cover as string,
      published: noteInfo.isPublished as boolean,
      userId: noteInfo.userId as string,
      tags: {
        connect: noteInfo.tags.map((item) => ({ id: item }))
      }
    },
    where: {
      id: noteInfo.id as string
    }
  })
}
