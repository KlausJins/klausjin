import { DataTable } from '@/components/data-table'
import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import Field from '@/components/ui/field'

export const BackendNote = () => {
  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center gap-6">
        {/* 名称 */}
        <Field className="w-80" placeholder="请输入笔记名称" />

        <div className="flex gap-6">
          {/* 搜索按钮 */}
          <KlButton fill={true}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--search]" />
              <span>搜索</span>
            </div>
          </KlButton>
          {/* 创建笔记按钮 */}
          <KlButton fill={true}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--plus]" />
              <span>创建笔记</span>
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
