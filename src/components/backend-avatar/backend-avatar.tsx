'use client'

import KlButton from '@/components/ui/button'
import { KlAvatar } from '../ui/avatar'
import IconSelf from '../icons/icon-self'
import KlDropdown, { DropdownItemType } from '../ui/dropdown'
import { useMemo } from 'react'

interface BackendAvatarPropsType {
  src: string
  alt: string
}

export const BackendAvatar = ({ src }: BackendAvatarPropsType) => {
  const AvatarDropdownTrigger = useMemo(
    () => (
      <KlButton className="border-0 p-0 rounded-full" isIconOnly={true}>
        <KlAvatar src={src} radius="sm" />
      </KlButton>
    ),
    [src]
  )

  const AvatarDropdownitems: DropdownItemType[] = useMemo(
    () => [
      {
        key: 'info',
        isReadOnly: true,
        showDivider: true,
        children: (
          <div className="flex items-center gap-2 p-2">
            <KlAvatar src={src} base_className="hover:cursor-default rounded-full" />
            <div className="felx flex-col justify-between">
              <div className="text-sm font-black ">KlausJin</div>
              <div className="text-xs ">KlausJin@gmail.com</div>
            </div>
          </div>
        )
      },
      {
        key: 'logout',
        children: (
          <div className="flex items-center gap-1 text-sm py-1">
            <IconSelf iconName="icon-[lucide--log-out]" />
            <div>退出登录</div>
          </div>
        )
      }
    ],
    [src]
  )

  return (
    <div>
      <KlDropdown items={AvatarDropdownitems} trigger={AvatarDropdownTrigger} />
    </div>
  )
}
