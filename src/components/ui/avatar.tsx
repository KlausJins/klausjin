import { Avatar } from 'radix-ui'
import IconSelf from '../icons/icon-self'

interface KlAvatarPropsType {
  src: string
  alt: string
}

export const KlAvatar = ({ src, alt }: KlAvatarPropsType) => (
  <div className="flex gap-5 text-secondary dark:text-darksecondary">
    <Avatar.Root className="inline-flex size-10 select-none items-center justify-center overflow-hidden rounded-full align-middle hover:cursor-pointer">
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
