'use client'
import { clm } from '@/utils'
import React from 'react'

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const buttonDefaultStyle =
  'flex items-center justify-center border-1 border-borderColor dark:border-darkBorderColor rounded-[10px] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:cursor-pointer bg-bgPrimary dark:bg-darkBgPrimary hover:bg-hoverColor dark:hover:bg-darkHoverColor p-[6px] outline-0'

const Button = React.forwardRef<HTMLButtonElement, PropsType>((props, ref) => {
  const { children, className } = props
  return (
    <button ref={ref} {...props} className={clm(buttonDefaultStyle, className)}>
      {children}
    </button>
  )
})
Button.displayName = 'Button'

export default Button
