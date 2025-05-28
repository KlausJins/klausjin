'use client'

import IconSelf from '@/components/icons/icon-self'
import { addKeyframe, clm, removeBodyKeyframe } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { NoteInfo } from './note-info'

const ModalDetail = () => {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const overLayRef = useRef<HTMLDivElement>(null)

  // 判断是否为移动端
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
        modal.style.transform = 'translate(-50%, 0%)'
        modal.style.animation = 'opacity-in 0.3s ease'
        overLay.style.animation = 'opacity-in 0.3s ease'
      }
    }
  }, [isMobile])

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
          modal.style.animation = 'opacity-out 3.3s ease'
          overLay.style.animation = 'opacity-out 3.3s ease'

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

  // 阻止滚动，并且防止页面闪烁
  useEffect(() => {
    const scrollY = +sessionStorage.getItem('scrollY')!
    console.log(scrollY)
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

  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="absolute inset-0 bg-darkBgPrimary/10 dark:bg-darkBgPrimary/10 z-30"
          ref={overLayRef}
          onClick={() => closePage()}
        ></div>,
        document.body
      )}

      {ReactDOM.createPortal(
        <div
          className={clm(
            'fixed container m-auto bg-bgPrimary dark:bg-darkerBgPrimary',
            'w-[80vw] h-[92vh] rounded-3xl overflow-auto px-6 py-6 pt-0 z-30',
            'max-md:!w-[100vw] max-md:!h-[100vh] max-md:rounded-none will-change-transform',
            isMobile && 'max-md:!top-0 max-md:left-[50%]'
          )}
          ref={modalRef}
        >
          <div className="sticky top-0 flex justify-center items-center pt-4 pb-2 z-10 bg-bgPrimary dark:bg-darkerBgPrimary">
            {/* 默认标题 */}
            <div className="text-xl font-black">笔记</div>
            {/* 关闭按钮 */}
            <div className="flex hover:cursor-pointer absolute right-0" onClick={() => closePage()}>
              <IconSelf iconName="icon-[lucide--x]" />
            </div>
          </div>

          {/* 笔记内容 */}
          <div className=" relative min-h-[92%] w-full">
            <NoteInfo />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default ModalDetail
