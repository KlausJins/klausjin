'use client'

import IconSelf from '@/components/icons/icon-self'
import { addKeyframe, clm, removeBodyKeyframe } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { NoteInfo } from './note-info'

const ModalDetail = () => {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const overLayRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const rect = JSON.parse(sessionStorage.getItem('modalRect') || 'null')
  //   const modal = modalRef.current
  //   const overLay = overLayRef.current

  //   if (overLay) {
  //     overLay.style.opacity = '0'

  //     requestAnimationFrame(() => {
  //       overLay.style.transition = 'opacity 0.5s ease'
  //       overLay.style.opacity = '1'
  //     })
  //   }

  //   if (rect && modal) {
  //     const { top, left, width, height } = rect
  //     addKeyframe(`
  //       @keyframes opacity-in-111 {
  //         60% {
  //           opacity: 1;
  //         }
  //         100% {
  //           opacity: 0;
  //           color: transparent;
  //         }
  //       }`)
  //     console.log('top, left, width, height: ', top, left, width, height)
  //     modal.style.position = 'absolute'
  //     modal.style.top = `${top}px`
  //     modal.style.left = `${left}px`
  //     modal.style.width = `${width}px`
  //     modal.style.height = `${height}px`
  //     // modal.style.opacity = '1'
  //     modal.style.transform = 'none'

  //     requestAnimationFrame(() => {
  //       modal.style.transition = 'all 0.5s ease'
  //       // modal.style.top = '50%'
  //       // modal.style.left = '50%'
  //       modal.style.width = '80vw'
  //       modal.style.height = '92vh'
  //       // modal.style.opacity = '1'
  //       // modal.style.transform = 'translate(-50%, -50%)'
  //     })
  //   }
  // }, [])

  const closePage = () => {
    const modal = modalRef.current
    const overLay = overLayRef.current
    const rect = JSON.parse(sessionStorage.getItem('modalRect') || 'null')

    if (overLay) {
      overLay.style.opacity = '0'
    }

    if (rect && modal) {
      const { top, left, width, height } = rect
      modal.style.animation = 'opacity-in-111 0.5s ease forwards'
      modal.style.top = `${top}px`
      modal.style.left = `${left}px`
      modal.style.width = `${width}px`
      modal.style.height = `${height}px`
      // modal.style.opacity = '0'
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
      router.back()
      removeBodyKeyframe()
    }
  }

  // 阻止滚动，并且防止页面闪烁
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [document])

  return (
    <div className="inset-0 absolute z-20">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-darkBgPrimary/10 dark:bg-darkBgPrimary/10"
        ref={overLayRef}
        onClick={() => closePage()}
      ></div>

      {/* 笔记弹窗 */}
      <div
        className={clm(
          'absolute container m-auto bg-bgPrimary dark:bg-darkerBgPrimary',
          'w-[80vw] h-[92vh] rounded-3xl overflow-auto px-6 py-6 pt-0',
          'max-md:!w-[100vw] max-md:!h-[100vh] max-md:rounded-none',
          'max-md:!top-0 will-change-transform'
        )}
        ref={modalRef}
      >
        <div className="sticky top-0 flex justify-center items-center pt-4 pb-2 z-10">
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
      </div>
    </div>
  )
}

export default ModalDetail
