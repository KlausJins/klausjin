import { addKeyframe, removeBodyKeyframe } from '@/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// 监听判断是否为移动端
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth
      setIsMobile(innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isMobile }
}

// 监听 modal 的宽度大小状态，如果打开或者宽度大小改变则添加或运行动画
export const useListenModalOpen = ({
  modalRef,
  overLayRef,
  isMobile
}: {
  modalRef: React.RefObject<HTMLDivElement | null>
  overLayRef: React.RefObject<HTMLDivElement | null>
  isMobile: boolean
}) => {
  useEffect(() => {
    const modal = modalRef.current
    const overLay = overLayRef.current

    if (!isMobile) {
      // 网页端动画
      const rect = JSON.parse(sessionStorage.getItem('modalRect') || 'null')

      if (overLay) {
        overLay.style.opacity = '0'

        requestAnimationFrame(() => {
          overLay.style.transition = 'opacity 0.5s ease'
          overLay.style.opacity = '1'
        })
      }

      if (rect && modal) {
        const { top, left, width, height } = rect

        addKeyframe(`
          @keyframes card-close {
            60% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              color: transparent;
            }
          }`)

        modal.style.position = 'fixed'
        modal.style.top = `${top}px`
        modal.style.left = `${left}px`
        modal.style.width = `${width}px`
        modal.style.height = `${height}px`
        modal.style.transform = 'none'

        requestAnimationFrame(() => {
          modal.style.transition = 'all 0.5s ease'
          modal.style.top = '50%'
          modal.style.left = '50%'
          modal.style.width = '80vw'
          modal.style.height = '92vh'
          modal.style.transform = 'translate(-50%, -50%)'
        })
      }
    } else {
      // 移动端动画
      if (modal && overLay) {
        modal.style.transform = 'translate(-50%, 0)'
        modal.style.left = '50%'
        // modal.style.animation = 'opacity-in 0.3s ease'
        // overLay.style.animation = 'opacity-in 0.3s ease'
      }
    }
  }, [isMobile])
}

// 返回关闭 modal 方法，并执行关闭动画
export const useCloseModal = ({
  modalRef,
  overLayRef,
  isMobile
}: {
  modalRef: React.RefObject<HTMLDivElement | null>
  overLayRef: React.RefObject<HTMLDivElement | null>
  isMobile: boolean
}) => {
  const router = useRouter()

  const closePage = () => {
    const modal = modalRef.current
    const overLay = overLayRef.current

    if (!isMobile) {
      const rect = JSON.parse(sessionStorage.getItem('modalRect') || 'null')

      if (overLay) {
        overLay.style.opacity = '0'
      }

      if (rect && modal) {
        const { top, left, width, height } = rect
        modal.style.animation = 'card-close 0.5s ease forwards'
        modal.style.top = `${top}px`
        modal.style.left = `${left}px`
        modal.style.width = `${width}px`
        modal.style.height = `${height}px`
        modal.style.transform = 'none'

        modal.addEventListener(
          'transitionend',
          () => {
            router.back()
            removeBodyKeyframe()
          },
          { once: true }
        )
      } else {
        // 移动端动画
        if (modal && overLay) {
          modal.style.animation = 'opacity-out 0.3s ease'
          overLay.style.animation = 'opacity-out 0.3s ease'

          modal.addEventListener(
            'animationend',
            () => {
              router.back()
            },
            { once: true }
          )
        }
      }
    } else {
      router.back()
      removeBodyKeyframe()
    }
  }

  return { closePage }
}

// 阻止页面来回滚动，并且防止页面闪烁
export const usePreventPageScroll = () => {
  useEffect(() => {
    const scrollY = +sessionStorage.getItem('scrollY')!
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.overflow = 'hidden'
    document.body.style.width = '100%'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.overflow = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [])
}
