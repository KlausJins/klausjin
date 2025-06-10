'use client'
import { clm } from '@/utils'
import React from 'react'

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Field = React.forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const { type = 'text', placeholder, required, className } = props
  return (
    <input
      ref={ref}
      className={clm(
        'box-border inline-flex h-9  w-full items-center justify-center border-1 rounded-lg px-3 outline-none',
        'placeholder:text-sm placeholder:text-secondary dark:placeholder:text-darksecondary',
        'text-primary dark:text-darkprimary bg-bgPrimary dark:bg-darkBgPrimary border-borderColor dark:border-darkBorderColor',
        'focus:shadow-[0_0_0_1px_rgba(39,39,42,1)] dark:focus:shadow-[0_0_0_1px_rgba(227,227,228,1)]',
        className
      )}
      type={type}
      required={required}
      placeholder={placeholder}
    />
  )
})
Field.displayName = 'Field'

export default Field
