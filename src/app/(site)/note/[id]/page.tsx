import { getNoteTitleDesc } from '@/actions/backend'
import { ContainerLayout } from '@/components/container-layout/container-layout'
import { GoBackToTop } from '@/components/goback-to-top'
import { NoteInfo } from '@/features/note/note-info'
import { Metadata } from 'next'

// 动态生成标签页名称
export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const params = await props.params
  const note = await getNoteTitleDesc(params.id)

  if (!note) {
    return {}
  }

  const { title, description, tags } = note

  return {
    title,
    description,
    keywords: tags.map((el) => el.name).join(',')
  }
}

export default async function NoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const paramsInfo = await params

  return (
    <ContainerLayout>
      <NoteInfo id={paramsInfo.id} />

      <GoBackToTop />
    </ContainerLayout>
  )
}
