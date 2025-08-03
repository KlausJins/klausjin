'use server'

import { prisma } from '@/lib/prisma'

// 查询是否有同名标签
export const hasRepeatTag = async (tagName: string) => {
  console.log('tagName: ', tagName)
  // 先查询是否有同名标签
  const tag = await prisma.tag.findMany({
    select: {
      id: true
    },
    where: {
      name: tagName.trim()
    }
  })
  console.log('hasRepeatTag: ', tag.length > 0)

  return tag.length > 0
}

// 创建标签
export const createTag = async (tagInfo: { [k: string]: FormDataEntryValue }) => {
  // 添加标签
  return prisma.tag.create({
    data: {
      name: tagInfo.tagName as string,
      icon: tagInfo.icon as string,
      iconDark: tagInfo.darkIcon as string,
      userId: tagInfo.userId as string
    }
  })
}

// 更新标签
export const updateTag = async (tagInfo: { [k: string]: FormDataEntryValue }) => {
  // 更新标签
  return prisma.tag.update({
    data: {
      name: tagInfo.tagName as string,
      icon: tagInfo.icon as string,
      iconDark: tagInfo.darkIcon as string,
      userId: tagInfo.userId as string
    },
    where: {
      id: tagInfo.tagId as string
    }
  })
}

export type searchTagsParams = {
  name?: string
  paging?: { pageIndex: number; limit: number }
  orderByType?: 'CREATEASC' | 'CREATEDESC' | 'UPDATEASC' | 'UPDATEDESC'
}

// 查询标签数据
export const searchTags = async (params: searchTagsParams) => {
  const { name, paging, orderByType } = params

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
  return prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      icon: true,
      iconDark: true,
      createdAt: true,
      updatedAt: true
    },
    where: {
      name: {
        contains: name,
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

// 加载标签详情数据
export const getTagDetail = async (id: string) => {
  return prisma.tag.findUnique({
    select: {
      id: true,
      name: true,
      icon: true,
      iconDark: true
    },
    where: {
      id
    }
  })
}

// 删除标签
export const deleteTags = async (id: string[]) => {
  return prisma.tag.deleteMany({
    where: {
      id: {
        in: id
      }
    }
  })
}

// 查看有多少笔记关联了此标签
export const hasAssociatedTag = async (id: string) => {
  return prisma.note.count({
    where: {
      tags: {
        some: {
          id
        }
      }
    }
  })
}
