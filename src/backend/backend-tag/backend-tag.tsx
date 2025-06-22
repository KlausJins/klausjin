'use client'

import { TagTable, TagTableHandle } from '@/backend/backend-tag/tag-table'
import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import Field from '@/components/ui/field'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { useCallback, useRef, useState } from 'react'

export const BackendTag = () => {
  const Toast = useToast()
  // 提示框状态
  const [open, setOpen] = useState(false)

  const TagTableRef = useRef<TagTableHandle>(null)

  // 处理表格删除事件
  const ModalHandler = useCallback(() => {
    if (TagTableRef.current) {
      const selectedKeys = TagTableRef.current.selectedKeys
      console.log('删除多条数据', selectedKeys)
      Toast({ type: 'success', description: '删除成功！' })
    }
  }, [Toast])

  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center justify-between gap-6">
        {/* 名称 */}
        <Field className="w-130" placeholder="请输入标签名称" />

        <div className="flex gap-6">
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
          {/* modal提示框 */}
          <KlModal
            desc="确定删除选中的多条数据吗？"
            open={open}
            setOpen={setOpen}
            successCallback={() => ModalHandler()}
          >
            {/* 删除按钮 */}
            <KlButton fill={true} onPress={() => setOpen(true)}>
              <div className="flex items-center gap-2">
                <IconSelf iconName="icon-[lucide--trash]" />
                <span>删除</span>
              </div>
            </KlButton>
          </KlModal>
        </div>
      </div>

      {/* 表格 */}
      <TagTable ref={TagTableRef} />
    </div>
  )
}
