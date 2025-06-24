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
