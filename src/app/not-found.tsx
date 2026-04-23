import { IconNotFound } from '@/components/icons/icon-notfound'
import KlButton from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="grid place-items-center min-h-[100vh] bg-bgPrimary dark:bg-darkBgPrimary">
      <div className="flex flex-col items-center justify-center gap-8">
        <IconNotFound />
        <div className="text-2xl font-black">页面不存在</div>
        <Link href="/" className="w-full">
          <KlButton fill={true} className=" h-12 w-full">
            返回首页
          </KlButton>
        </Link>
      </div>
    </div>
  )
}
