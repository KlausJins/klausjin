import { ContentViewer } from './content-viewer'

export const NoteInfo = ({ id }: { id?: string }) => {
  return (
    <>
      <ContentViewer id={id || 'test'} />
    </>
  )
}
