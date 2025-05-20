import { clm } from '@/utils/normal'
import React from 'react'

type stringObj = {
  text: string
  className: string
}

type Min3Array<T> = T[]

interface IRollingTextProps {
  children?: React.ReactNode
  className?: string
  stringArr: Min3Array<stringObj>
  animateName: string
  layoutHeightClassName: string
  isGradient?: boolean
}

export const RollingText = (props: IRollingTextProps) => {
  const { className, stringArr, animateName, layoutHeightClassName, isGradient } = props
  const finalEl = stringArr[stringArr.length - 1]

  return (
    <div
      className={clm(
        'inline-block relative pt-2 overflow-hidden',
        layoutHeightClassName,
        "after:content-[''] after:absolute after:inset-0 after:z-20",
        'after:bg-[linear-gradient(to_bottom,#F9F9F9_10%,transparent_30%,transparent_70%,#F9F9F9_90%)]',
        'dark:after:bg-[linear-gradient(to_bottom,#242424_10%,transparent_30%,transparent_70%,#242424_90%)]',
        className
      )}
    >
      {/* 使用最后一个元素作为过渡元素效果 */}
      <div
        className={clm(
          `block text-primary ${animateName} animate-duration-${stringArr.length * 1000}`,
          isGradient ? 'text-transparent bg-clip-text bg-gradient-to-r' : 'dark:text-darkprimary',
          finalEl.className
        )}
      >
        {finalEl.text}
      </div>
      {stringArr.map((item) => {
        return (
          <div
            key={item.text}
            className={clm(
              `block text-primary ${animateName} animate-duration-${stringArr.length * 1000}`,
              isGradient
                ? 'text-transparent bg-clip-text bg-gradient-to-r'
                : 'dark:text-darkprimary',
              item.className
            )}
          >
            {item.text}
          </div>
        )
      })}
    </div>
  )
}
