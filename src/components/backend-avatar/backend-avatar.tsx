'use client'

import KlButton from '@/components/ui/button'
import { KlAvatar } from '../ui/avatar'
import IconSelf from '../icons/icon-self'
import KlDropdown, { DropdownItemType } from '../ui/dropdown'
import { useMemo } from 'react'
import { signOutAndRedirect } from '@/actions/auth'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { clearUserSession } from '@/store/features/user-slice'

export const BackendAvatar = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const AvatarDropdownTrigger = useMemo(
    () => (
      <KlButton className="border-0 p-0 rounded-full" isIconOnly={true}>
        <KlAvatar src={user.image || ''} radius="sm" />
      </KlButton>
    ),
    [user]
  )

  const AvatarDropdownitems: DropdownItemType[] = useMemo(
    () => [
      {
        key: 'info',
        isReadOnly: true,
        showDivider: true,
        children: (
          <div className="flex items-center gap-2 p-2">
            <KlAvatar src={user?.image || ''} base_className="hover:cursor-default rounded-full" />
            <div className="felx flex-col justify-between">
              <div className="text-sm font-black ">{user.name || '用户名称'}</div>
              <div className="text-xs ">{user.email || 'user@gmail.com'}</div>
            </div>
          </div>
        )
      },
      {
        key: 'logout',
        children: (
          <div
            className="flex items-center gap-1 text-sm py-1"
            onClick={() => {
              // 先清除redux的用户信息
              dispatch(clearUserSession())
              // 登出后台
              signOutAndRedirect()
            }}
          >
            <IconSelf iconName="icon-[lucide--log-out]" />
            <div>退出登录</div>
          </div>
        )
      }
    ],
    [dispatch, user]
  )

  return (
    <div>
      <KlDropdown items={AvatarDropdownitems} trigger={AvatarDropdownTrigger} />
    </div>
  )
}
