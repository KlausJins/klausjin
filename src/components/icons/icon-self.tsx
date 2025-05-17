import { clm } from '@/utils/normal'

type Props = {
  iconName?: string
  size?: string
  color?: string
  className?: string
}

const IconSelf = (props: Props) => {
  return (
    <>
      <span
        className={clm(
          'icon-[fa6-brands--github]',
          'text-lg',
          props.iconName,
          props.size,
          props.color,
          props.className
        )}
      ></span>
    </>
  )
}

export default IconSelf
