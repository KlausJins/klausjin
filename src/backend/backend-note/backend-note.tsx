'use client'

import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import Field from '@/components/ui/field'
import { NoteTable, NoteTableHandle } from './note-table'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { useCallback, useRef, useState } from 'react'

export const BackendNote = () => {
  const Toast = useToast()
  // 提示框状态
  const [open, setOpen] = useState(false)

  const NoteTableRef = useRef<NoteTableHandle>(null)

  // 处理表格删除事件
  const ModalHandler = useCallback(() => {
    if (NoteTableRef.current) {
      const selectedKeys = NoteTableRef.current.selectedKeys
      console.log('删除多条数据', selectedKeys)
      Toast({ type: 'success', description: '删除成功！' })
    }
  }, [Toast])

  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center justify-between gap-6">
        {/* 名称 */}
        <Field className="w-130" placeholder="请输入笔记名称" />

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
      <NoteTable ref={NoteTableRef} />
    </div>
  )
}
