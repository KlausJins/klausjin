import { GoBackToTop } from '@/components/goback-to-top'
import { CardList } from '@/features/note/card-list'
import { NoteCard } from '@/components/note-card'

export default function Note() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-25 max-md:px-10 py-5 container m-auto">
      {/* 标题 */}
      <h1 className="text-4xl max-md:text-3xl font-black mb-8">笔记</h1>

      {/* 卡片列表 */}
      <CardList>
        {/* 卡片内容 */}
        <NoteCard className="animate-fade-up animate-ease-in-out" />
        <NoteCard className="animate-fade-up animate-ease-in-out animate-delay-[200ms]" />
        <NoteCard className="animate-fade-up animate-ease-in-out animate-delay-[400ms]" />
        <NoteCard className="animate-fade-up animate-ease-in-out animate-delay-[600ms]" />
      </CardList>

      {/* 回到顶部按钮 */}
      <GoBackToTop />
    </div>
  )
}
