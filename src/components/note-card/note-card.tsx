import { clm } from '@/utils/normal'
import IconSelf from '../icons/icon-self'
import { SKILL_ICON_REACT, SKILL_ICON_VUE } from '@/constants/info'

interface INoteCardProps {
  className?: string
}

export const NoteCard = ({ className }: INoteCardProps) => {
  return (
    <div
      className={clm(
        'flex flex-col px-6 py-3 rounded-xl bg-lighterBgPrimary',
        'hover:bg-lighterBgPrimary dark:hover:bg-darkerBgPrimary active:bg-lighterBgPrimary dark:active:bg-darkerBgPrimary hover:cursor-pointer',
        className
      )}
    >
      {/* 笔记标签 */}
      <div className="hidden max-md:flex items-center flex-wrap gap-4 mb-2 text-xs text-content dark:text-darkContent">
        {/* 每一项标签内容 */}
        <div className="flex items-center gap-1">
          <span>#React</span>
          <IconSelf iconName={SKILL_ICON_REACT.iconPath} />
        </div>
        <div className="flex items-center gap-1">
          <span>#Vue</span>
          <IconSelf iconName={SKILL_ICON_VUE.iconPath} />
        </div>
        <div className="flex items-center gap-1">
          <span>#效率</span>
        </div>
      </div>

      {/* 笔记标题 */}
      <div className="text-xl font-black">这是一个笔记标题</div>

      {/* 笔记内容 */}
      <div className="text-sm text-content dark:text-darkContent my-4">这是一个笔记内容</div>

      {/* 笔记注脚内容 */}
      <div className="text-xs text-content dark:text-darkContent flex flex-wrap items-center justify-between gap-2">
        <div className="flex max-md:hidden items-center flex-wrap gap-4 text-xs text-content dark:text-darkContent">
          {/* 每一项标签内容 */}
          <div className="flex items-center gap-1">
            <span>#React</span>
            <IconSelf iconName={SKILL_ICON_REACT.iconPath} />
          </div>
          <div className="flex items-center gap-1">
            <span>#Vue</span>
            <IconSelf iconName={SKILL_ICON_VUE.iconPath} />
          </div>
          <div className="flex items-center gap-1">
            <span>#效率</span>
          </div>
        </div>
        <div className="flex items-center">
          <IconSelf iconName="icon-[lucide--calendar]" size="text-md" />
          <span>5月25，2025</span>
        </div>
      </div>
    </div>
  )
}
