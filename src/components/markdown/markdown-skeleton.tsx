export const MarkdownSkeleton = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] mx-auto w-full rounded-md border-none p-4">
      <div className="flex flex-col animate-pulse space-x-4">
        {/* 文档基本信息 */}
        <div className="flex-1 space-y-8 py-1 mb-20">
          <div className="h-10 w-[40vw] rounded bg-lighterBgPrimary dark:bg-darkerBgPrimary"></div>
          <div className="space-y-6">
            <div className="col-span-1 h-8 rounded bg-lighterBgPrimary dark:bg-darkerBgPrimary"></div>
            <div className="h-6 w-[30vw] rounded bg-lighterBgPrimary dark:bg-darkerBgPrimary"></div>
          </div>
        </div>
        {/* 文档内容 */}
        <div className="flex-1 space-y-8 py-1">
          <div className="h-8 w-[20vw] rounded bg-lighterBgPrimary dark:bg-darkerBgPrimary"></div>
          <div className="h-6 w-[40vw] rounded bg-lighterBgPrimary dark:bg-darkerBgPrimary"></div>
          <div className="space-y-6">
            <div className="grid grid-cols-24 gap-4">
              <div className="col-span-4 h-6 rounded bg-lighterBgPrimary dark:bg-darkerBgPrimary"></div>
              <div className="col-span-12 h-6 rounded bg-lighterBgPrimary dark:bg-darkerBgPrimary"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
