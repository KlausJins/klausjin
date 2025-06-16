'use client'
import React from 'react'
import { Input, InputProps } from '@heroui/input'
import { clm } from '@/utils'

interface InputPropsType extends InputProps {
  inputWrapper_className?: string
}

const Field = React.forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const { variant = 'bordered', isClearable = true, inputWrapper_className, ...rest } = props
  return (
    <Input
      ref={ref}
      classNames={{
        inputWrapper: clm(
          'h-9 border-borderColor dark:border-darkBorderColor border-1 shadow-none ',
          'bg-bgPrimary dark:bg-darkBgPrimary',
          'data-[hover=true]:border-borderColor dark:data-[hover=true]:border-darkBorderColor',
          'data-[focus=true]:border-borderColor dark:data-[focus=true]:border-darkBorderColor',
          inputWrapper_className
        ),
        input:
          'text-primary dark:text-darkprimary placeholder:text-secondary dark:placeholder:text-darksecondary'
      }}
      variant={variant}
      isClearable={isClearable}
      {...rest}
    />
  )
})
Field.displayName = 'Field'

export default Field
