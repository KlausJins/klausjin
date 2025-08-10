'use client'

import { GITHUB_PAGE_LINK, WEBSITE } from '@/constants/info'
import Logo from '../logo/logo'
import { NAVBAR_ITEMS } from './config'
import Link from 'next/link'
import { clm } from '@/utils'
import { usePathname } from 'next/navigation'
import { useScroll } from '@/hooks'
import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import { ToggleMode } from '@/components/toggleMode'
import MobileNavbar from '@/components/navbar/mobile-navbar'
import { PATHS } from '@/constants/path'
import Search from '@/components/ui/search'

export const Navbar = () => {
  const pathname = usePathname()
  const scrollDisstance = useScroll({ isThrottle: true })

  return (
    <header
      className={clm(
        ' backdrop-blur-[8px] sticky top-0 w-full h-16 flex justify-between items-center px-10 max-sm:px-5 box-border border-b border-transparent transition-all duration-200 ease-in-out z-10',
        scrollDisstance >= 10 && 'border-borderColor/50 dark:border-darkBorderColor/50'
      )}
    >
      <div className="flex justify-between items-center gap-4 box-border w-full container mx-auto">
        {/* 手机端导航 */}
        <MobileNavbar className="hidden max-sm:flex" />
        <div className="flex items-center justify-between w-full pr-8 max-sm:hidden">
          {/* 电脑端导航 */}
          <Link href={'/'}>
            <div className=" flex gap-2 items-center hover:cursor-pointer">
              <Logo />
              <span className="text-primary font-semibold dark:text-white">{WEBSITE}</span>
            </div>
          </Link>

          {/* 导航 */}
          <div className="text-sm text-secondary dark:text-darksecondary flex gap-8 items-center">
            {/* 页面搜索功能 */}
            <Search />
            {/* 遍历加载导航选项 */}
            {NAVBAR_ITEMS.map((item) => {
              return (
                <Link
                  className={clm(
                    'hover:text-primary hover:font-semibold dark:hover:text-darkprimary',
                    pathname === item.link && 'text-primary font-semibold dark:text-darkprimary'
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
        <div className="flex items-center justify-between gap-4">
          {/* 明暗模式 */}
          <ToggleMode />
          {/* 源代码github按钮 */}
          <Link href={GITHUB_PAGE_LINK} target="_blank" className="flex">
            <KlButton isIconOnly={true}>
              <IconSelf iconName="icon-[fa6-brands--github]" />
            </KlButton>
          </Link>
          {/* 登录到后台 */}
          <Link href={PATHS.SITE_ADMIN} className="flex">
            <KlButton isIconOnly={true}>
              <IconSelf iconName="icon-[lucide--user-cog]" />
            </KlButton>
          </Link>
        </div>
      </div>
    </header>
  )
}
