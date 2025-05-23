'use client'

import { CardLayout } from '@/components/card-layout'
import IconSelf from '@/components/icons/icon-self'
import { skillsList } from '@/constants/info'
import { clm } from '@/utils/normal'
import { useState } from 'react'
import { TecsSection } from './section'

export const Tecs = () => {
  const [isDetailOpen, setDetailOpen] = useState(false)
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
                  <IconSelf iconName={item.iconPath} className={'text-4xl max-md:text-xl'} />
                </div>
                <p className="px-2 text-xs">{item.name}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 技能内容 */}
      <TecsSection isDetailOpen={isDetailOpen} />
    </CardLayout>
  )
}
