'use client'

import React, { useEffect, useState } from 'react'
import { MobileOff } from './mobile-off'

interface AdminPropsType {
  children: React.ReactNode
}

export const Admin = ({ children }: AdminPropsType) => {
  const [isPhone, setInnerWidth] = useState<boolean | null>(null)

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

  if (isPhone == null) {
    // 返回空，等待状态确定
    return null
  } else {
    if (!isPhone) {
      {
        /* PC端显示 */
      }
      return <div className="min-h-[calc(100vh-64px)]">{children}</div>
    } else {
      {
        /* 手机端禁用提示 */
      }
      return <MobileOff />
    }
  }
}
