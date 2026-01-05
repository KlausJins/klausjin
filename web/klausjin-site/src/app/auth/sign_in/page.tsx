'use client'

import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import Link from 'next/link'
import { clm } from '@/utils'
import { signInWithGithub } from '@/actions/auth'

export default function SignIn() {
  return (
    <div className="grid place-content-center min-h-[calc(100vh-64px)] text-sm">
      <div
        className={clm(
          'flex flex-col items-center justify-center border-1 px-10 py-8 min-w-100 min-h-80 max-md:min-w-80 rounded-3xl',
          'text-secondary dark:text-darksecondary border-borderColor dark:border-darkBorderColor'
        )}
      >
        <div className="flex flex-col items-center w-full gap-6">
          <div className="flex flex-col gap-1 text-lg w-full">
            <span className="font-black text-2xl text-primary dark:text-darkprimary">后台登录</span>
            <span className="text-sm">选择你喜欢的方式进行登录</span>
          </div>
          <KlButton
            fill={true}
            className="w-full py-2 border-0 bg-darkBgPrimary dark:bg-bgPrimary text-darkprimary dark:text-primary active:bg-darkBgPrimary dark:active:bg-bgPrimary"
            onClick={() => signInWithGithub()}
          >
            <IconSelf iconName="icon-[fa6-brands--github]" />
            <span>使用 Github 登录</span>
          </KlButton>
        </div>
        <div className="flex justify-between items-center w-full my-3">
          <div className="w-full h-0.25 border-1 text-secondary/20 dark:text-darksecondary/20"></div>
          <div className="shrink-0 mx-2 text-secondary dark:text-darksecondary">或者</div>
          <div className="w-full h-0.25 border-1 text-secondary/20 dark:text-darksecondary/20"></div>
        </div>
        <Link href="/" className="w-full">
          <KlButton
            fill={true}
            className="w-full py-2 border-0 bg-darkBgPrimary dark:bg-bgPrimary text-darkprimary dark:text-primary"
          >
            返回首页
          </KlButton>
        </Link>
      </div>
    </div>
  )
}
