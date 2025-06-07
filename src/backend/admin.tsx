'use client'

import React, { useEffect, useState } from 'react'
import { BACKENG_MOBILE_OFF_TEXT } from '@/constants/info'

interface AdminPropsType {
  children: React.ReactNode
}

export const Admin = ({ children }: AdminPropsType) => {
  const [isPhone, setInnerWidth] = useState(true)

  useEffect(() => {
    const resizeHandler = () => {
      setInnerWidth(window.innerWidth <= 768)
    }

    // 初始化时调用一次
    resizeHandler()

    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <>
      {/* PC端显示 */}
      {!isPhone && <div className="min-h-[calc(100vh-64px)]">{children}</div>}

      {/* 手机端禁用提示 */}
      {isPhone && (
        <div className="grid place-content-center min-h-[calc(100vh-64px)]">
          <div className="flex flex-col items-center -mt-30 text-secondary dark:text-darksecondary">
            <span className="text-[150px]">{BACKENG_MOBILE_OFF_TEXT.ICON}</span>
            <div className="flex flex-col items-center gap-1 text-xl">
              <span>{BACKENG_MOBILE_OFF_TEXT.TEXT_1}</span>
              <span>{BACKENG_MOBILE_OFF_TEXT.TEXT_2}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
