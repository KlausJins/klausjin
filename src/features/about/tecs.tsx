'use client'

import { CardLayout } from '@/components/card-layout'
import IconSelf from '@/components/icons/icon-self'
import { SKILL_ICON_PR, skillsList } from '@/constants/info'
import { clm } from '@/utils/normal'
import { useState } from 'react'

export const Tecs = () => {
  const [isDetailOpen, setDetailOpen] = useState(true)
  console.log(skillsList.flat())
  const toggleDetail = () => {
    setDetailOpen(!isDetailOpen)
  }
  return (
    <CardLayout
      className={clm(
        'relative col-span-12 animate-fade-up animate-ease-in-out animate-delay-[400ms] px-0 max-md:px-0 overflow-hidden',
        "after:content-[''] after:absolute after:inset-0 after:z-10 after:pointer-events-none",
        'after:bg-[linear-gradient(to_right,#F9F9F9_-2%,transparent_5%,transparent_95%,#F9F9F9_102%)]',
        'dark:after:bg-[linear-gradient(to_right,#242424_-2%,transparent_5%,transparent_95%,#242424_102%)]'
      )}
    >
      {/* 查看详情按钮 */}
      <div
        className="fixed flex text-secondary dark:text-darksecondary justify-center items-center top-4.5 right-8 w-8 h-8 rounded-full max-md:top-2.5 max-md:right-6 z-20 hover:cursor-pointer"
        onClick={() => toggleDetail()}
      >
        <IconSelf iconName="icon-[lucide--ellipsis]" className={isDetailOpen ? 'hidden' : 'flex'} />
        <IconSelf iconName="icon-[lucide--x]" className={isDetailOpen ? 'flex' : 'hidden'} />
      </div>

      {/* 详情内容 */}
      <div
        data-state={isDetailOpen}
        className={clm(
          'fixed z-18 bg-bgPrimary/50 dark:bg-darkBgPrimary/50 inset-0 top-0 backdrop-blur-md flex flex-col data-[state=true]:animate-opacity-in data-[state=false]:animate-opacity-out',
          isDetailOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="w-full box-border px-8 pt-6 max-md:px-6 max-md:pt-4">
          <p className="text-sm mb-4 max-md:mb-2">其他的技能</p>
          <p className="text-3xl max-md:text-2xl font-black">在学了在学了...</p>
        </div>
        <div className="noscrollbar relative h-full p-4 mt-4 max-md:mt-2 flex flex-wrap gap-3 overflow-auto">
          {skillsList.flat().map((item) => {
            return (
              <div
                key={item.name}
                className="flex p-1.5 rounded-full justify-between items-center box-border border-1 border-borderColor dark:border-darkBorderColor bg-lighterBgPrimary dark:bg-darkerBgPrimary"
              >
                <div className="flex rounded-full overflow-hidden">
                  <IconSelf iconName={item.iconPath} className={'text-4xl'} />
                </div>
                <p className="px-2 text-xs">{item.name}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 标题 */}
      <div className="px-8 pb-6 max-md:px-6 max-md:pb-4">
        <p className="text-sm mb-4 max-md:mb-2 text-secondary dark:text-darksecondary">技能</p>
        <p className="text-3xl max-md:text-2xl font-black">技术力</p>
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
    </CardLayout>
  )
}
