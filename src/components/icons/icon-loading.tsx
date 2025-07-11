const IconLoading = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <div className="flex-col gap-4 w-30 flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-darkBgPrimary dark:text-bgPrimary text-4xl animate-spin flex items-center justify-center border-t-darkBgPrimary dark:border-t-bgPrimary rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-darkBgPrimary dark:text-bgPrimary text-2xl animate-spin flex items-center justify-center border-t-darkBgPrimary dark:border-t-bgPrimary rounded-full"></div>
        </div>
      </div>
      <div>加载中...</div>
    </div>
  )
}

export default IconLoading
