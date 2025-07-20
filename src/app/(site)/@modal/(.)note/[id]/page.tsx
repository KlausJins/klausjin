import ModalDetail from '@/features/note/modal-detail'

export default async function NoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const paramsInfo = await params

  return (
    <>
      <ModalDetail id={paramsInfo.id} />
    </>
  )
}
