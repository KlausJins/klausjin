import Button from '@/components/ui/button'
import { BACKEND_MOBILE_OFF_TEXT } from '@/constants/backend-info'
import Link from 'next/link'

export const MobileOff = () => {
  return (
    <div className="grid place-content-center min-h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center text-secondary dark:text-darksecondary border-1 border-borderColor dark:border-darkBorderColor px-10 py-8 rounded-3xl">
        <div className="flex flex-col items-center">
          <span className="text-[150px]">{BACKEND_MOBILE_OFF_TEXT.ICON}</span>
          <div className="flex flex-col items-center gap-1 text-lg">
            <span>{BACKEND_MOBILE_OFF_TEXT.TEXT_1}</span>
            <span>{BACKEND_MOBILE_OFF_TEXT.TEXT_2}</span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full my-6">
          <div className="w-full h-0.25 border-1 text-secondary/20 dark:text-darksecondary/20"></div>
          <div className="shrink-0 mx-2 text-secondary dark:text-darksecondary">或者</div>
          <div className="w-full h-0.25 border-1 text-secondary/20 dark:text-darksecondary/20"></div>
        </div>
        <Link href="/" className="w-full">
          <Button className="w-full py-2 border-0 bg-darkBgPrimary dark:bg-bgPrimary text-darkprimary dark:text-primary">
            回首页
          </Button>
        </Link>
      </div>
    </div>
  )
}
