'use client'

import { getNotesList } from '@/actions/site'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      await getNotesList().then((res) => {
        console.log(res)
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
      // 加载中
      return '加载中'
    } else {
      // 加载完成
      if (notesList?.length > 0) {
        // 有笔记数据
        return (
          <>
            {notesList.map((item, index) => (
              <NoteCard
                key={item.id}
                className={clm(
                  'animate-fade-up animate-ease-in-out',
                  `animate-delay-[${index * 200}ms]`
                )}
                noteCardInfo={item}
              />
            ))}
          </>
        )
      } else {
        // 无笔记数据
        return null
      }
    }
  }

  return (
    <div>
      {/* 标题 */}
      <h1 className="text-4xl max-md:text-3xl font-black mb-8">笔记</h1>

      {/* 卡片列表 */}
      <CardList>
        {/* 卡片内容 */}
        {gatNoteCardNode()}
      </CardList>
    </div>
  )
}
