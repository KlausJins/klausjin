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

interface KlModalProps {
  children?: ReactNode
  title?: string
  desc: string
  open: boolean
  setOpen: (open: boolean) => void
  successCallback?: () => void
  cancelCallback?: () => void
}

export default function KlModal(props: KlModalProps) {
  const { children, title = '提示', desc, open, setOpen, successCallback, cancelCallback } = props
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>{desc}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => onCancel(onClose)}>
                  取消
                </Button>
                <KlButton fill={true} onPress={() => onAction(onClose)}>
                  确定
                </KlButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
