import Image from 'next/image'

type IconEmptyProps = {
  width?: number
  height?: number
}

export const IconEmpty = ({ width = 200, height = 200 }: IconEmptyProps) => (
  <>
    <Image
      className="flex dark:hidden"
      src={'/empty/emptySearch-light.svg'}
      width={width}
      height={height}
      alt="404 Not Found"
    />
    <Image
      className="hidden dark:flex"
      src={'/empty/emptySearch-dark.svg'}
      width={width}
      height={height}
      alt="404 Not Found"
    />
  </>
)
