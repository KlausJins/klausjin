import { ContainerLayout } from '@/components/container-layout/container-layout'
import { GoBackToTop } from '@/components/goback-to-top'
import { NoteInfo } from '@/features/note/note-info'

interface NoteDetailProps {
  params: {
    id: string
  }
}

export default async function NoteDetail({ params }: NoteDetailProps) {
  const paramsInfo = await params

  return (
    <ContainerLayout>
      <NoteInfo id={paramsInfo.id} />

      <GoBackToTop />
    </ContainerLayout>
  )
}
