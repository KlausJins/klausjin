'use client'

import IconSelf from '@/components/icons/icon-self'
import { useTheme } from 'next-themes'
import KlButton from '@/components/ui/button'
import KlDropdown, { DropdownItemType } from '../ui/dropdown'
import { useMemo } from 'react'

export const ToggleMode = () => {
  const { setTheme } = useTheme()
  const ToggleModeDropdownTrigger = useMemo(
    () => (
      <KlButton isIconOnly={true}>
        <IconSelf iconName="icon-[lucide--sun-medium]" className="flex dark:hidden text-lg" />
        <IconSelf iconName="icon-[lucide--moon]" className="hidden dark:flex text-lg" />
      </KlButton>
    ),
    []
  )

  const ToggleModeDropdownitems: DropdownItemType[] = useMemo(
    () => [
      {
        key: 'light',
        onPress: () => setTheme('light'),
        children: '浅色'
      },
      {
        key: 'dark',
        onPress: () => setTheme('dark'),
        children: '深色'
      },
      {
        key: 'system',
        onPress: () => setTheme('system'),
        children: '跟随系统'
      }
    ],
    [setTheme]
  )

  return (
    <div>
      <KlDropdown items={ToggleModeDropdownitems} trigger={ToggleModeDropdownTrigger}></KlDropdown>
    </div>
  )
}
