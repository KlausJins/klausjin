import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export const svgToDataURL = (svgString: string): string => {
  const encoded = encodeURIComponent(svgString).replace(/'/g, '%27').replace(/"/g, '%22')

  return `data:image/svg+xml;charset=utf-8,${encoded}`
}

export const isSVGString = (input: string): boolean => {
  return /^\s*<svg[\s\S]*<\/svg>\s*$/i.test(input.trim())
}

export const isImageURL = (input: string): boolean => {
  return /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp|bmp|svg)(\?.*)?$/i.test(input)
}
