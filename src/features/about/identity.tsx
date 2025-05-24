import { CardLayout } from '@/components/card-layout'
import { ImageAssests } from '@/constants/assets'
import { ABOUT_IDENTITY_TEXT, ABOUT_NAME_TEXT, ABOUT_PRE_TEXT } from '@/constants/info'
import Image from 'next/image'

export const Identity = () => {
  return (
    <CardLayout className="col-span-16 flex items-center animate-fade-up animate-ease-in-out bg-gradient-to-r from-[#3178C6] to-[#58C4DC] text-darkprimary overflow-hidden group">
      <div className="flex flex-col gap-1 justify-center">
        <p className="text-lg max-md:text-md">{ABOUT_PRE_TEXT}</p>
        <p className="text-6xl max-md:text-4xl font-bold">{ABOUT_NAME_TEXT}</p>
        <p className="text-lg max-md:text-md">{ABOUT_IDENTITY_TEXT}</p>

        {/* 图标 */}
        <Image
          src={ImageAssests.Code_svg}
          width={200}
          height={200}
          alt="code"
          className="absolute max-md:w-30 max-md:-bottom-4 max-md:-right-6 opacity-30 -bottom-4 -right-8 -rotate-6 transform group-hover:-rotate-10 transition-transform duration-3000 ease-in-out delay-200"
        />
      </div>
    </CardLayout>
  )
}
