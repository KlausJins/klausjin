'use client'

import IconSelf from '@/components/icons/icon-self'
import { clm } from '@/utils'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import { NoteInfo } from './note-info'
import { useCloseModal, useIsMobile, useListenModalOpen, usePreventPageScroll } from './modal-hooks'

const ModalDetail = () => {
  const modalRef = useRef<HTMLDivElement>(null)
  const overLayRef = useRef<HTMLDivElement>(null)

  // 监听判断是否为移动端
  const { isMobile } = useIsMobile()

  // 监听 modal 的宽度大小状态，如果打开或者宽度大小改变则添加或运行动画
  useListenModalOpen({
    modalRef,
    overLayRef,
    isMobile
  })

  // 关闭 modal 方法
  const { closePage } = useCloseModal({
    modalRef,
    overLayRef,
    isMobile
  })

  // 阻止页面来回滚动，并且防止页面闪烁
  usePreventPageScroll()

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
          id="content-detail"
          className={clm(
            'fixed container m-auto bg-bgPrimary dark:bg-darkerBgPrimary',
            'w-[80vw] h-[92vh] rounded-3xl overflow-auto py-6 pt-0 z-30',
            isMobile && '!top-0 !w-[100vw] !h-[100vh] rounded-none'
          )}
          ref={modalRef}
        >
          <div className="sticky top-0 flex justify-center items-center pt-4 pb-2 z-10 bg-bgPrimary dark:bg-darkerBgPrimary">
            {/* 默认标题 */}
            <div className="text-xl font-black">笔记</div>
            {/* 关闭按钮 */}
            <div className="flex hover:cursor-pointer absolute right-6" onClick={() => closePage()}>
              <IconSelf iconName="icon-[lucide--x]" />
            </div>
          </div>

          {/* 笔记内容 */}
          <div className="relative min-h-[92%] w-full px-6">
            <NoteInfo />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default ModalDetail
