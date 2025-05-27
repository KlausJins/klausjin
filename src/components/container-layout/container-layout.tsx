import { clm } from '@/utils'
import React from 'react'

interface IContainerLayoutProps {
  children: React.ReactNode
  className?: string
}

export const ContainerLayout = ({ children, className }: IContainerLayoutProps) => {
  return (
    <div
      className={clm(
        'min-h-[calc(100vh-64px)] px-25 max-md:px-10 py-5 container m-auto',
        className
      )}
    >
      {children}
    </div>
  )
}
