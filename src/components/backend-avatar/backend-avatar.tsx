import Button from '@/components/ui/button'
import { KlAvatar } from '../ui/avatar'
import {
  KlDropdownMenu,
  KlDropdownMenuContent,
  KlDropdownMenuItem,
  KlDropdownMenuSeparator,
  KlDropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import IconSelf from '../icons/icon-self'

interface BackendAvatarPropsType {
  src: string
  alt: string
}

export const BackendAvatar = ({ src, alt }: BackendAvatarPropsType) => {
  return (
    <div>
      <KlDropdownMenu>
        <KlDropdownMenuTrigger asChild>
          <Button className="border-none p-0 rounded-full">
            <KlAvatar src={src} alt={alt} className="size-8" />
          </Button>
        </KlDropdownMenuTrigger>
        <KlDropdownMenuContent align="end" className=" gap-2 w-auto min-w-60">
          <div className="flex items-center gap-2 p-2">
            <KlAvatar src={src} alt={alt} className="hover:cursor-default" />
            <div className="felx flex-col justify-between">
              <div className="text-sm font-black ">KlausJin</div>
              <div className="text-xs ">KlausJin@gmail.com</div>
            </div>
          </div>
          <KlDropdownMenuSeparator className="border-[0.5px] border-borderColor dark:border-darkBorderColor" />
          <KlDropdownMenuItem>
            <div className="flex items-center gap-1 text-sm py-1">
              <IconSelf iconName="icon-[lucide--log-out]" />
              <div>退出登录</div>
            </div>
          </KlDropdownMenuItem>
        </KlDropdownMenuContent>
      </KlDropdownMenu>
    </div>
  )
}
