'use client'

import { MarkdownSkeleton, MDViewer } from '@/components/markdown'
import { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { throttle } from 'lodash-es'
import mediumZoom from 'medium-zoom'

import { AnchorList } from './anchor-list'
import { listenScrollHandler, useGenerateDocDir } from './content-hooks'
import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import KlDropdown, { DropdownItemType } from '@/components/ui/dropdown'

export const ContentViewer = ({ id }: { id: string }) => {
  const [MDContent, setMDContent] = useState('')
  const [activeId, setActiveId] = useState<string>('')
  const MDViewerRef = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const { anchorListInfo, setAnchorListInfo } = useGenerateDocDir(setActiveId)

  const ContentViewerDropdownTrigger = useMemo(
    () => (
      <KlButton isIconOnly={true} className="size-9">
        <IconSelf iconName="icon-[lucide--list-tree]" size="text-2xl" />
      </KlButton>
    ),
    []
  )

  const ContentViewerDropdownItems: DropdownItemType[] = useMemo(
    () => [
      {
        key: 'AnchorList',
        className: 'data-[hover=true]:bg-transparent dark:data-[hover=true]:bg-transparent',
        children: (
          <AnchorList
            anchor={anchorListInfo}
            activeId={activeId}
            onClick={(id) => handleClick(id)}
          />
        )
      }
    ],
    [anchorListInfo, activeId]
  )

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // 获取本地的md文档
  useEffect(() => {
    fetch(`/api/md/${id}`).then((res) => {
      res.json().then((res) => {
        setMDContent(res.content)
      })
    })
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
      {/* 文档骨架屏 */}
      {!MDContent && <MarkdownSkeleton />}
      {/* 文档内容 */}
      {MDContent && (
        <div className="mx-auto flex flex-col flex-wrap !max-w-detail-content pb-10 overflow-wrap-anywhere">
          {/* 文档标题 */}
          <div className="flex flex-col gap-10 max-md:gap-4">
            <div className="text-4xl font-black">在浏览器中使用 js 获取视频和图片的信息</div>
            <div className="text-secondary">
              本文简单介绍了如何在浏览器中使用 js 获取视频和图片大小、视频时长等信息，同时提供 ts
              版本的实现
            </div>
            <div className="text-secondary text-sm">发布于 星期五，六月 6 2025</div>
          </div>

          {/* 文档内容 */}
          <MDViewer value={MDContent} ref={MDViewerRef} />
        </div>
      )}

      {/* pc目录 */}
      <div className="max-w-50 mx-auto max-h-100 max-md:hidden shrink-0 sticky right-0 top-25">
        <AnchorList anchor={anchorListInfo} activeId={activeId} onClick={(id) => handleClick(id)} />
      </div>

      {/* 手机端目录 */}
      {hasMounted &&
        ReactDOM.createPortal(
          <div className="hidden fixed bottom-22 right-8 rounded-xl max-w-50 mx-auto max-h-100 max-md:flex shrink-0 z-35">
            <KlDropdown
              items={ContentViewerDropdownItems}
              trigger={ContentViewerDropdownTrigger}
            ></KlDropdown>
          </div>,
          document.body
        )}
    </div>
  )
}
