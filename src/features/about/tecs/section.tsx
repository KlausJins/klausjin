import { ABOUT_TECS_LINE, ABOUT_TECS_TITLE, SKILL_ICON_PR, skillsList } from '@/constants/info'
import IconSelf from '@/components/icons/icon-self'
import { clm } from '@/utils'

export const TecsSection = ({ isDetailOpen }: { isDetailOpen: boolean }) => {
  return (
    <>
      {/* 标题 */}
      <div className="px-8 pb-6 max-md:px-6 max-md:pb-4">
        <p className="text-sm mb-4 max-md:mb-2 text-secondary dark:text-darksecondary">
          {ABOUT_TECS_TITLE}
        </p>
        <p className="text-3xl max-md:text-2xl font-black">{ABOUT_TECS_LINE}</p>
      </div>

      {/* 内容 */}
      <div className={clm('flex flex-col gap-6 max-md:gap-4 overflow-hidden justify-center')}>
        {/* 第一行标题 */}
        <div className="m-auto flex ">
          <ul
            className={clm(
              'flex m-0 p-0 animate-scroll-to-left',
              !isDetailOpen ? 'animate-play' : 'animate-pause'
            )}
          >
            {skillsList[0].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item.name}>
                  <IconSelf iconName={item.iconPath} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
          </ul>
          {/* 为了确保滚动效果无缝衔接，需要再次渲染多一次 */}
          <ul
            className={clm(
              'flex m-0 p-0 animate-scroll-to-left',
              !isDetailOpen ? 'animate-play' : 'animate-pause'
            )}
          >
            {skillsList[0].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item.name}>
                  <IconSelf iconName={item.iconPath} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
          </ul>
        </div>

        {/* 第二行标题，因为需要错开无缝滚动，所以单独另一个图标出来做特殊处理 */}
        <div className="m-auto flex relative">
          <ul
            className={clm(
              'flex m-0 p-0 animate-scroll-to-left',
              !isDetailOpen ? 'animate-play' : 'animate-pause'
            )}
          >
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR.iconPath}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 right-0"
              />
            </li>
            {skillsList[1].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item.name}>
                  <IconSelf iconName={item.iconPath} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR.iconPath}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 left-0"
              />
            </li>
          </ul>
          {/* 为了确保滚动效果无缝衔接，需要再次渲染多一次 */}
          <ul
            className={clm(
              'flex m-0 p-0 animate-scroll-to-left',
              !isDetailOpen ? 'animate-play' : 'animate-pause'
            )}
          >
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR.iconPath}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 right-0"
              />
            </li>
            {skillsList[1].map((item) => {
              return (
                <li className="w-30 max-md:w-20 flex justify-center items-center" key={item.name}>
                  <IconSelf iconName={item.iconPath} className="text-8xl max-md:text-6xl" />
                </li>
              )
            })}
            <li className="relative overflow-hidden w-15 max-md:w-10 flex justify-center items-center">
              <IconSelf
                iconName={SKILL_ICON_PR.iconPath}
                className="text-8xl max-md:text-6xl absolute w-30 max-md:w-20 left-0"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
