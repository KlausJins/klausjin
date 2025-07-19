import Image from 'next/image'

type IconNotFoundProps = {
  width?: number
  height?: number
}

export const IconNotFound = ({ width = 400, height = 400 }: IconNotFoundProps) => {
  return (
    <>
      <Image
        className="flex dark:hidden"
        src={'/not-found/404-light.svg'}
        width={width}
        height={height}
        alt="404 Not Found"
      />
      <Image
        className="hidden dark:flex"
        src={'/not-found/404-dark.svg'}
        width={width}
        height={height}
        alt="404 Not Found"
      />
    </>
  )
}
