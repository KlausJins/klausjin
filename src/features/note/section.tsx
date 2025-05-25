import { CardList, NoteCard } from '@/components/note-card'

export default function Section() {
  return (
    <div>
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
    </div>
  )
}
