import { clm } from '@/utils/normal'
import React from 'react'

interface ICardListProps {
  children: React.ReactNode
  className?: string
}

export const CardList = ({ children, className }: ICardListProps) => {
  return (
    <div className={clm('grid grid-cols-2 max-md:grid-cols-1 gap-6', className)}>{children}</div>
  )
}
