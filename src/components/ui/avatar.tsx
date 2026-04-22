import { Avatar } from '@heroui/react'
import IconSelf from '../icons/icon-self'
import { clm } from '@/utils'

interface KlAvatarPropsType {
  src: string
  isBordered?: boolean
  radius?: 'md' | 'none' | 'sm' | 'lg' | 'full'
  showFallback?: boolean
  fallback?: React.ReactNode
  base_className?: string
}

export const KlAvatar = ({
  src,
  isBordered = false,
  radius = 'md',
  showFallback = true,
  fallback = <IconSelf iconName="icon-[lucide--image-off]" />,
  base_className
}: KlAvatarPropsType) => {
  return (
    <Avatar
      src={src}
      isBordered={isBordered}
      radius={radius}
      showFallback={showFallback}
      fallback={fallback}
      classNames={{
        base: clm('size-8 bg-lighterBgPrimary dark:bg-darkBgPrimary', base_className)
      }}
    />
  )
}
