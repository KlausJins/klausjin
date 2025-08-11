'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import KlButton from '@/components/ui/button'
import IconSelf from '@/components/icons/icon-self'
import KlModal from '@/components/ui/modal'
import { SearchContent, SearchContentHandle } from './search-content'
import { updateSearchHistoryLocal } from './utils'

export const Search = () => {
  const [isSearchOpen, setSearchOpen] = useState(false)
  const searchContentRef = useRef<SearchContentHandle>(null)

  const onSearchBarClose = useCallback(() => {
    console.log('onSearchBarClose')
  }, [])

  // 搜索按钮的回调处理函数
  const openSearch = useCallback(() => {
    // 这里写你的业务逻辑
    console.log('Command/Ctrl + K 被按下了', isSearchOpen)
    setSearchOpen(!isSearchOpen)

    // 关闭搜索栏的时候执行关闭回调
    isSearchOpen && onSearchBarClose()
  }, [isSearchOpen, setSearchOpen, onSearchBarClose])

  // 搜索按钮的回调处理函数
  const closeSearch = useCallback(() => {
    setSearchOpen(false)
  }, [setSearchOpen])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Mac 下 command 是 metaKey，Windows/Linux 下 ctrl 是 ctrlKey
      const isCmdOrCtrl = event.metaKey || event.ctrlKey

      // 按下的键，k 可能会是大写或小写，所以转成小写比较保险
      const isK = event.key.toLowerCase() === 'k'
      if (isCmdOrCtrl && isK) {
        event.preventDefault()
        openSearch()
      }

      // 按下的键，escape 可能会是大写或小写，所以转成小写比较保险
      const isEscape = event.key.toLowerCase() === 'escape'
      if (isCmdOrCtrl && isEscape) {
        event.preventDefault()
        closeSearch()
      }

      // 按下的键，enter 可能会是大写或小写，所以转成小写比较保险
      const isEnter = event.key.toLowerCase() === 'enter'
      if (isEnter) {
        event.preventDefault()

        // 回车保存搜索记录
        updateSearchHistoryLocal(searchContentRef.current?.searchValue || '')
        closeSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openSearch])

  return (
    <>
      <KlButton className="hidden max-md:flex" isIconOnly onClick={() => openSearch()}>
        <div className="flex items-center gap-6 justify-between text-secondary dark:text-darksecondary">
          {/* 搜索图标 */}
          <IconSelf iconName="icon-[lucide--search]" />
        </div>
      </KlButton>
      <KlButton className="flex max-md:hidden rounded-2xl" onClick={() => openSearch()}>
        <div className="flex items-center gap-6 justify-between text-secondary dark:text-darksecondary">
          <div className="flex items-center gap-2">
            {/* 搜索图标 */}
            <IconSelf iconName="icon-[lucide--search]" />
            <div className="max-md:hidden">搜索</div>
          </div>
          {/* command + K 图标 */}
          <div className="max-md:hidden py-0.5 space-x-0.5 rtl:space-x-reverse font-sans font-normal text-center text-small shadow-small bg-default-100 rounded-2xl px-2 gap-0.5 flex items-center justify-center text-secondary dark:text-darksecondary">
            <IconSelf iconName="icon-[lucide--command]" size="text-small" />
            <span>K</span>
          </div>
        </div>
      </KlButton>

      {/* 搜索弹框 */}
      <KlModal
        open={isSearchOpen}
        setOpen={setSearchOpen}
        isTitleCenter={true}
        placement="top"
        backdrop="blur"
        size="2xl"
        hideCloseButton={true}
        searchStyle={true}
        showCancelButton={false}
        showConfirmButton={false}
        content={<SearchContent ref={searchContentRef} />}
        onCloseCallback={() => onSearchBarClose()}
      />
    </>
  )
}
