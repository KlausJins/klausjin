'use client'

import Logo from '../logo/logo'
import { BACKEND_NAVBAR_ITEMS } from './config'
import Link from 'next/link'
import { clm } from '@/utils'
import { usePathname } from 'next/navigation'
import { ToggleMode } from '@/components/toggleMode'
import { BACKEND_WEBSITE } from '@/constants/backend-info'
import { BackendAvatar } from '../backend-avatar'
import { useSession } from 'next-auth/react'

export const BackendNavbar = () => {
  const pathname = usePathname()

  const { data: session } = useSession()

  return (
    <header
      className={clm(
        ' backdrop-blur-[8px] sticky top-0 w-full h-16 flex justify-between items-center px-10 max-sm:px-5 box-border border-b border-transparent transition-all duration-200 ease-in-out z-10',
        'border-borderColor dark:border-darkBorderColor max-sm:hidden'
      )}
    >
      <div className="flex justify-between items-center gap-4 box-border w-full mx-auto">
        <div className="flex items-center gap-15 w-full pr-8">
          {/* 后台管理logo */}
          <Link href={'/'}>
            <div className=" flex gap-2 items-center hover:cursor-pointer">
              <Logo />
              <span className="text-primary font-semibold dark:text-white">{BACKEND_WEBSITE}</span>
            </div>
          </Link>
          {/* 导航 */}
          <div className="text-sm text-secondary dark:text-darksecondary flex gap-8">
            {BACKEND_NAVBAR_ITEMS.map((item) => {
              return (
                <Link
                  className={clm(
                    'hover:bg-hoverColor dark:hover:bg-darkHoverColor py-2 px-4 rounded-lg font-semibold',
                    pathname === item.link &&
                      'bg-darkBgPrimary dark:bg-bgPrimary text-darkprimary dark:text-primary hover:bg-darkBgPrimary/95 dark:hover:bg-bgPrimary/95'
                  )}
                  href={item.link}
                  key={item.link}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
        {/* 明暗模式 */}
        <div className="flex items-center justify-between gap-6">
          <ToggleMode />
          <BackendAvatar session={session} alt="Colm Tuite" />
        </div>
      </div>
    </header>
  )
}
