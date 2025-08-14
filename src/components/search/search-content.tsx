'use client'

import IconSelf from '@/components/icons/icon-self'
import KlField from '../ui/field'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { getSearchHistoryLocal, setAllSearchHistoryLocal } from './utils'
import { KlChip } from '../ui/chip'
import Link from 'next/link'
import { ALGOLIA_LINK } from '@/constants/info'
import IconAlgolia from '../icons/icon-algolia'
import { siteSearchNotes } from '@/site/search-client'
import { toSafeHTML } from '@/utils'
import { KlList } from '../ui/list'

export interface SearchContentHandle {
  searchValue: string
  handleSearch: (val: string) => void
}

export interface SearchContentProps {
  className?: string
  openModal?: (val: boolean) => void
}

type HighlightItem = {
  value: string
}

type SearchResultList = {
  id: string
  title: string
  description: string
  tags: string[]
}

export const SearchContent = forwardRef<SearchContentHandle, SearchContentProps>(
  ({ openModal }, ref) => {
    // 搜索历史（从缓存里面获取）
    const [searchHistory, setSearchHistory] = useState<string[]>(getSearchHistoryLocal() || [])

    // 搜索框内容
    const [searchValue, setSearchValue] = useState<string>('')

    // 是否搜索中
    const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false)
    // 是否显示查询结果
    const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false)

    // 搜索结果列表
    const [searchResultList, setSearchResultList] = useState<SearchResultList[]>([])

    // 删除搜索历史处理函数
    const handleHistoryClose = useCallback(
      (info: string) => {
        const new_searchHistory = searchHistory.filter((item) => item !== info)
        // console.log('new_searchHistory: ', new_searchHistory)
        // 更新页面
        setSearchHistory(new_searchHistory)
        // 更新本地缓存
        setAllSearchHistoryLocal(new_searchHistory)
      },
      [searchHistory, setSearchHistory]
    )

    // 搜索历史点击处理函数
    const handleHistoryClick = useCallback(
      (info: string) => {
        setIsShowSearchResult(true)
        setSearchValue(info)
        // 搜索
        handleSearch(info)
      },
      [setSearchValue]
    )

    // 搜索内容方法
    const handleSearch = useCallback(
      async (searchString: string) => {
        setIsSearchLoading(true)
        setIsShowSearchResult(true)

        // 搜索内容
        // console.log('searchString: ', searchString)
        const results = await siteSearchNotes(searchString)

        // console.log('handleSearch: ', results)

        // 处理查询结果数据结构
        const searchResultList_temp = results.hits.map((item) => ({
          id: toSafeHTML((item._highlightResult?.id as HighlightItem).value || ''),
          title: toSafeHTML((item._highlightResult?.title as HighlightItem).value || ''),
          description: toSafeHTML(
            (item._highlightResult?.description as HighlightItem).value || ''
          ),
          tags:
            (item._highlightResult?.tags as HighlightItem[]).map((item) =>
              toSafeHTML(item.value)
            ) || []
        }))
        setSearchResultList(searchResultList_temp)

        setIsSearchLoading(false)
      },
      [searchValue]
    )

    // 输入框值改变
    const onFieldValueChange = (val: string) => {
      // console.log('onFieldValueChange: ', val)
      setSearchValue(val)
      setIsShowSearchResult(false)

      if (!val) {
        // 刷新搜索历史列表
        setSearchHistory(getSearchHistoryLocal() || [])
      }
    }

    // 搜索列表选项点击处理函数
    const handleSearchListItemClick = useCallback(
      (itemId: string) => {
        if (openModal) openModal(false)
        // 点击搜索列表选项，跳转到对应的笔记详情页
        window.location.href = `/note/${itemId}`
      },
      [openModal]
    )

    // 暴露给父组件的变量和方法
    useImperativeHandle(ref, () => ({
      searchValue,
      handleSearch
    }))

    return (
      <div className="text-secondary dark:text-darksecondary">
        {/* 搜索框 */}
        <div className="flex items-center justify-center gap-4 relative">
          {/* 搜索图标 */}
          <IconSelf
            iconName="icon-[lucide--search]"
            className="absolute left-2 z-10 text-secondary dark:text-darksecondary"
          />
          <KlField
            input_className="indent-[20px] max-md:text-[16px]"
            placeholder="请输入搜索内容"
            autoFocus
            value={searchValue}
            onValueChange={(val) => onFieldValueChange(val)}
          />
          {/* ESC 图标 */}
          <div className="max-md:hidden py-0.5 space-x-0.5 rtl:space-x-reverse font-sans font-normal text-center text-sm shadow-small bg-default-100 rounded-lg px-2 gap-0.5 flex items-center justify-center text-secondary dark:text-darksecondary">
            <span>ESC</span>
          </div>
        </div>

        {/* 搜索内容 */}
        <div className="my-2">
          {!isSearchLoading && !isShowSearchResult && (
            <div className="flex flex-col pb-6">
              {/* 标题 */}
              <div className="text-sm my-2 font-bold text-secondary dark:text-darksecondary">
                <span>搜索历史</span>
                <span className="text-[12px] font-normal">(最多保存10条搜索记录)</span>
              </div>
              {/* 历史记录 */}
              {searchHistory.length > 0 && (
                <div className="flex flex-wrap gap-2 select-none">
                  {searchHistory.map((item, index) => (
                    <div key={index} onClick={() => handleHistoryClick(item)}>
                      <KlChip
                        classNames={{ base: 'bg-default-100 hover:cursor-pointer' }}
                        onClose={() => handleHistoryClose(item)}
                      >
                        {item}
                      </KlChip>
                    </div>
                  ))}
                </div>
              )}

              {/* 无搜索历史 */}
              {searchHistory.length == 0 && (
                <span className="flex items-center justify-center text-sm my-2 text-secondary dark:text-darksecondary">
                  暂无搜索历史
                </span>
              )}
            </div>
          )}

          {/* 搜索结果 */}
          <div className="flex flex-col justify-center gap-2 py-2">
            {/* 加载中效果 */}
            {isSearchLoading && isShowSearchResult && (
              <div className="flex justify-center items-center py-6">
                <div className="flex gap-2">
                  <div className="w-2 h-2 dark:bg-lighterBgPrimary bg-darkerBgPrimary rounded-full animate-bounce [animation-delay:.7s]"></div>
                  <div className="w-2 h-2 dark:bg-lighterBgPrimary bg-darkerBgPrimary rounded-full animate-bounce [animation-delay:.3s]"></div>
                  <div className="w-2 h-2 dark:bg-lighterBgPrimary bg-darkerBgPrimary rounded-full animate-bounce [animation-delay:.7s]"></div>
                </div>
              </div>
            )}

            {/* 最终搜索结果 */}
            {!isSearchLoading && isShowSearchResult && (
              <div>
                <KlList
                  listData={searchResultList}
                  onItemClick={(itemId) => handleSearchListItemClick(itemId)}
                  childrenContent={(item) => (
                    <div className="searchResult rounded-md px-3 py-2 select-none flex items-center justify-between">
                      <div>
                        <div
                          className="text-xl font-black"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <div
                          className="text-sm text-content dark:text-darkContent my-2"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                      {/* 箭头图标 */}
                      <div className="ml-10">
                        <IconSelf iconName="icon-[lucide--corner-down-left]" />
                      </div>
                    </div>
                  )}
                  emptyContent={
                    <span className="flex items-center justify-center text-sm my-2 text-secondary dark:text-darksecondary">
                      没有搜索到任何数据噢～
                    </span>
                  }
                ></KlList>
              </div>
            )}
          </div>
        </div>

        {/* 底部展示 algolia 供应商的标识 */}
        <div className="flex items-center justify-end overflow-hidden">
          <Link
            href={ALGOLIA_LINK}
            target="_blank"
            className="flex items-center justify-end h-10 gap-2"
          >
            <span className="text-[10px]">Search by</span>
            <IconAlgolia className="w-18" />
          </Link>
        </div>
      </div>
    )
  }
)

SearchContent.displayName = 'SearchContent'
