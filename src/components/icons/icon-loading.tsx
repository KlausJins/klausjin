const IconLoading = () => {
  return (
    <div>
      {/* 蒙版 */}
      <div className="absolute top-0 left-0 w-full z-1 h-full backdrop-blur-[2px] bg-bgPrimary/20 dark:bg-darkBgPrimary/20 flex items-center justify-center"></div>

      {/* 加载图标 */}
      <div className="relative z-2 flex-col gap-4 w-30 flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-darkBgPrimary dark:text-bgPrimary text-4xl animate-spin flex items-center justify-center border-t-darkBgPrimary dark:border-t-bgPrimary rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-darkBgPrimary dark:text-bgPrimary text-2xl animate-spin flex items-center justify-center border-t-darkBgPrimary dark:border-t-bgPrimary rounded-full"></div>
          </div>
        </div>
        <div>加载中...</div>
      </div>
    </div>
  )
}

export default IconLoading
