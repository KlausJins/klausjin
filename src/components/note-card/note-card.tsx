'use client'

import { clm } from '@/utils'
import IconSelf from '@/components/icons/icon-self'
import Link from 'next/link'
import { NotesListType } from '@/features/note/section'

interface INoteCardProps {
  className?: string
  noteCardInfo: NotesListType
}

export const NoteCard = ({ className, noteCardInfo }: INoteCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    sessionStorage.setItem('modalRect', JSON.stringify(rect))
    sessionStorage.setItem('scrollY', window.scrollY.toString())
  }

  // 处理并展示笔记标签列表
  const showTagsList = (tags: NotesListType['tags']) => {
    const tagsListNode = tags.map((item) => ({
      name: item.name,
      icon: item.icon || '',
      iconDark: item.iconDark || ''
    }))

    return (
      <>
        {tagsListNode.map((item) => (
          <div key={item.name} className="flex items-center gap-1 font-medium">
            <span>#</span>
            <span>{item.name}</span>
            {item.icon && (
              <img className="flex dark:hidden size-4" src={item.icon} alt={item.name} />
            )}
            {item.iconDark && (
              <img className="hidden dark:flex size-4" src={item.iconDark} alt={item.name} />
            )}
          </div>
        ))}
      </>
    )
  }

  return (
    <Link
      href={`/note/${noteCardInfo.id}`}
      className={clm(
        'flex flex-col px-6 py-4 rounded-xl justify-between',
        'hover:bg-lighterBgPrimary dark:hover:bg-darkerBgPrimary active:bg-lighterBgPrimary dark:active:bg-darkerBgPrimary hover:cursor-pointer',
        className
      )}
      onClick={(e) => handleClick(e)}
    >
      {/* 笔记标签 */}
      <div className="hidden max-md:flex items-center flex-wrap gap-4 mb-2 text-xs text-content dark:text-darkContent">
        {/* 标签内容 */}
        {showTagsList(noteCardInfo.tags)}
      </div>

      {/* 笔记标题 */}
      <div className="text-xl font-black">{noteCardInfo.title}</div>

      {/* 笔记描述 */}
      <div className="text-sm text-content dark:text-darkContent my-4">
        {noteCardInfo.description}
      </div>

      {/* 笔记注脚内容 */}
      <div className="text-xs text-content dark:text-darkContent flex flex-wrap items-center justify-between gap-2">
        <div className="flex max-md:hidden items-center flex-wrap gap-4 text-xs text-content dark:text-darkContent">
          {/* 标签内容 */}
          {showTagsList(noteCardInfo.tags)}
        </div>
        {/* 笔记的创建时间 */}
        <div className="flex items-center gap-1">
          <IconSelf iconName="icon-[lucide--calendar]" size="text-md" />
          <span>{noteCardInfo.createdTime}</span>
        </div>
      </div>
    </Link>
  )
}
