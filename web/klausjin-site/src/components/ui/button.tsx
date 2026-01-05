'use client'
import { Button, ButtonProps, PressEvent } from '@heroui/react'
import { clm } from '@/utils'
import React from 'react'

interface PropsType extends ButtonProps {
  className?: string
  onPress?: (e: PressEvent) => void
  isIconOnly?: boolean
  fill?: boolean
}

const buttonDefaultStyle =
  'flex items-center justify-center border-1 h-9 border-borderColor dark:border-darkBorderColor rounded-[10px] text-primary dark:text-darkprimary disabled:pointer-events-none disabled:opacity-50 bg-bgPrimary dark:bg-darkBgPrimary hover:bg-hoverColor dark:hover:bg-darkHoverColor outline-0'

const buttonFillStyle =
  'border-none text-sm font-semibold px-4 h-9 text-darkprimary dark:text-primary bg-darkBgPrimary dark:bg-bgPrimary active:bg-activeColor dark:active:bg-darkActiveColor hover:bg-darkBgPrimary/95 dark:hover:bg-bgPrimary/95'

const KlButton = React.forwardRef<HTMLButtonElement, PropsType>((props, ref) => {
  const { children, className, onPress, isIconOnly = false, fill = false, ...prop } = props

  return (
    <Button
      ref={ref}
      variant="bordered"
      size={isIconOnly ? 'sm' : 'md'}
      className={clm(
        buttonDefaultStyle,
        fill && buttonFillStyle,
        isIconOnly && 'size-8',
        className
      )}
      onPress={(e) => onPress?.(e)}
      isIconOnly={isIconOnly}
      {...prop}
    >
      {children}
    </Button>
  )
})
KlButton.displayName = 'KlButton'

export default KlButton
