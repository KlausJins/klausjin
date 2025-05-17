'use client'

import IconSelf from '../icons/icon-self'
import { useTheme } from 'next-themes'
import {
  KlDropdownMenu,
  KlDropdownMenuContent,
  KlDropdownMenuItem,
  KlDropdownMenuTrigger
} from '../ui/dropdown-menu'
import Button from '../ui/button'

export const ToggleMode = () => {
  const { setTheme } = useTheme()

  return (
    <div>
      <KlDropdownMenu>
        <KlDropdownMenuTrigger asChild>
          <Button>
            <IconSelf iconName="icon-[lucide--sun-medium]" className="flex dark:hidden text-lg" />
            <IconSelf iconName="icon-[lucide--moon]" className="hidden dark:flex text-lg" />
          </Button>
        </KlDropdownMenuTrigger>
        <KlDropdownMenuContent align="end">
          <KlDropdownMenuItem onSelect={() => setTheme('light')}>浅色</KlDropdownMenuItem>
          <KlDropdownMenuItem onSelect={() => setTheme('dark')}>深色</KlDropdownMenuItem>
          <KlDropdownMenuItem onSelect={() => setTheme('system')}>跟随系统</KlDropdownMenuItem>
        </KlDropdownMenuContent>
      </KlDropdownMenu>
    </div>
  )
}
