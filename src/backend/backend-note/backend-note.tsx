'use client'

import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import KlField from '@/components/ui/field'
import { NoteTable, NoteTableHandle } from './note-table'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { useCallback, useRef, useState } from 'react'
import { SelectX } from '@/components/ui/select-x'
import { TableRowsToArray } from '@/utils'
import { NoteModalContent } from '@/components/note-modal-content'
const options = [
  { value: '苹果', id: 'apple' },
  { value: '香蕉', id: 'banana' },
  { value: '橙子', id: 'orange' },
  { value: '榴莲', id: 'durian' },
  { value: '西瓜', id: 'watermelon' }
]

export const BackendNote = () => {
  const Toast = useToast()
  // 提示框状态
  const [open, setOpen] = useState(false)
  // 创建笔记模态框状态
  const [openCreateNote, setOpenCreateNote] = useState(false)

  const [selectedFruits, setSelectedFruits] = useState<string[]>([])

  const NoteTableRef = useRef<NoteTableHandle>(null)
  // 处理表格删除事件
  const ModalHandler = useCallback(() => {
    if (NoteTableRef.current) {
      const selectedKeys = TableRowsToArray(
        NoteTableRef.current.selectedKeys,
        NoteTableRef.current.allRowKeys
      )
      console.log('删除多条数据', selectedKeys)
      Toast({ type: 'success', description: '删除成功！' })
    }
  }, [Toast])

  // 点击删除标签按钮时候校验
  const delTag = useCallback(() => {
    if (NoteTableRef.current) {
      const selectedKeys = TableRowsToArray(
        NoteTableRef.current.selectedKeys,
        NoteTableRef.current.allRowKeys
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
        <div className="flex items-center justify-between gap-6">
          {/* 名称 */}
          <KlField className="w-80" placeholder="请输入笔记名称" />

          {/* 下拉框 */}
          <SelectX
            options={options}
            value={selectedFruits}
            onChange={setSelectedFruits}
            placeholder="请选择标签"
          />
        </div>

        <div className="flex gap-6">
          {/* 搜索按钮 */}
          <KlButton fill={true}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--search]" />
              <span>搜索</span>
            </div>
          </KlButton>
          {/* 创建笔记按钮 */}
          <KlButton fill={true} onPress={() => setOpenCreateNote(true)}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--plus]" />
              <span>创建笔记</span>
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
      <NoteTable ref={NoteTableRef} />

      {/* modal提示框 */}
      <KlModal
        content="确定删除选中的多条数据吗？"
        open={open}
        setOpen={setOpen}
        successCallback={() => ModalHandler()}
      />

      {/* 创建笔记模态框 */}
      <KlModal
        open={openCreateNote}
        setOpen={setOpenCreateNote}
        title="创建笔记"
        isTitleCenter={true}
        content={<NoteModalContent />}
        size="full"
        showCancelButton={false}
        confirmName="创建"
        successCallback={() => console.log('创建标签')}
      />
    </div>
  )
}
