import { clm } from '@/utils/normal'
import { DropdownMenu } from 'radix-ui'
import React from 'react'

// 下拉列表根组件
export const KlDropdownMenu = DropdownMenu.Root

// 下拉列表触发器组件
export const KlDropdownMenuTrigger = DropdownMenu.Trigger

// 下拉列表内容组件
export const KlDropdownMenuPortal = DropdownMenu.Portal

// 下拉列表内容组件
export const KlDropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenu.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        ref={ref}
        className={clm(
          'z-50 mt-2 text-primary dark:text-darkprimary bg-bgPrimary dark:bg-darkBgPrimary border-borderColor dark:border-darkBorderColor border-1 rounded-xl shadow-lg w-35 px-2 py-2 flex flex-col animate-fade-down',
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
})
KlDropdownMenuContent.displayName = DropdownMenu.Content.displayName

// 下拉列表项组件
export const KlDropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenu.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <DropdownMenu.Item
      ref={ref}
      className={clm(
        'hover:bg-hoverColor dark:hover:bg-darkHoverColor hover:cursor-pointer outline-0 dark:text-darkprimary px-2 py-1 rounded-lg active:bg-activeColor dark:active:bg-darkActiveColor',
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  )
})
KlDropdownMenuItem.displayName = DropdownMenu.Item.displayName
