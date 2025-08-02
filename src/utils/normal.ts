import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toSrcset } from 'mini-svg-data-uri'

export const clm = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}

// 将表格数据转换为数组
export const TableRowsToArray = <T>(
  input: 'all' | Iterable<T> | undefined,
  allList: T[] = []
): T[] => {
  if (input === 'all') return allList
  if (!input) return []
  return Array.from(input)
}

// 将svg字符串转换为dataURL格式
export const svgToDataURL = (svgString?: string) => {
  if (!svgString) {
    return ''
  }

  if (!svgString.startsWith('<svg')) {
    return svgString
  }

  return toSrcset(svgString)
}

// 判断是否为svg字符串
export const isSVGString = (input: string): boolean => {
  return /^\s*<svg[\s\S]*<\/svg>\s*$/i.test(input.trim())
}

// 判断是否为图片URL
export const isImageURL = (input: string): boolean => {
  return /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp|bmp|svg)(\?.*)?$/i.test(input)
}

// 判断是否为浏览器环境
export const isBrowser = () => {
  // 代码来自：https://ahooks.js.org/zh-CN/guide/blog/ssr
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}

// 复制到粘贴板
export const copyToClipboard = (text: string) => {
  // Clipboard API 在 iPhone 上不支持
  if (navigator.clipboard) {
    navigator.clipboard
      // 去除首尾空白字符
      .writeText(text.trim())
  } else {
    // 以下代码来自：https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    // 赋值，手动去除首尾空白字符
    textarea.value = text.trim()
    // 选中
    textarea.select()

    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
}

// 提取 url 中顶级域名
// eg: https://www.example.com/path/to/page => example.com
export const extractDomainFromUrl = (urlString: string) => {
  const url = new URL(urlString)
  const hostnameParts = url.hostname.split('.')
  if (hostnameParts.length >= 2) {
    return hostnameParts.slice(-2).join('.')
  } else {
    return url.hostname
  }
}
