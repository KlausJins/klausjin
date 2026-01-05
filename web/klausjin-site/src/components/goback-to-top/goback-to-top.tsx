'use client'

import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import { useScroll } from '@/hooks'
import { clm } from '@/utils'

interface IGoBackToTopProps {
  className?: string
}

export const GoBackToTop = ({ className }: IGoBackToTopProps) => {
  const scrollDisstance = useScroll({ isThrottle: true })

  return (
    <div
      data-state={scrollDisstance >= 100 ? 'show' : 'unshow'}
      className={clm(
        'flex fixed bottom-8 right-8 z-10 data-[state=show]:animate-opacity-in data-[state=unshow]:animate-opacity-out',
        scrollDisstance >= 100 ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
    >
      <KlButton isIconOnly={true} onPress={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <IconSelf iconName="icon-[lucide--chevron-up]" size="text-2xl" />
      </KlButton>
    </div>
  )
}
