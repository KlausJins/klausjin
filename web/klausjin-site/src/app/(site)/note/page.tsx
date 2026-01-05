import { GoBackToTop } from '@/components/goback-to-top'
import { ContainerLayout } from '@/components/container-layout'
import Section from '@/features/note/section'

export default function Note() {
  return (
    <ContainerLayout>
      <Section />

      {/* 回到顶部按钮 */}
      <GoBackToTop />
    </ContainerLayout>
  )
}
