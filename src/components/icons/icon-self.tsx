import { clm } from '@/utils'

type Props = {
  iconName: string
  size?: string
  color?: string
  className?: string
}

const IconSelf = (props: Props) => {
  return (
    <>
      <span
        className={clm('text-lg', props.iconName, props.size, props.color, props.className)}
      ></span>
    </>
  )
}

export default IconSelf
