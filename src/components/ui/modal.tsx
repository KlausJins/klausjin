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
import React, { ReactNode, useEffect } from 'react'
import KlButton from './button'
import { clm } from '@/utils'

interface KlModalProps {
  children?: ReactNode
  title?: string
  content?: ReactNode
  open: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | undefined
  setOpen: (open: boolean) => void
  confirmName?: string
  cancelName?: string
  successCallback?: () => void
  cancelCallback?: () => void
}

export default function KlModal(props: KlModalProps) {
  const {
    children,
    title = '提示',
    content,
    open,
    setOpen,
    size = 'md',
    confirmName = '确定',
    cancelName = '取消',
    successCallback,
    cancelCallback
  } = props
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // 成功回调
  const onAction = (onClose: () => void) => {
    if (successCallback) successCallback()
    onClose()
    setOpen(false)
  }

  // 失败回调
  const onCancel = (onClose: () => void) => {
    if (cancelCallback) cancelCallback()
    onClose()
    setOpen(false)
  }

  // 处理外部传入的open状态
  useEffect(() => {
    if (open) onOpen()
  }, [open, onOpen])

  // 处理内部的isOpen状态，使其余关闭效果正常
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen, setOpen])

  return (
    <>
      {children}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        classNames={{ closeButton: 'hover:cursor-pointer' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={clm('flex flex-col gap-1', !content && 'items-center')}>
                {title}
              </ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => onCancel(onClose)}>
                  {cancelName}
                </Button>
                <KlButton fill={true} onPress={() => onAction(onClose)}>
                  {confirmName}
                </KlButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
