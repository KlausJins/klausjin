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
