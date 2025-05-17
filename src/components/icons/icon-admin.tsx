import { clm } from '@/utils/normal'

type Props = {
  classnames?: string
}

const IconAdmin = (props: Props) => {
  return (
    <>
      <span className={clm('icon-[lucide--user-cog]', props.classnames)}></span>
    </>
  )
}

export default IconAdmin
