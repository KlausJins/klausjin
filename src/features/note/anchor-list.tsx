import { clm } from '@/utils'

export type AnchorItemType = {
  id: string
  text: string
  level: number
  children: AnchorItemType[]
}

export const AnchorList = ({
  anchor,
  onClick,
  activeId,
  LiClassName,
  AClassName,
  ischildren = false
}: {
  anchor: AnchorItemType[]
  onClick: (id: string) => void
  activeId: string
  LiClassName?: string
  AClassName?: string
  ischildren?: boolean
}) => {
  return (
    <ul>
      {anchor.map((item) => (
        <li key={item.id} className={clm('flex flex-col', LiClassName)}>
          <div className="flex items-center hover:cursor-pointer">
            <a
              href={`#${item.id}`}
              className={clm(
                'mt-2 px-3 py-1 rounded-lg',
                ischildren ? '' : 'font-bold',
                item.id === activeId
                  ? ' bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary'
                  : '',
                AClassName
              )}
              style={{
                marginLeft: ischildren ? `${(item.level - 2) * 26}px` : ''
              }}
              onClick={(e) => {
                e.preventDefault()
                onClick(item.id)
              }}
            >
              {item.text}
            </a>
          </div>
          {item.children.length > 0 && (
            <AnchorList
              anchor={item.children}
              onClick={onClick}
              ischildren={true}
              activeId={activeId}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
