import { Chip, ChipProps } from '@heroui/react'

export const KlChip = ({ children, size = 'sm', variant = 'flat', ...props }: ChipProps) => {
  return (
    <Chip
      classNames={{
        base: 'capitalize text-darkprimary dark:text-primary bg-darkerBgPrimary dark:bg-lighterBgPrimary',
        content: 'font-semibold'
      }}
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </Chip>
  )
}
