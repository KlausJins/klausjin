'use client'

import { TagTable, TagTableHandle } from '@/backend/backend-tag/tag-table'
import IconSelf from '@/components/icons/icon-self'
import { TagModalContent } from '@/components/tag-modal-content'
import KlButton from '@/components/ui/button'
import KlField from '@/components/ui/field'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { TableRowsToArray } from '@/utils'
import { useCallback, useRef, useState } from 'react'

export const BackendTag = () => {
  const Toast = useToast()
  // 提示框状态
  const [open, setOpen] = useState(false)
  // 创建标签模态框状态
  const [openCreateTag, setOpenCreateTag] = useState(false)
  // 标签表格实例
  const TagTableRef = useRef<TagTableHandle>(null)

  // 处理表格删除事件
  const ModalHandler = useCallback(() => {
    if (TagTableRef.current) {
      const selectedKeys = TableRowsToArray(
        TagTableRef.current.selectedKeys,
        TagTableRef.current.allRowKeys
      )
      console.log('删除多条数据', selectedKeys)
      Toast({ type: 'success', description: '删除成功！' })
    }
  }, [Toast])

  // 点击删除标签按钮时候校验
  const delTag = useCallback(() => {
    if (TagTableRef.current) {
      const selectedKeys = TableRowsToArray(
        TagTableRef.current.selectedKeys,
        TagTableRef.current.allRowKeys
      )
      console.log('删除多条数据', selectedKeys)
      if (selectedKeys.length > 0) {
        setOpen(true)
      } else {
        Toast({ type: 'warning', description: '请选择要删除的标签！' })
      }
    }
  }, [Toast])

  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center justify-between gap-6">
        {/* 名称 */}
        <KlField className="w-80" placeholder="请输入标签名称" />

        <div className="flex gap-6">
          {/* 搜索按钮 */}
          <KlButton fill={true}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--search]" />
              <span>搜索</span>
            </div>
          </KlButton>
          {/* 创建标签按钮 */}
          <KlButton fill={true} onPress={() => setOpenCreateTag(true)}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--plus]" />
              <span>创建标签</span>
            </div>
          </KlButton>
          {/* 删除按钮 */}
          <KlButton fill={true} onPress={() => delTag()}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--trash]" />
              <span>删除</span>
            </div>
          </KlButton>
        </div>
      </div>

      {/* 表格 */}
      <TagTable ref={TagTableRef} />

      {/* modal提示框 */}
      <KlModal
        content="确定删除选中的多条数据吗？"
        open={open}
        setOpen={setOpen}
        successCallback={() => ModalHandler()}
      />

      {/* 创建标签模态框 */}
      <KlModal
        open={openCreateTag}
        setOpen={setOpenCreateTag}
        title="创建标签"
        content={<TagModalContent />}
        isTitleCenter={true}
        size="2xl"
        showCancelButton={false}
        confirmName="创建"
        successCallback={() => console.log('创建标签')}
      />
    </div>
  )
}
