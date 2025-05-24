import { CardLayout } from '@/components/card-layout'
import { ImageAssests } from '@/constants/assets'
import {
  ABOUT_CAREER_LINE,
  ABOUT_CAREER_TITLE,
  ABOUT_PRO_LINE,
  ABOUT_PRO_TITLE
} from '@/constants/info'
import Image from 'next/image'

export const ProAndCareer = () => {
  return (
    <CardLayout className="col-span-12 animate-fade-up animate-ease-in-out animate-delay-[600ms] px-0 max-md:px-0 pb-0 max-md:pb-0 overflow-hidden">
      <div className="flex flex-col h-full justify-between">
        {/* 标题 */}
        <div className="flex gap-20 max-md:gap-10 px-8 pb-6 max-md:px-6 max-md:pb-4">
          <div>
            <p className="text-sm mb-4 max-md:mb-2 text-secondary dark:text-darksecondary">
              {ABOUT_CAREER_TITLE}
            </p>
            <p className="text-3xl max-md:text-2xl font-black ">{ABOUT_CAREER_LINE}</p>
          </div>
          <div>
            <p className="text-sm mb-4 max-md:mb-2 text-secondary dark:text-darksecondary">
              {ABOUT_PRO_TITLE}
            </p>
            <p className="text-3xl max-md:text-2xl font-black ">{ABOUT_PRO_LINE}</p>
          </div>
        </div>

        {/* 时间轴 */}
        <div className="relative h-full">
          <Image
            src={ImageAssests.ProAndCareerDarkSvg}
            width={100}
            height={100}
            style={{ width: '100%', height: 'auto' }}
            alt="生涯专业"
            className="absolute max-md:relative bottom-10 mt-10 max-md:bottom-6 flex dark:hidden"
          />
          <Image
            src={ImageAssests.ProAndCareerLightSvg}
            width={100}
            height={100}
            alt="生涯专业"
            style={{ width: '100%', height: 'auto' }}
            className="absolute max-md:relative bottom-10 mt-10 max-md:bottom-6 hidden dark:flex"
          />
        </div>
      </div>
    </CardLayout>
  )
}
