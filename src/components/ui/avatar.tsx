import { Avatar } from 'radix-ui'
import IconSelf from '../icons/icon-self'
import { clm } from '@/utils'

interface KlAvatarPropsType {
  src: string
  alt: string
  className?: string
}

export const KlAvatar = ({ src, alt, className }: KlAvatarPropsType) => (
  <div className="flex gap-5 text-secondary dark:text-darksecondary">
    <Avatar.Root
      className={clm(
        'inline-flex size-10 select-none items-center justify-center overflow-hidden rounded-full align-middle hover:cursor-pointer',
        className
      )}
    >
      <Avatar.Image className="size-full rounded-[inherit] object-cover" src={src} alt={alt} />
      <Avatar.Fallback
        className="leading-1 flex size-full items-center justify-center bg-lighterBgPrimary dark:bg-darkerBgPrimary text-[15px] font-medium text-violet11"
        delayMs={600}
      >
        <IconSelf iconName="icon-[lucide--image-off]" />
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
)
