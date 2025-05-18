'use client'
import React, { useState } from 'react'
import { clm } from '@/utils/normal'
import {
  KlSheetClose,
  KlSheetContent,
  KlSheetDescription,
  KlSheetRoot,
  KlSheetTitle,
  KlSheetTrigger
} from '@/components/ui/sheet'
import { NAVBAR_ITEMS } from './config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import IconSelf from '@/components/icons/icon-self'
import Button from '@/components/ui/button'

interface IMobileNavbarProps {
  className?: string
}

const MobileNavbar = ({ className }: IMobileNavbarProps) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className={clm(className)}>
      <KlSheetRoot open={open} onOpenChange={setOpen}>
        <KlSheetTrigger asChild>
          <Button>
            <IconSelf iconName="icon-[lucide--align-left]" />
          </Button>
        </KlSheetTrigger>
        <KlSheetContent>
          {/* 头部信息 */}
          <header className="flex flex-col items-center gap-2 pt-10">
            <KlSheetTitle>KlausJin</KlSheetTitle>
            <KlSheetDescription>努力做一个更好的程序员</KlSheetDescription>
          </header>

          <div className="flex flex-col gap-4 mt-8 px-4">
            {NAVBAR_ITEMS.map((item) => {
              return (
                <Link
                  className={clm(
                    ' font-bold rounded-md py-1 pl-6 text-lg text-primary dark:text-darkprimary active:bg-activeColor dark:active:bg-darkActiveColor',
                    pathname === item.link &&
                      ' bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary'
                  )}
                  href={item.link}
                  key={item.link}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* 删除按钮 */}
          <KlSheetClose asChild>
            <Button className="absolute top-6 right-6">
              <IconSelf iconName="icon-[lucide--x]" size="text-2xl" />
            </Button>
          </KlSheetClose>
        </KlSheetContent>
      </KlSheetRoot>
    </div>
  )
}

export default MobileNavbar
