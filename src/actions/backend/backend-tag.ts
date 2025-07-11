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

// 查询标签数据
export const searchTags = async (name?: string) => {
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
    }
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
