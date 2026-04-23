import { CardLayout } from '@/components/card-layout'
import { ImageAssests } from '@/constants/assets'
import {
  ABOUT_SPECIALITY_LINE_1,
  ABOUT_SPECIALITY_LINE_2,
  ABOUT_SPECIALITY_TITLE
} from '@/constants/info'
import Image from 'next/image'

export const Speciality = () => {
  return (
    <CardLayout className="col-span-15 row-span-2 animate-fade-up animate-ease-in-out animate-delay-[1000ms] bg-gradient-to-r from-[#FF2ADF] to-[#FF5375] group overflow-hidden">
      <div className="flex flex-col gap-2">
        <p className="text-sm mb-0 text-darkprimary/80">{ABOUT_SPECIALITY_TITLE}</p>
        <p className="text-3xl max-md:text-2xl font-black text-darkprimary/50">
          {ABOUT_SPECIALITY_LINE_1}
        </p>
        <p className="text-3xl max-md:text-2xl font-black text-darkprimary">
          {ABOUT_SPECIALITY_LINE_2}
        </p>

        {/* 图标 */}
        <Image
          src={ImageAssests.ChatGPT_svg}
          alt="chatgpt"
          width={200}
          height={200}
          className="absolute max-md:w-30 max-md:top-12 -right-8 opacity-30 top-4 transform group-hover:-rotate-10 transition-transform duration-3000 ease-in-out delay-200"
        />
      </div>
    </CardLayout>
  )
}
