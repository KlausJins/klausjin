import { AnchorItemType } from '@/features/note/content-viewer'

// 递归生成锚点列表
export const generateAnchorList = (headings: AnchorItemType[]): AnchorItemType[] => {
  const anchorItems: AnchorItemType[] = []
  const anchorStack: AnchorItemType[] = []

  for (const item of headings) {
    while (anchorStack.length > 0 && item.level <= anchorStack[anchorStack.length - 1].level) {
      anchorStack.pop()
    }

    if (anchorStack.length === 0) {
      anchorItems.push(item)
      anchorStack.push(item)
    } else {
      anchorItems[anchorItems.length - 1].children.push(item)
      anchorStack.push(item)
    }
  }

  return anchorItems
}
