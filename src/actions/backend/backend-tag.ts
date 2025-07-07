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
