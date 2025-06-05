'use client'

import { MDViewer } from '@/components/markdown'
import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash-es'
import mediumZoom from 'medium-zoom'

import { AnchorList } from './anchor-list'
import { listenScrollHandler, useGenerateDocDir } from './content-hooks'

export const ContentViewer = ({ id }: { id: string }) => {
  const [MDContent, setMDContent] = useState('')
  const [activeId, setActiveId] = useState<string>('')
  const MDViewerRef = useRef<HTMLDivElement>(null)
  const { anchorListInfo, setAnchorListInfo } = useGenerateDocDir(setActiveId)

  // 获取本地的md文档
  useEffect(() => {
    fetch(`/api/md/${id}`).then((res) =>
      res.json().then((res) => {
        setMDContent(res.content)
      })
    )
  }, [id])

  useEffect(() => {
    const MDViewerContainer = MDViewerRef.current!

    // 动态生成文档目录
    setAnchorListInfo(MDViewerContainer)

    // 滚动监听高亮
    const contentDetail = document.getElementById('content-detail') || window

    let scrollHandler = () => {}

    if (contentDetail && MDViewerContainer) {
      // 滚动监听高亮
      scrollHandler = throttle(
        () => listenScrollHandler(MDViewerContainer, activeId, setActiveId),
        100
      )

      contentDetail.addEventListener('scroll', scrollHandler)
    }
    return () => contentDetail?.removeEventListener('scroll', scrollHandler)
  }, [MDContent])

  // 组件渲染几次就执行几次，避免图片缩放功能失效
  useEffect(() => {
    const imgEls = document.querySelectorAll('.markdown-body img')
    mediumZoom(imgEls)
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
            <div className="text-4xl font-black">
              这是一个笔记标题使用Shell脚本实现自动化打包前端项目并上传到云服务器
            </div>
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
