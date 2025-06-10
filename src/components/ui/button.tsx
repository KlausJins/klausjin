'use client'
import { clm } from '@/utils'
import React from 'react'

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  filled?: string
}

const buttonDefaultStyle =
  'flex items-center justify-center border-1 border-borderColor dark:border-darkBorderColor rounded-[10px] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:cursor-pointer bg-bgPrimary dark:bg-darkBgPrimary hover:bg-hoverColor dark:hover:bg-darkHoverColor p-[6px] outline-0'

const buttonFillStyle =
  'border-none text-sm font-semibold px-4 h-9 text-darkprimary dark:text-primary bg-darkBgPrimary dark:bg-bgPrimary active:bg-activeColor dark:active:bg-darkActiveColor hover:bg-darkBgPrimary/95 dark:hover:bg-bgPrimary/95'

const Button = React.forwardRef<HTMLButtonElement, PropsType>((props, ref) => {
  const { children, className, filled } = props
  return (
    <button
      ref={ref}
      {...props}
      className={clm(buttonDefaultStyle, filled == 'true' && buttonFillStyle, className)}
    >
      {children}
    </button>
  )
})
Button.displayName = 'Button'

export default Button
