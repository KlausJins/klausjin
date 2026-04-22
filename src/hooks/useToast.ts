import { addToast } from '@heroui/react'
import { ReactNode, DOMAttributes } from 'react'

interface UseToastPropsType {
  title?: string
  description: string
  type?: 'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  hideIcon?: boolean
  icon?: ReactNode | ((props: DOMAttributes<HTMLElement>) => ReactNode)
  timeout?: number
  variant?: 'solid' | 'bordered' | 'flat'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}
export const useToast = () => {
  const showToast = ({
    title = '提示',
    description,
    type = 'danger',
    icon,
    hideIcon = true,
    timeout = 3000,
    variant = 'flat',
    radius = 'lg'
  }: UseToastPropsType) => {
    addToast({
      title,
      description,
      color: type,
      icon,
      hideIcon,
      timeout,
      variant,
      radius
    })
  }
  return showToast
}
