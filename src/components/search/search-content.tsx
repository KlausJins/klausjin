'use client'

import IconSelf from '@/components/icons/icon-self'
import KlField from '../ui/field'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import { getSearchHistoryLocal, setAllSearchHistoryLocal } from './utils'
import { KlChip } from '../ui/chip'

export interface SearchContentHandle {
  searchValue: string
}

export interface SearchContentProps {}

export const SearchContent = forwardRef<SearchContentHandle, SearchContentProps>((_props, ref) => {
  // 搜索历史（从缓存里面获取）
  const [searchHistory, setSearchHistory] = useState<string[]>(getSearchHistoryLocal() || [])

  // 搜索框内容
  const [searchValue, setSearchValue] = useState<string>('')

  // 暴露给父组件的变量和方法
  useImperativeHandle(ref, () => ({
    searchValue
  }))

  // 删除搜索历史处理函数
  const handleHistoryClose = useCallback(
    (info: string) => {
      const new_searchHistory = searchHistory.filter((item) => item !== info)
      console.log('new_searchHistory: ', new_searchHistory)
      // 更新页面
      setSearchHistory(new_searchHistory)
      // 更新本地缓存
      setAllSearchHistoryLocal(new_searchHistory)
    },
    [searchHistory, setSearchHistory, setAllSearchHistoryLocal]
  )

  // 搜索历史点击处理函数
  const handleHistoryClick = useCallback(
    (info: string) => {
      setSearchValue(info)
    },
    [setSearchValue]
  )

  return (
    <div className="text-secondary dark:text-darksecondary">
      {/* 搜索框 */}
      <div className="flex items-center justify-center gap-4 reactive">
        {/* 搜索图标 */}
        <IconSelf
          iconName="icon-[lucide--search]"
          className="absolute left-8 z-10 text-secondary dark:text-darksecondary"
        />
        <KlField
          input_className="indent-[20px]"
          placeholder="请输入搜索内容"
          autoFocus
          value={searchValue}
          onValueChange={(val) => setSearchValue(val)}
        />
        {/* ESC 图标 */}
        <div className="max-md:hidden py-0.5 space-x-0.5 rtl:space-x-reverse font-sans font-normal text-center text-sm shadow-small bg-default-100 rounded-lg px-2 gap-0.5 flex items-center justify-center text-secondary dark:text-darksecondary">
          <span>ESC</span>
        </div>
      </div>

      {/* 搜索内容 */}
      <div className="my-2">
        <div className="flex flex-col pb-6">
          {/* 标题 */}
          <div className="text-sm my-2 font-bold text-secondary dark:text-darksecondary">
            <span>搜索历史</span>
            <span className="text-[12px] font-normal">(最多保存10条搜索记录)</span>
          </div>
          {/* 历史记录 */}
          {searchHistory.length > 0 && (
            <div className="flex flex-wrap   gap-2 hover:cursor-pointer select-none">
              {searchHistory.map((item, index) => (
                <div key={index} onClick={() => handleHistoryClick(item)}>
                  <KlChip
                    classNames={{ base: 'bg-default-100' }}
                    onClose={() => handleHistoryClose(item)}
                  >
                    {item}
                  </KlChip>
                </div>
              ))}
            </div>
          )}

          {/* 无搜索历史 */}
          {searchHistory.length == 0 && <span>暂无搜索历史</span>}
        </div>

        {/* 搜索结果 */}
        {/* <div className="flex flex-col items-center justify-center py-6 bg-amber-100">
          <div>搜索结果</div>
        </div> */}
      </div>
    </div>
  )
})
