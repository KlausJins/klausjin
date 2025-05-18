'use client'

import IconSelf from '@/components/icons/icon-self'
import Button from '@/components/ui/button'
import { useScroll } from '@/hooks'
import { clm } from '@/utils/normal'

const GoBackToTop = () => {
  const scrollDisstance = useScroll({ isThrottle: true })

  return (
    <div
      data-state={scrollDisstance >= 100 ? 'show' : 'unshow'}
      className={clm(
        'fixed bottom-8 right-8 z-10 data-[state=show]:animate-opacity-in data-[state=unshow]:animate-opacity-out',
        scrollDisstance >= 100 ? 'opacity-100' : 'opacity-0'
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Button>
        <IconSelf iconName="icon-[lucide--chevron-up]" size="text-2xl" />
      </Button>
    </div>
  )
}

export default GoBackToTop
