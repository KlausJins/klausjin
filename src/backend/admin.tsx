'use client'

import React, { useEffect, useState } from 'react'
import { MobileOff } from './mobile-off'

interface AdminPropsType {
  children: React.ReactNode
}

export const Admin = ({ children }: AdminPropsType) => {
  const [isPhone, setInnerWidth] = useState(false)

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
      {isPhone && <MobileOff />}
    </>
  )
}
