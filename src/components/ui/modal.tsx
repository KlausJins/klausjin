'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@heroui/react'
import React, { ReactNode, useCallback, useEffect } from 'react'
import KlButton from './button'
import { clm } from '@/utils'

interface KlModalProps {
  children?: ReactNode
  title?: string
  content?: ReactNode
  open: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | undefined
  setOpen: (open: boolean) => void
  showConfirmButton?: boolean
  showCancelButton?: boolean
  confirmName?: string
  cancelName?: string
  isTitleCenter?: boolean
  backdrop?: 'transparent' | 'opaque' | 'blur'
  hideCloseButton?: boolean
  searchStyle?: boolean
  placement?: 'auto' | 'top' | 'center' | 'bottom'
  successCallback?: () => void
  cancelCallback?: () => void
  onCloseCallback?: () => void
}

export default function KlModal(props: KlModalProps) {
  const {
    children,
    title = '提示',
    content,
    open,
    setOpen,
    size = 'md',
    showConfirmButton = true,
    showCancelButton = true,
    confirmName = '确定',
    cancelName = '取消',
    isTitleCenter = false,
    backdrop = 'opaque',
    hideCloseButton = false,
    searchStyle = false,
    placement = 'auto',
    successCallback,
    cancelCallback,
    onCloseCallback
  } = props
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  // 成功回调
  const onAction = (onClose: () => void) => {
    if (successCallback) successCallback()
    onClose()
    // setOpen(false)
  }

  // 失败回调
  const onCancel = (onClose: () => void) => {
    if (cancelCallback) cancelCallback()
    onClose()
    // setOpen(false)
  }

  // 处理外部传入的open状态
  useEffect(() => {
    if (open) {
      onOpen()
    } else {
      onClose()
    }
  }, [open, onOpen, onClose])

  // 处理内部的isOpen状态，使其余关闭效果正常
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen, setOpen])

  // 当modal关闭时，调用外部传入的onCloseCallback
  const onModalChange = useCallback(
    (open: boolean) => {
      onOpenChange()
      if (!open && onCloseCallback) onCloseCallback()
    },
    [onOpenChange, onCloseCallback]
  )

  return (
    <>
      {children}
      <Modal
        isOpen={isOpen}
        onOpenChange={onModalChange}
        backdrop={backdrop}
        hideCloseButton={hideCloseButton}
        placement={placement}
        size={size}
        className=""
        classNames={{
          base: 'relative text-primary dark:text-darkprimary bg-bgPrimary dark:bg-darkBgPrimary',
          closeButton: 'hover:cursor-pointer',
          header: clm(searchStyle && '!hidden'),
          body: clm(searchStyle && 'pt-6', 'overflow-auto'),
          footer: clm(searchStyle && '!hidden')
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={clm('flex flex-col gap-1', isTitleCenter && 'items-center')}>
                {title}
              </ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>
                {/* 取消按钮 */}
                {showCancelButton && (
                  <Button
                    color="danger"
                    variant="light"
                    className="h-auto"
                    onPress={() => onCancel(onClose)}
                  >
                    {cancelName}
                  </Button>
                )}
                {/* 确认按钮 */}
                {showConfirmButton && (
                  <KlButton fill={true} onPress={() => onAction(onClose)}>
                    {confirmName}
                  </KlButton>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
