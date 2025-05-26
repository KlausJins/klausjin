import { ContainerLayout } from '@/components/container-layout/container-layout'
import { GoBackToTop } from '@/components/goback-to-top'
import { NoteInfo } from '@/features/note/note-info'

export default function NoteDetail() {
  return (
    <ContainerLayout>
      <NoteInfo />

      <GoBackToTop />
    </ContainerLayout>
  )
}
