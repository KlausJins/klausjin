'use client'

import IconSelf from '@/components/icons/icon-self'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ModalDetail = () => {
  const router = useRouter()

  // 阻止滚动，并且防止页面闪烁
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.marginRight = '8px'

    return () => {
      document.body.style.overflow = ''
      document.body.style.marginRight = ''
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
      <div className="relative container m-auto top-[50%] transform translate-y-[-50%] bg-lighterBgPrimary dark:bg-darkerBgPrimary w-[80vw] h-[92vh] rounded-3xl overflow-hidden px-6 py-6">
        {/* 关闭按钮 */}
        <div
          className="absolute top-6 right-6 flex hover:cursor-pointer"
          onClick={() => closePage()}
        >
          <IconSelf iconName="icon-[lucide--x]" />
        </div>

        {/* 笔记内容 */}
        <div className="absolute">ModalDetail</div>
      </div>
    </div>
  )
}

export default ModalDetail
