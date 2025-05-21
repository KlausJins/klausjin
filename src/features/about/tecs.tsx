import { CardLayout } from '@/components/card-layout'
import IconSelf from '@/components/icons/icon-self'
import { SKILL_ICON_PR, skillsList } from '@/constants/info'
import { clm } from '@/utils/normal'

export const Tecs = () => {
  return (
    <CardLayout
      className={clm(
        'col-span-12 animate-fade-up animate-ease-in-out animate-delay-[400ms] px-0 max-md:px-0',
        "after:content-[''] after:absolute after:inset-0 after:z-20",
        'after:bg-[linear-gradient(to_right,#F9F9F9_-2%,transparent_5%,transparent_95%,#F9F9F9_102%)]',
        'dark:after:bg-[linear-gradient(to_right,#242424_-2%,transparent_5%,transparent_95%,#242424_102%)]'
      )}
    >
      <div className="px-8 pb-6 max-md:px-6 max-md:pb-4">
        <p className="text-sm mb-4 max-md:mb-2 text-secondary dark:text-darksecondary">技能</p>
        <p className="text-3xl max-md:text-2xl font-black">技术力</p>
      </div>

      <div className={clm('flex flex-col gap-6 max-md:gap-4 overflow-hidden justify-center')}>
        <div className="m-auto flex ">
          <ul className="flex m-0 p-0 animate-scroll-to-left">
            {skillsList[0].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item}>
                  <IconSelf iconName={item} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
          </ul>
          {/* 为了确保滚动效果无缝衔接，需要再次渲染多一次 */}
          <ul className="flex m-0 p-0 animate-scroll-to-left">
            {skillsList[0].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item}>
                  <IconSelf iconName={item} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
          </ul>
        </div>

        <div className="m-auto flex relative">
          <ul className="flex m-0 p-0 animate-scroll-to-left">
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 right-0"
              />
            </li>
            {skillsList[1].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item}>
                  <IconSelf iconName={item} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 left-0"
              />
            </li>
          </ul>
          {/* 为了确保滚动效果无缝衔接，需要再次渲染多一次 */}
          <ul className="flex m-0 p-0 animate-scroll-to-left">
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 right-0"
              />
            </li>
            {skillsList[1].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item}>
                  <IconSelf iconName={item} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 left-0"
              />
            </li>
          </ul>
        </div>
      </div>
    </CardLayout>
  )
}
