import { ImageAssests } from '@/constants/assets'
import { WEBSITE } from '@/constants/info'
import Image from 'next/image'

interface ILogoPropsType {
  width?: number
}

const Logo = (props: ILogoPropsType) => {
  const { width = 32 } = props
  return (
    <div>
      <Image className="dark:hidden" src={ImageAssests.LogoDark} alt={WEBSITE} width={width} />
      <Image
        className="hidden dark:block"
        src={ImageAssests.LogoLight}
        alt={WEBSITE}
        width={width}
      />
    </div>
  )
}

export default Logo
