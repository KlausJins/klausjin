import { clm } from '@/utils'
import { Textarea, TextAreaProps } from '@heroui/react'

const KlTextarea = ({ variant = 'bordered', ...props }: TextAreaProps) => {
  return (
    <Textarea
      disableAnimation
      isClearable
      classNames={{
        base: 'w-full',
        label: '!text-primary dark:!text-darkprimary',
        inputWrapper: clm(
          'h-9 pt-6 border-borderColor dark:border-darkBorderColor border-1 shadow-none',
          'bg-bgPrimary dark:bg-darkBgPrimary',
          'data-[hover=true]:border-darkBgPrimary dark:data-[hover=true]:border-bgPrimary',
          'group-data-[focus=true]:border-darkBgPrimary dark:group-data-[focus=true]:border-bgPrimary'
        ),
        input: 'resize-y min-h-20'
      }}
      variant={variant}
      {...props}
    />
  )
}
KlTextarea.displayName = 'KlTextarea'

export default KlTextarea
