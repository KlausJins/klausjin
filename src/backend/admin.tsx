'use client'

import React, { useEffect, useState } from 'react'

interface AdminPropsType {
  children: React.ReactNode
}

export const Admin = ({ children }: AdminPropsType) => {
  const [isPhone, setInnerWidth] = useState(true)

  useEffect(() => {
    const resizeHandler = () => {
      setInnerWidth(window.innerWidth <= 768)
    }

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
          <div className="flex flex-col items-center gap-4 text-lg text-primary dark:text-darkprimary">
            <span>手机端暂时不支持登录后台</span>
            <span>请使用电脑端登录使用</span>
          </div>
        </div>
      )}
    </>
  )
}
