import { clm } from '@/utils'
import { Pagination, PaginationProps } from '@heroui/react'

const defaultStyles = clm(
  'bg-lighterBgPrimary dark:bg-darkerBgPrimary',
  'hover:bg-hoverColor [&[data-hover=true]:not([data-active=true])]:bg-hoverColor',
  'dark:hover:bg-darkHoverColor dark:[&[data-hover=true]:not([data-active=true])]:bg-darkHoverColor'
)

export const KlPagination = (props: PaginationProps) => {
  return (
    <Pagination
      isCompact
      showControls
      showShadow
      classNames={{
        base: 'hover:cursor-pointer',
        item: defaultStyles,
        prev: defaultStyles,
        next: defaultStyles,
        cursor: ' bg-primary dark:bg-bgPrimary text-darkprimary dark:text-primary'
      }}
      {...props}
    />
  )
}
