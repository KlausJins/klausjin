import Image from 'next/image'

type IconEmptyContentProps = {
  width?: number
  height?: number
}

export const IconEmptyContent = ({ width = 400, height = 400 }: IconEmptyContentProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        className="flex dark:hidden"
        src={'/empty/emptyContent-light.svg'}
        width={width}
        height={height}
        alt="404 Not Found"
      />
      <Image
        className="hidden dark:flex"
        src={'/empty/emptyContent-dark.svg'}
        width={width}
        height={height}
        alt="404 Not Found"
      />
      <span className="text-2xl font-black text-primary dark:text-[#C6CACD]">没有找到数据哦～</span>
    </div>
  )
}
