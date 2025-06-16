'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  DropdownItemProps
} from '@heroui/react'
import { OverlayPlacement } from '@heroui/aria-utils'
import { ReactNode } from 'react'
import { clm } from '@/utils'

export interface DropdownItemType extends DropdownItemProps {
  key: string
  children: ReactNode
  shortcut?: string
  className?: string
}

interface DropdownProps {
  items: DropdownItemType[]
  trigger: ReactNode
  placement?: OverlayPlacement
}

export default function KlDropdown({ items, trigger, placement = 'bottom-end' }: DropdownProps) {
  return (
    <Dropdown placement={placement}>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu>
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            startContent={item.startContent}
            isReadOnly={item.isReadOnly}
            shortcut={item.shortcut}
            showDivider={item.showDivider}
            onPress={item.onPress}
            className={clm(
              'data-[hover=true]:bg-hoverColor dark:data-[hover=true]:bg-darkHoverColor',
              item.isReadOnly &&
                'data-[hover=true]:bg-transparent dark:data-[hover=true]:bg-transparent hover:cursor-default after:bg-borderColor dark:after:bg-darkBorderColor',
              item.className
            )}
          >
            {item.children}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
