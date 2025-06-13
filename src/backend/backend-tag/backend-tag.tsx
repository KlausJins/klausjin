'use client'

import { DataTable } from '@/components/data-table'
import IconSelf from '@/components/icons/icon-self'
import Button from '@/components/ui/button'
import Field from '@/components/ui/field'
import { useToast } from '@/hooks'

export const BackendTag = () => {
  const Toast = useToast()
  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center gap-6">
        {/* 名称 */}
        <Field className="w-80" placeholder="请输入标签名称" />

        <div className="flex gap-6">
          {/* 测试Toast按钮 */}
          <Button filled="true" onClick={() => Toast({ description: '测试Toast效果' })}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--test-tube]" />
              <span>测试Toast效果</span>
            </div>
          </Button>
          {/* 搜索按钮 */}
          <Button filled="true">
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--search]" />
              <span>搜索</span>
            </div>
          </Button>
          {/* 创建标签按钮 */}
          <Button filled="true">
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--plus]" />
              <span>创建标签</span>
            </div>
          </Button>
          {/* 删除按钮 */}
          <Button filled="true">
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--trash]" />
              <span>删除</span>
            </div>
          </Button>
        </div>
      </div>

      {/* 表格 */}
      <DataTable />
    </div>
  )
}
