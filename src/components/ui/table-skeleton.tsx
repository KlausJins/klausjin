export const TableSkeleton = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] mx-auto w-full rounded-md border-none p-6 pt-40">
      <div className="flex flex-col animate-pulse gap-4">
        {Array.from({ length: 5 }).map((_item, index) => (
          <div className="flex animate-pulse space-x-12" key={index}>
            <div className="h-9 w-[2vw] rounded bg-[#F4F4F5] dark:bg-[#2D2D2D]"></div>
            <div className="h-9 w-[10vw] rounded bg-[#F4F4F5] dark:bg-[#2D2D2D]"></div>
            <div className="h-9 w-[10vw] rounded bg-[#F4F4F5] dark:bg-[#2D2D2D]"></div>
            <div className="h-9 w-[10vw] rounded bg-[#F4F4F5] dark:bg-[#2D2D2D]"></div>
            <div className="h-9 w-[20vw] rounded bg-[#F4F4F5] dark:bg-[#2D2D2D]"></div>
            <div className="h-9 w-[20vw] rounded bg-[#F4F4F5] dark:bg-[#2D2D2D]"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
