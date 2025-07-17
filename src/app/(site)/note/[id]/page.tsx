import { ContainerLayout } from '@/components/container-layout/container-layout'
import { GoBackToTop } from '@/components/goback-to-top'
import { NoteInfo } from '@/features/note/note-info'

export default async function NoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const paramsInfo = await params

  return (
    <ContainerLayout>
      <NoteInfo id={paramsInfo.id} />

      <GoBackToTop />
    </ContainerLayout>
  )
}
