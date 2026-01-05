import { generateAnchorList } from '@/utils/note'
import { SetStateAction, useState } from 'react'
import { AnchorItemType } from './anchor-list'

// 动态生成文档目录
export const useGenerateDocDir = (setValue: (value: SetStateAction<string>) => void) => {
  const [anchorListInfo, setAnchorListInfo] = useState<AnchorItemType[]>([])

  const generateFn = (container: HTMLDivElement) => {
    if (!container) return

    const headings = Array.from(
      container.querySelectorAll('h2, h3, h4, h5, h6')
    ) as HTMLHeadingElement[]

    // 初始化选择第一个目录
    setValue(headings[0]?.id || '')

    const headingData: AnchorItemType[] = headings.map((el) => {
      const level = parseInt(el.tagName.substring(1))
      const text = el.textContent || ''
      const anchorId = el.id

      return { id: anchorId, text, level, children: [] }
    })

    const anchorInfo = generateAnchorList(headingData)
    setAnchorListInfo(anchorInfo)
  }

  return { anchorListInfo, setAnchorListInfo: generateFn }
}

// 滚动监听回调方法
export const listenScrollHandler = (
  container: HTMLDivElement,
  value: string,
  setValue: (value: SetStateAction<string>) => void
) => {
  if (!container) return

  const headings = Array.from(
    container.querySelectorAll('h2, h3, h4, h5, h6')
  ) as HTMLHeadingElement[]

  for (const el of headings) {
    const rect_top = el.getBoundingClientRect().top
    if (rect_top >= 0 && rect_top <= 200) {
      if (value != el.id) {
        setValue(el.id)
      }
      break
    }
  }
}
