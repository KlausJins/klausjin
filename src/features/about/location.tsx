import { CardLayout } from '@/components/card-layout'
import { ImageAssests } from '@/constants/assets'
import Image from 'next/image'

export const Location = () => {
  return (
    <CardLayout className="row-span-5 col-span-9 animate-fade-up animate-ease-in-out animate-delay-[800ms] p-0 m-0 max-md:p-0 max-md:m-0 overflow-hidden">
      <div className="w-full h-full relative group">
        <div className="w-full h-full flex inset-0 justify-center items-center overflow-hidden scale-260 max-md:scale-300 group-hover:scale-350 transform transition-all duration-3000 ease-in-out delay-150">
          <Image
            src={ImageAssests.LocationLight}
            width={2358}
            height={1158}
            alt="广东广州"
            sizes="100vw"
            priority
            className="flex dark:hidden"
          />
          <Image
            src={ImageAssests.LocationDark}
            width={2358}
            height={1158}
            alt="广东广州"
            sizes="100vw"
            priority
            className="hidden dark:flex"
          />
        </div>
        <div className="absolute bottom-0 w-full h-15 max-md:h-10 backdrop-blur-[8px] flex flex-wrap items-center px-8 gap-2 group-hover:-bottom-[100%] transform transition-all duration-1000 ease-in-out delay-150">
          <p className="text-xl max-md:text-lg text-primary dark:text-darkprimary">我现在在</p>
          <p className="text-xl max-md:text-lg font-black text-primary dark:text-darkprimary">
            中国，广州市
          </p>
        </div>
      </div>
    </CardLayout>
  )
}
