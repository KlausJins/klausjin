import { clm } from '@/utils'
import { Dialog } from 'radix-ui'
import React from 'react'

// 抽屉Root组件
export const KlSheetRoot = Dialog.Root

// 抽屉内容触发器
export const KlSheetTrigger = Dialog.Trigger

// 抽屉内容传送器
export const KlSheetPortal = Dialog.Portal

// 抽屉关闭
export const KlSheetClose = Dialog.Close

// 抽屉标题组件
export const KlSheetTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Title
      ref={ref}
      className={clm(' flex justify-between items-center font-bold text-xl', className)}
      {...props}
    />
  )
})
KlSheetTitle.displayName = Dialog.Title.displayName

// 抽屉描述组件
export const KlSheetDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => {
  return <Dialog.Description ref={ref} className={clm('text-secondary', className)} {...props} />
})
KlSheetDescription.displayName = Dialog.Description.displayName

// 抽屉遮罩组件
export const KlSheetOverlay = React.forwardRef<
  React.ComponentRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Overlay
      ref={ref}
      className={clm(
        'z-50 fixed inset-0 bg-darkBgPrimary/60 data-[state=open]:animate-sheetOverlay-fade-in data-[state=closed]:animate-sheetOverlay-fade-out',
        className
      )}
      {...props}
    />
  )
})
KlSheetOverlay.displayName = Dialog.Overlay.displayName

// 抽屉内容组件
export const KlSheetContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Portal>
      <KlSheetOverlay />
      <Dialog.Content
        ref={ref}
        className={clm(
          'z-50 fixed left-0 top-0 h-[100vh] w-[80vw] rounded-r-xl bg-gray1 p-6 bg-bgPrimary dark:bg-darkBgPrimary border-r-1 border-borderColor dark:border-darkHoverColor data-[state=open]:animate-sheet-fade-in data-[state=closed]:animate-sheet-fade-out',
          className
        )}
        {...props}
      />
    </Dialog.Portal>
  )
})
KlSheetContent.displayName = Dialog.Content.displayName
