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
import { getNoteDetail } from '@/actions/backend'
import { formatTime } from '@/utils'
import { IconEmptyNoteDetail } from '@/components/icons/icon-empty-note-detail'
import { replaceMarkdownOssImages } from '@/utils/oss'

type noteDetailInfo = {
  id: string
  title: string
  description: string
  author?: string
  cover?: string
  published?: boolean
  tags: { name: string; icon: string | null; iconDark: string | null }[]
  createDate: string
  createTime: string
}

export const ContentViewer = ({ id }: { id: string }) => {
  const [MDContent, setMDContent] = useState('')
  const [activeId, setActiveId] = useState<string>('')
  const MDViewerRef = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const [hasContent, setHasContent] = useState<boolean>(false)
  const { anchorListInfo, setAnchorListInfo } = useGenerateDocDir(setActiveId)
  // 页面数据
  const [noteDetailInfo, setNoteDetailInfo] = useState<noteDetailInfo>()

  const ContentViewerDropdownTrigger = useMemo(
    () => (
      <KlButton isIconOnly={true} className="size-8">
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
    ;(async () => {
      // 先判断笔记的发布状态
      // 确认发布状态无误后再展示
      const res = await getNoteDetail(id)
      // console.log('getNoteDetail res: ', res)
      if (res) {
        // 保存笔记其余信息
        const handled_info: noteDetailInfo = {
          id: res.id,
          title: res.title,
          description: res.description,
          published: res.published,
          tags: res.tags.map((item) => ({
            name: item.name,
            icon: item.icon,
            iconDark: item.iconDark
          })),
          createDate: formatTime(res.createdAt, 'dddd'),
          createTime: formatTime(res.createdAt, 'MMMM DD YYYY')
        }
        if (res.published) {
          // 如果笔记已经发布了就展示出来
          // 给笔记页赋值
          setNoteDetailInfo(handled_info)
          // 给文档的图片签名
          const newContent = await replaceMarkdownOssImages(res.content, 300)
          // 给MD文档赋值
          setMDContent(newContent)
        }
      }
      setHasContent(true)
    })()
  }, [id, setMDContent, setNoteDetailInfo])

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
        80
      )

      contentDetail.addEventListener('scroll', scrollHandler)
    }
    return () => {
      contentDetail?.removeEventListener('scroll', scrollHandler)
    }
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
      {/* 加载中的文档骨架屏 */}
      {!hasContent && <MarkdownSkeleton />}
      {/* 加载完成，但是没有找到笔记 */}
      {hasContent && !MDContent && (
        <div className="w-full p-10">
          <IconEmptyNoteDetail />
        </div>
      )}
      {/* 加载完成，找到笔记文档内容 */}
      {hasContent && MDContent && (
        <div className="mx-auto flex flex-col flex-wrap !max-w-detail-content pb-10 overflow-wrap-anywhere">
          {/* 文档标题 */}
          <div className="flex flex-col gap-10 max-md:gap-4">
            <div className="text-4xl font-black">{noteDetailInfo?.title}</div>
            <div className="text-secondary">{noteDetailInfo?.description}</div>
            <div className="text-secondary text-sm">
              {`发布于 ${noteDetailInfo?.createDate}，${noteDetailInfo?.createTime}`}
            </div>
          </div>
          {/* 文档内容 */}
          <MDViewer value={MDContent} ref={MDViewerRef} />

          {/* 标签内容 */}
          <div className="flex gap-2 mt-20">
            {noteDetailInfo?.tags.map((item) => (
              <KlButton key={item.name} className="h-10 gap-1">
                {item.icon && (
                  <img className="flex dark:hidden w-4" src={item.icon} alt={item.name} />
                )}
                {item.iconDark && (
                  <img className="hidden dark:flex w-4" src={item.iconDark} alt={item.name} />
                )}
                <div>{item.name}</div>
              </KlButton>
            ))}
          </div>
        </div>
      )}

      {/* pc目录 */}
      {hasContent && MDContent && (
        <div className="max-w-50 mx-auto max-h-[80vh] max-md:hidden shrink-0 sticky right-0 top-25 overflow-auto">
          <AnchorList
            anchor={anchorListInfo}
            activeId={activeId}
            onClick={(id) => handleClick(id)}
          />
        </div>
      )}

      {/* 手机端目录 */}
      {hasMounted &&
        hasContent &&
        MDContent &&
        ReactDOM.createPortal(
          <div className="hidden fixed bottom-20 right-8 rounded-xl max-w-50 mx-auto max-h-100 max-md:flex shrink-0 z-35 size-8">
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
