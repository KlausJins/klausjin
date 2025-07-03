'use client'

import KlButton from '@/components/ui/button'
import { KlAvatar } from '../ui/avatar'
import IconSelf from '../icons/icon-self'
import KlDropdown, { DropdownItemType } from '../ui/dropdown'
import { useMemo } from 'react'
import { signOutAndRedirect } from '@/actions/auth'
import type { Session } from 'next-auth'

interface BackendAvatarPropsType {
  session?: Session | null
  alt: string
}

export const BackendAvatar = ({ session }: BackendAvatarPropsType) => {
  const AvatarDropdownTrigger = useMemo(
    () => (
      <KlButton className="border-0 p-0 rounded-full" isIconOnly={true}>
        <KlAvatar src={session?.user.image || ''} radius="sm" />
      </KlButton>
    ),
    [session]
  )

  const AvatarDropdownitems: DropdownItemType[] = useMemo(
    () => [
      {
        key: 'info',
        isReadOnly: true,
        showDivider: true,
        children: (
          <div className="flex items-center gap-2 p-2">
            <KlAvatar
              src={session?.user?.image || ''}
              base_className="hover:cursor-default rounded-full"
            />
            <div className="felx flex-col justify-between">
              <div className="text-sm font-black ">{session?.user.name || '用户名称'}</div>
              <div className="text-xs ">{session?.user.email || 'user@gmail.com'}</div>
            </div>
          </div>
        )
      },
      {
        key: 'logout',
        children: (
          <div
            className="flex items-center gap-1 text-sm py-1"
            onClick={() => signOutAndRedirect()}
          >
            <IconSelf iconName="icon-[lucide--log-out]" />
            <div>退出登录</div>
          </div>
        )
      }
    ],
    [session]
  )

  return (
    <div>
      <KlDropdown items={AvatarDropdownitems} trigger={AvatarDropdownTrigger} />
    </div>
  )
}
