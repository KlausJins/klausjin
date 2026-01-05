'use client'
import React from 'react'
import { clm } from '@/utils'
import { NAVBAR_ITEMS } from './config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import { HOME_SLOGAN_MOBILE_TEXT, WEBSITE } from '@/constants/info'
import { useDisclosure } from '@heroui/react'
import { KlDrawer, KlDrawerBody, KlDrawerContent, KlDrawerHeader } from '@/components/ui/drawer'

interface IMobileNavbarProps {
  className?: string
}

const MobileNavbar = ({ className }: IMobileNavbarProps) => {
  const pathname = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className={clm(className)}>
      {/* 手机端侧边栏按钮 */}
      <KlButton isIconOnly={true} onPress={() => onOpen()}>
        <IconSelf iconName="icon-[lucide--align-left]" />
      </KlButton>

      {/* 侧边栏 */}
      <KlDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton={
          // 关闭按钮
          <KlButton isIconOnly={true}>
            <IconSelf iconName="icon-[lucide--x]" size="text-lg" />
          </KlButton>
        }
      >
        <KlDrawerContent>
          {(onClose) => (
            <>
              {/* 标题 */}
              <KlDrawerHeader className="flex flex-col gap-1">
                <header className="flex flex-col items-center gap-2 pt-10">
                  <div className="flex justify-between items-center font-bold text-xl">
                    {WEBSITE}
                  </div>
                  <div className="text-secondary">{HOME_SLOGAN_MOBILE_TEXT}</div>
                </header>
              </KlDrawerHeader>
              {/* 内容 */}
              <KlDrawerBody>
                <div className="flex flex-col gap-4 mt-8 px-4">
                  {NAVBAR_ITEMS.map((item) => {
                    return (
                      <Link
                        className={clm(
                          ' font-bold rounded-md py-1 pl-6 text-lg text-primary dark:text-darkprimary active:bg-activeColor dark:active:bg-darkActiveColor',
                          pathname === item.link &&
                            ' bg-darkerBgPrimary text-darkprimary dark:bg-lighterBgPrimary dark:text-primary'
                        )}
                        href={item.link}
                        key={item.link}
                        onClick={() => onClose()}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </KlDrawerBody>
            </>
          )}
        </KlDrawerContent>
      </KlDrawer>
    </div>
  )
}

export default MobileNavbar
