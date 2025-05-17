import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const clm = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}
