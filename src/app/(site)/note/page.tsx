import { GoBackToTop } from '@/components/goback-to-top'

export default function Note() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-35 max-md:px-10 py-10">
      <h1 className="text-4xl max-md:text-3xl font-black">笔记</h1>
      <div className="mt-6">笔记内容</div>
      <GoBackToTop />
    </div>
  )
}
