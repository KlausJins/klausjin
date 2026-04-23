'use client'

import { getLocalStorage, setLocalStorage } from '@/utils'

export const setAllSearchHistoryLocal = (dataArr: string[]) => {
  setLocalStorage('searchHistory', dataArr)
}

export const updateSearchHistoryLocal = (data: string) => {
  const data_temp = data.trim()

  const history_temp = (getSearchHistoryLocal() || []) as string[]
  // console.log('history_temp: ', history_temp)
  const hasFound = history_temp.find((item) => item === data_temp)

  // 如果没有重复，则添加在数组最前面
  if (!hasFound && !!data_temp) {
    history_temp.unshift(data_temp)
  }

  setLocalStorage('searchHistory', history_temp.slice(0, 10))
}

export const getSearchHistoryLocal = () => {
  return getLocalStorage('searchHistory') || []
}
