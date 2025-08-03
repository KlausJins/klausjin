'use client'

import { deleteTags, hasAssociatedTag, isAdmin } from '@/actions/backend'
import { TagTable, TagTableHandle } from '@/backend/backend-tag/tag-table'
import IconSelf from '@/components/icons/icon-self'
import { TagModalContent } from '@/components/tag-modal-content'
import KlButton from '@/components/ui/button'
import KlField from '@/components/ui/field'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { AppDispatch } from '@/store'
import { setEditId, toggleIsRefreshTable } from '@/store/features/backend-tag-slice'
import { TableRowsToArray } from '@/utils'
import { debounce } from 'lodash-es'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

export const BackendTag = () => {
  const Toast = useToast()
  const dispatch = useDispatch<AppDispatch>()
  // 提示框状态
  const [open, setOpen] = useState(false)
  // 标签模态框标题
  const [tagModalTitle, setTagModalTitle] = useState('创建标签')
  // 创建标签模态框状态
  const [openCreateTag, setOpenCreateTag] = useState(false)
  // 标签表格实例
  const TagTableRef = useRef<TagTableHandle>(null)
  // 搜索关键词
  const [searchValue, setSearchValue] = useState<string | null>(null)

  // 处理表格删除事件
  const ModalHandler = useCallback(async () => {
    if (TagTableRef.current) {
      const selectedKeys = TableRowsToArray(
        TagTableRef.current.selectedKeys,
        TagTableRef.current.allRowKeys
      )

      const isAdminPermission = await isAdmin()
      console.log('isAdminPermission: ', isAdminPermission)

      if (!isAdminPermission) {
        return Toast({ description: '无操作权限！' })
      }

      // 删除标签前，先查询有无关联的笔记，如果有则不可以删除
      for (const deleteId of selectedKeys) {
        const associatedNum = await hasAssociatedTag(deleteId as string)

        if (associatedNum > 0) {
          return Toast({ description: '所选择的标签中存在关联笔记，不可删除！' })
        }
      }

      console.log('删除多条数据', selectedKeys)
      deleteTags(selectedKeys as string[]).then(() => {
        dispatch(toggleIsRefreshTable())
        Toast({ type: 'success', description: '删除成功！' })
      })
    }
  }, [dispatch, Toast])

  // 点击删除标签按钮时候校验
  const delTag = useCallback(() => {
    if (TagTableRef.current) {
      const { selectedKeys, allRowKeys } = TagTableRef.current

      const getSelectedKeys = TableRowsToArray(selectedKeys, allRowKeys)
      console.log('删除多条数据', getSelectedKeys)
      if (getSelectedKeys.length > 0) {
        setOpen(true)
      } else {
        Toast({ type: 'warning', description: '请选择要删除的标签！' })
      }
    }
  }, [Toast])

  // 搜索标签
  const searchHandler = useMemo(() => {
    return debounce(() => {
      if (TagTableRef.current) {
        const { loadTagTable, timeAscDesc } = TagTableRef.current
        // 加载标签列表
        loadTagTable({ name: searchValue?.trim() || '', orderByType: timeAscDesc })
      }
    }, 300)
  }, [searchValue])

  // 输入框值改变
  const onSearchValueChange = useMemo(() => {
    return debounce((e) => {
      console.log('e.target.value: ', e.target.value)
      setSearchValue(e.target.value)
    }, 300)
  }, [])

  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center justify-between gap-6">
        {/* 名称 */}
        <KlField
          className="w-80"
          placeholder="请输入标签名称"
          onChange={(e) => onSearchValueChange(e)}
          onClear={() => setSearchValue(null)}
        />

        <div className="flex gap-6">
          {/* 搜索按钮 */}
          <KlButton fill={true} onPress={searchHandler}>
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
      <TagTable
        ref={TagTableRef}
        openEditTagModal={() => {
          setTagModalTitle('编辑标签')
          setOpenCreateTag(true)
        }}
      />

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
        title={tagModalTitle}
        content={
          <TagModalContent
            closeModal={() => {
              // 清空编辑id，防止下次打开模态框时，显示的是上一次的编辑内容
              dispatch(setEditId(''))
              setOpenCreateTag(false)
            }}
          />
        }
        isTitleCenter={true}
        size="2xl"
        showCancelButton={false}
        showConfirmButton={false}
        // modal关闭时，恢复默认标题
        onCloseCallback={() => {
          // 清空编辑id，防止下次打开模态框时，显示的是上一次的编辑内容
          dispatch(setEditId(''))
          setTagModalTitle('创建标签')
        }}
      />
    </div>
  )
}
