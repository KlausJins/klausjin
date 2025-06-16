'use client'

import { DataTable } from '@/components/data-table'
import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import Field from '@/components/ui/field'
import { useToast } from '@/hooks'

export const BackendTag = () => {
  const Toast = useToast()

  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center justify-between gap-6">
        {/* 名称 */}
        <Field className="w-130" placeholder="请输入标签名称" />

        <div className="flex gap-6">
          {/* 测试Toast按钮 */}
          <KlButton fill={true} onPress={() => Toast({ description: '测试Toast效果' })}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--test-tube]" />
              <span>测试Toast效果</span>
            </div>
          </KlButton>
          {/* 搜索按钮 */}
          <KlButton fill={true}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--search]" />
              <span>搜索</span>
            </div>
          </KlButton>
          {/* 创建标签按钮 */}
          <KlButton fill={true}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--plus]" />
              <span>创建标签</span>
            </div>
          </KlButton>
          {/* 删除按钮 */}
          <KlButton fill={true}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--trash]" />
              <span>删除</span>
            </div>
          </KlButton>
        </div>
      </div>

      {/* 表格 */}
      <DataTable />
    </div>
  )
}
