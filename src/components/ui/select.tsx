import { clm } from '@/utils'
import { Select } from 'radix-ui'
import React from 'react'
import IconSelf from '../icons/icon-self'

// 下拉框根组件
export const KlSelect = Select.Root

// 下拉框内容组件
export const KlSelectPortal = Select.Portal
// 下拉框内容组件
export const KlSelectValue = Select.Value
// 下拉框内容组件
export const KlSelectIcon = Select.Icon

// 下拉框触发器组件
export const KlSelectTrigger = React.forwardRef<
  React.ComponentRef<typeof Select.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select.Trigger>
>(({ children, className, ...props }) => {
  return (
    <Select.Trigger
      className={clm(
        'box-border inline-flex w-80 h-9 text-sm items-center justify-between border-1 rounded-lg px-3 outline-none',
        'text-primary dark:text-darkprimary bg-bgPrimary dark:bg-darkBgPrimary border-borderColor dark:border-darkBorderColor',
        'focus:shadow-[0_0_0_1px_rgba(39,39,42,1)] dark:focus:shadow-[0_0_0_1px_rgba(227,227,228,1)] hover:cursor-pointer',
        'text-secondary dark:text-darkSecondary',
        className
      )}
      {...props}
    >
      {children}
      <Select.Icon className="flex justify-center items-center">
        <IconSelf iconName="icon-[lucide--chevron-down]" />
      </Select.Icon>
    </Select.Trigger>
  )
})
KlSelectTrigger.displayName = Select.Trigger.displayName

// 下拉框内容组件
export const KlSelectContent = React.forwardRef<
  React.ComponentRef<typeof Select.Content>,
  React.ComponentPropsWithoutRef<typeof Select.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <Select.Portal>
      <Select.Content
        ref={ref}
        position="popper"
        className={clm(
          'overflow-hidden relative top-1 z-20 w-80 max-h-50 rounded-lg min-w-32 border-1 shadow-md',
          'border-borderColor dark:border-darkBorderColor bg-bgPrimary dark:bg-darkBgPrimary animate-fade-down',
          className
        )}
        {...props}
      >
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center text-primary dark:text-darkprimary bg-bgPrimary dark:bg-darkBgPrimary">
          <IconSelf iconName="icon-[lucide--chevron-up]" />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px] ">{children}</Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center text-primary dark:text-darkprimary bg-bgPrimary dark:bg-darkBgPrimary">
          <IconSelf iconName="icon-[lucide--chevron-down]" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  )
})
KlSelectContent.displayName = Select.Content.displayName

// 下拉框项组件
export const KlSelectItem = React.forwardRef<
  React.ComponentRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <Select.Item
      ref={ref}
      className={clm(
        'relative flex h-8 select-none items-center rounded-lg pl-[25px] pr-[35px] text-sm leading-none text-primary dark:text-darkprimary data-[disabled]:pointer-events-none data-[highlighted]:bg-hoverColor data-[highlighted]:outline-none hover:cursor-pointer dark:data-[highlighted]:bg-darkHoverColor',
        className
      )}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <IconSelf iconName="icon-[lucide--check]" />
      </Select.ItemIndicator>
    </Select.Item>
  )
})
KlSelectItem.displayName = Select.Item.displayName
