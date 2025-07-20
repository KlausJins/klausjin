import Image from 'next/image'

type IconEmptySiteProps = {
  width?: number
  height?: number
}

export const IconEmptySite = ({ width = 400, height = 400 }: IconEmptySiteProps) => {
  return (
    <>
      <Image
        className="flex dark:hidden max-md:w-[300px]"
        src={'/empty/emptySite-light.svg'}
        width={width}
        height={height}
        alt="empty"
      />
      <Image
        className="hidden dark:flex max-md:w-[300px]"
        src={'/empty/emptySite-dark.svg'}
        width={width}
        height={height}
        alt="empty"
      />
    </>
  )
}
