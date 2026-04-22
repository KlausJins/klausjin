import Image from 'next/image'

type IconEmptyNoteDetailProps = {
  width?: number
  height?: number
}

export const IconEmptyNoteDetail = ({ width = 400, height = 400 }: IconEmptyNoteDetailProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        className="flex dark:hidden"
        src={'/empty/emptyNoteDetail-light.svg'}
        width={width}
        height={height}
        alt="没有找到笔记"
      />
      <Image
        className="hidden dark:flex"
        src={'/empty/emptyNoteDetail-dark.svg'}
        width={width}
        height={height}
        alt="没有找到笔记"
      />
      <span className="text-2xl font-black text-primary dark:text-[#C6CACD]">没有找到笔记哦～</span>
    </div>
  )
}
