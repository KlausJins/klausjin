'use client'

import { getNotesList } from '@/actions/site'
import { IconEmptySite } from '@/components/icons/icon-empty-site'
import IconSiteLoading from '@/components/icons/icon-site-loading'
import { CardList, NoteCard } from '@/components/note-card'
import { clm, formatTime } from '@/utils'
import { useEffect, useState } from 'react'

export type NotesListType = {
  id: string
  createdTime: string
  title: string
  description: string
  tags: {
    name: string
    icon: string | null
    iconDark: string | null
  }[]
}

export default function Section() {
  const [notesList, setNotesList] = useState<NotesListType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      await getNotesList().then((res) => {
        // console.log(res)
        setNotesList(
          res.map((item) => ({
            id: item.id,
            createdTime: formatTime(item.createdAt, 'M月D，YYYY'),
            title: item.title,
            description: item.description,
            tags: item.tags
          }))
        )
        setIsLoading(false)
      })
    })()
  }, [setNotesList])

  // 处理笔记数据加载状态并返回元素信息
  const gatNoteCardNode = () => {
    if (isLoading) {
      // 加载中（目前数据少，加载快，暂不考虑加上加载中动画）
      return <div className="py-20">{<IconSiteLoading />}</div>
    } else {
      // 加载完成
      if (notesList?.length > 0) {
        // 有笔记数据
        return (
          <CardList>
            {notesList.map((item, index) => (
              <NoteCard
                key={item.id}
                className={clm(
                  'animate-fade-up animate-ease-in-out'
                  // `animate-delay-[${index * 200}ms]`
                )}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
                noteCardInfo={item}
              />
            ))}
          </CardList>
        )
      } else {
        // 无笔记数据
        if (isLoading) {
          return null
        } else {
          return (
            <div className="flex flex-col items-center justify-center">
              <IconEmptySite />
              <div className="text-2xl font-black">找不到笔记哦～</div>
            </div>
          )
        }
      }
    }
  }

  return (
    <div>
      {/* 标题 */}
      <h1 className="text-4xl max-md:text-3xl font-black mb-8">笔记</h1>

      {/* 卡片内容 */}
      {gatNoteCardNode()}
    </div>
  )
}
