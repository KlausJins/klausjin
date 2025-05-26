'use client'

import IconSelf from '@/components/icons/icon-self'
import { clm } from '@/utils/normal'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ModalDetail = () => {
  const router = useRouter()

  // 阻止滚动，并且防止页面闪烁
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [document])

  const closePage = () => {
    router.back()
  }

  return (
    <div className="inset-0 absolute z-20 animate-opacity-in">
      {/* 遮罩层 */}
      <div
        className="inset-0 absolute bg-darkBgPrimary/30 dark:bg-darkBgPrimary/60"
        onClick={() => closePage()}
      ></div>

      {/* 笔记弹窗 */}
      <div
        className={clm(
          'relative container m-auto top-[50%] transform translate-y-[-50%] bg-lighterBgPrimary dark:bg-darkerBgPrimary ',
          'w-[80vw] h-[92vh]  rounded-3xl overflow-auto px-6 py-6 pt-0',
          'max-md:w-[100vw] max-md:h-[100vh] max-md:rounded-none'
        )}
      >
        <div className="sticky top-0 flex justify-between items-center pt-4 pb-2 z-10 bg-lighterBgPrimary dark:bg-darkerBgPrimary">
          {/* 布局占用 */}
          <span></span>
          {/* 默认标题 */}
          <div className="text-xl font-black">笔记</div>
          {/* 关闭按钮 */}
          <div className="flex hover:cursor-pointer" onClick={() => closePage()}>
            <IconSelf iconName="icon-[lucide--x]" />
          </div>
        </div>

        {/* 笔记内容 */}
        <div className=" relative h-[120vh] w-full">ModalDetail</div>
      </div>
    </div>
  )
}

export default ModalDetail
