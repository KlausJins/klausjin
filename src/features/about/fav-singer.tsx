import { CardLayout } from '@/components/card-layout'
import { ImageAssests } from '@/constants/assets'
import Image from 'next/image'
import Link from 'next/link'

export const FavSinger = () => {
  return (
    <CardLayout className="col-span-15 row-span-3 animate-fade-up animate-ease-in-out animate-delay-[1200ms] overflow-hidden p-0 m-0 max-md:p-0 max-md:m-0">
      <div className="flex flex-col gap-2 top-0 px-8 py-6 max-md:px-6 max-md:py-4 relative z-10">
        <p className="text-sm text-darkprimary/80">喜爱歌手</p>
        <Link href={'https://hinscheung.com'} target="_blank" className="hover:cursor-pointer">
          <p className="text-3xl max-md:text-2xl font-black text-darkprimary">张敬轩</p>
          <p className="text-3xl max-md:text-2xl font-black text-darkprimary">HinsChueng</p>
        </Link>
      </div>
      <div className="flex w-full h-full inset-0 justify-center items-center overflow-hidden">
        <Image
          src={ImageAssests.HinsWallpaper}
          width={500}
          height={500}
          alt="HinsChueng 张敬轩"
          sizes="100vw"
          priority
          className="w-full absolute top-[50%] transform -translate-y-[50%]"
        />
      </div>
    </CardLayout>
  )
}
