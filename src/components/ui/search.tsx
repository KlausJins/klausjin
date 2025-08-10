'use client'

import { useEffect } from 'react'
import KlButton from './button'
import IconSelf from '../icons/icon-self'

export default function Search() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Mac 下 command 是 metaKey，Windows/Linux 下 ctrl 是 ctrlKey
      const isCmdOrCtrl = event.metaKey || event.ctrlKey
      // 按下的键，k 可能会是大写或小写，所以转成小写比较保险
      const isK = event.key.toLowerCase() === 'k'

      if (isCmdOrCtrl && isK) {
        event.preventDefault()
        console.log('Command/Ctrl + K 被按下了')
        // 这里写你的业务逻辑
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <KlButton className="rounded-2xl">
        <div className="flex items-center gap-6 justify-between text-secondary dark:text-darksecondary">
          <div className="flex items-center gap-2">
            <IconSelf iconName="icon-[lucide--search]" />
            <div>搜索</div>
          </div>
          <div className="py-0.5 space-x-0.5 rtl:space-x-reverse font-sans font-normal text-center text-small shadow-small bg-default-100 rounded-2xl px-2 gap-0.5 flex items-center justify-center text-secondary dark:text-darksecondary">
            <IconSelf iconName="icon-[lucide--command]" size="text-small" />
            <span>K</span>
          </div>
        </div>
      </KlButton>
    </>
  )
}
