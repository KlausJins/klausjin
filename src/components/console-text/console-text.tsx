'use client'

import { ASCII_ART_TEXT } from '@/constants/console-log'
import { GITHUB_PAGE_LINK } from '@/constants/info'
import { isBrowser } from '@/utils'

const fontFamily =
  'font-family: Poppins, PingFang SC, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";'

;(() => {
  if (isBrowser()) {
    // 放到这里执行，保证只输出一次
    console.log(ASCII_ART_TEXT)
  }
  console.log(
    `%c路过的客官觉得小弟的博客还不错的话，欢迎点个 ⭐，谢谢！👇`,
    `color: #00A1D6; font-size: 1rem;${fontFamily}`
  )
  console.log(
    `%c网站源码 Github：${GITHUB_PAGE_LINK}`,
    `color: #999; font-size: 1rem;${fontFamily}`
  )
})()

export const Console = () => {
  return null
}
