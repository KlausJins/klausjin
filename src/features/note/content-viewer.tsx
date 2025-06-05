'use client'

import { MDViewer } from '@/components/markdown'
import { generateAnchorList } from '@/utils/note'
import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash-es'
import mediumZoom from 'medium-zoom'

import { AnchorList } from './anchor-list'
import { useForceUpdate } from '@/hooks'

export type AnchorItemType = {
  id: string
  text: string
  level: number
  children: AnchorItemType[]
}

export const ContentViewer = ({ id }: { id: string }) => {
  const [MDContent, setMDContent] = useState('')
  const forceUpdate = useForceUpdate()
  const [anchorListInfo, setAnchorListInfo] = useState<AnchorItemType[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const MDViewerRef = useRef<HTMLDivElement>(null)

  // 获取本地的md文档
  useEffect(() => {
    fetch(`/api/md/${id}`).then((res) =>
      res.json().then((res) => {
        setMDContent(res.content)
      })
    )
  }, [])

  // // 动态生成文档目录
  useEffect(() => {
    const MDViewerContainer = MDViewerRef.current
    if (!MDViewerContainer) return

    const headings = Array.from(
      MDViewerContainer.querySelectorAll('h2, h3, h4, h5, h6')
    ) as HTMLHeadingElement[]

    const headingData: AnchorItemType[] = headings.map((el) => {
      const level = parseInt(el.tagName.substring(1))
      const text = el.textContent || ''
      const anchorId = el.id

      return { id: anchorId, text, level, children: [] }
    })

    const anchorInfo = generateAnchorList(headingData)
    setAnchorListInfo(anchorInfo)
  }, [MDContent])

  useEffect(() => {
    let contentDetail = document.getElementById('content-detail') || window
    let current: string | null = null

    // 所有操作执行完之后，绑定图片的缩放功能
    const imgEls = document.querySelectorAll('.markdown-body img')
    mediumZoom(imgEls)

    let onScroll = () => {}

    if (contentDetail) {
      // 滚动监听高亮
      onScroll = throttle(() => {
        const MDViewerContainer = MDViewerRef.current
        if (!MDViewerContainer) return

        const headings = Array.from(
          MDViewerContainer.querySelectorAll('h2, h3, h4, h5, h6')
        ) as HTMLHeadingElement[]

        for (const el of headings) {
          const rect_top = el.getBoundingClientRect().top
          if (rect_top >= 0 && rect_top <= 150) {
            current = el.id
            break
          }
        }

        setActiveId(current || '')
      }, 50)

      contentDetail.addEventListener('scroll', onScroll)
    }

    return () => contentDetail?.removeEventListener('scroll', onScroll)
  })

  // 目录点击事件
  const handleClick = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div id="content-editor" className="mx-auto flex gap-10 justify-center">
      <div className="mx-auto flex flex-col !max-w-detail-content overflow-scroll pb-10">
        {/* 文档标题 */}
        {MDContent && (
          <div className="flex flex-col gap-10 max-md:gap-4">
            <div className="text-4xl font-black">这是一个笔记标题</div>
            <div className="text-secondary">这是一个笔记内容</div>
            <div className="text-secondary text-sm">发布于 星期三，六月 4 2025</div>
          </div>
        )}
        {/* 文档内容 */}
        <MDViewer value={MDContent} ref={MDViewerRef} />
      </div>
      {/* 目录 */}
      <div className="max-w-50 mx-auto max-h-100 max-md:hidden shrink-0 sticky right-0 top-25">
        <AnchorList anchor={anchorListInfo} activeId={activeId} onClick={(id) => handleClick(id)} />
      </div>
    </div>
  )
}
