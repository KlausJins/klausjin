import { clm } from '@/utils'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerProps,
  ModalBodyProps,
  ModalContentProps,
  ModalHeaderProps
} from '@heroui/react'
import React from 'react'

// 抽屉Root组件
export const KlDrawer = (props: DrawerProps) => {
  const { children, size = 'xs', placement = 'left', ...rest } = props
  return (
    <Drawer
      classNames={{
        closeButton: 'absolute top-6 right-6 rounded-lg p-0'
      }}
      size={size}
      placement={placement}
      {...rest}
    >
      {children}
    </Drawer>
  )
}
KlDrawer.displayName = Drawer.displayName

// 抽屉内容组件
export const KlDrawerContent = (props: ModalContentProps) => {
  const { className, children } = props
  return (
    <DrawerContent className={clm(className)} {...props}>
      {children}
    </DrawerContent>
  )
}
KlDrawerContent.displayName = DrawerContent.displayName

// 抽屉标题组件
export const KlDrawerHeader = (props: ModalHeaderProps) => {
  const { className, children } = props
  return (
    <DrawerHeader className={clm('flex flex-col gap-1', className)} {...props}>
      {children}
    </DrawerHeader>
  )
}
KlDrawerHeader.displayName = DrawerHeader.displayName

// 抽屉标题组件
export const KlDrawerBody = (props: ModalBodyProps) => {
  const { className, children } = props
  return (
    <DrawerBody className={clm(className)} {...props}>
      {children}
    </DrawerBody>
  )
}
KlDrawerBody.displayName = DrawerHeader.displayName
