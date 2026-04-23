import { CardLayout } from '@/components/card-layout'
import { ImageAssests } from '@/constants/assets'
import {
  ABOUT_STAR_EN_NAME,
  ABOUT_STAR_TITLE,
  ABOUT_STAR_ZH_NAME,
  ABOUT_STAR_LINK,
} from '@/constants/info'
import Image from 'next/image'
import Link from 'next/link'

export const FavSinger = () => {
  return (
    <CardLayout className='col-span-15 row-span-3 animate-fade-up animate-ease-in-out animate-delay-[1200ms] overflow-hidden p-0 m-0 max-md:p-0 max-md:m-0'>
      <div className='flex flex-col gap-2 top-0 px-8 py-6 max-md:px-6 max-md:py-4 relative z-10'>
        <p className='text-sm text-darkprimary/80 text-shadow-darkprimary/60  text-shadow-xs'>
          {ABOUT_STAR_TITLE}
        </p>
        <Link
          href={ABOUT_STAR_LINK}
          target='_blank'
          className='hover:cursor-pointer'
        >
          <p className='text-3xl max-md:text-2xl font-black text-darkprimary text-shadow-darkprimary/80  text-shadow-xs'>
            {ABOUT_STAR_ZH_NAME}
          </p>
          <p className='text-3xl max-md:text-2xl font-black text-darkprimary text-shadow-darkprimary/80  text-shadow-xs'>
            {ABOUT_STAR_EN_NAME}
          </p>
        </Link>
      </div>
      <div className='flex w-full h-full inset-0 justify-center items-center overflow-hidden'>
        <Image
          src={ImageAssests.KobeWallpaper}
          width={500}
          height={500}
          alt='Kobe Bryant 科比·布莱恩特'
          sizes='100vw'
          priority
          className='w-full absolute top-[50%] transform -translate-y-[62%]'
        />
      </div>
    </CardLayout>
  )
}
