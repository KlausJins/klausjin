'use client'

import IconSelf from '@/components/icons/icon-self'
import KlButton from '@/components/ui/button'
import KlField from '@/components/ui/field'
import { NoteTable, NoteTableHandle } from './note-table'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SelectX } from '@/components/ui/select-x'
import { TableRowsToArray } from '@/utils'
import { NoteModalContent } from '@/components/note-modal-content'
import { deleteNotes, isAdmin, searchTags } from '@/actions/backend'
import { debounce } from 'lodash-es'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import {
  setEditId,
  setFilterValue,
  toggleIsRefreshTable
} from '@/store/features/backend-note-slice'
import { useSelector } from 'react-redux'
import { siteDeleteNotes } from '@/site/search-client'

export const BackendNote = () => {
  const Toast = useToast()
  const backendNoteStore = useSelector((state: RootState) => state.backendNote)
  const dispatch = useDispatch<AppDispatch>()
  // 提示框状态
  const [open, setOpen] = useState(false)
  // 标签模态框标题
  const [noteModalTitle, setNoteModalTitle] = useState('创建笔记')
  // 创建笔记模态框状态
  const [openCreateNote, setOpenCreateNote] = useState(false)

  // 标签下拉框数据
  const [tagsOptions, setTagsOptions] = useState<{ id: string; value: string }[]>([])
  // 笔记表格实例
  const NoteTableRef = useRef<NoteTableHandle>(null)

  // 处理表格删除事件
  const ModalHandler = useCallback(async () => {
    if (NoteTableRef.current) {
      const selectedKeys = TableRowsToArray(
        NoteTableRef.current.selectedKeys,
        NoteTableRef.current.allRowKeys
      )

      const isAdminPermission = await isAdmin()
      // console.log('isAdminPermission: ', isAdminPermission)

      if (!isAdminPermission) {
        return Toast({ description: '无操作权限！' })
      }

      // console.log('删除多条数据', selectedKeys)
      await deleteNotes(selectedKeys as string[]).then(() => {
        dispatch(toggleIsRefreshTable())
        Toast({ type: 'success', description: '删除成功！' })
      })

      // 同步删除Algolia的数据
      siteDeleteNotes(selectedKeys as string[])
        .then(() => {
          Toast({ type: 'success', description: '同步删除Algolia索引库成功！' })
        })
        .catch((err) => {
          Toast({ type: 'danger', description: `【同步删除Algolia报错】: ${err.message}` })
        })
    }
  }, [Toast, dispatch])

  // 点击删除标签按钮时候校验
  const delNote = useCallback(() => {
    if (NoteTableRef.current) {
      const selectedKeys = TableRowsToArray(
        NoteTableRef.current.selectedKeys,
        NoteTableRef.current.allRowKeys
      )
      // console.log('删除多条数据', selectedKeys)
      if (selectedKeys.length > 0) {
        setOpen(true)
      } else {
        Toast({ type: 'warning', description: '请选择要删除的笔记！' })
      }
    }
  }, [Toast])

  // 搜索标签
  const getTagsList = useMemo(() => {
    return debounce((name) => {
      searchTags({ name }).then((res) => {
        // console.log('notePage searchTags res: ', res)
        // 处理返回来的标签数据
        const temp_info = res.map((item) => {
          return {
            id: item.id,
            value: item.name
          }
        })

        // 设置标签数据
        setTagsOptions(temp_info)
      })
    }, 500)
  }, [setTagsOptions])

  // 输入框值改变
  const onSearchValueChange = useMemo(() => {
    return debounce((e) => {
      // console.log('e.target.value: ', e.target.value)
      dispatch(setFilterValue({ title: e.target.value })) // 设置搜索值
    }, 300)
  }, [dispatch])

  // 搜索笔记
  const searchHandler = useMemo(() => {
    return debounce(() => {
      if (NoteTableRef.current) {
        const { loadNoteTable, timeAscDesc } = NoteTableRef.current
        // 加载笔记列表
        loadNoteTable({ orderByType: timeAscDesc })
      }
    }, 300)
  }, [])

  // 首次进入页面加载所有标签
  useEffect(() => {
    getTagsList('')
  }, [getTagsList])

  return (
    <div className="h-[88vh] w-[95vw] flex flex-col">
      {/* 搜索栏 */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center justify-between gap-6">
          {/* 名称 */}
          <KlField
            className="w-80"
            placeholder="请输入笔记名称"
            onChange={(e) => onSearchValueChange(e)}
            onClear={() => {
              dispatch(setFilterValue({ title: '' }))
            }}
          />

          {/* 下拉框 */}
          <SelectX
            options={tagsOptions}
            value={backendNoteStore.filterValue?.selectedTags as string[]}
            onChange={(value) => {
              dispatch(setFilterValue({ selectedTags: value }))
            }}
            placeholder="请选择标签"
          />
        </div>

        <div className="flex gap-6">
          {/* 搜索按钮 */}
          <KlButton fill={true} onPress={searchHandler}>
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
          <KlButton fill={true} onPress={() => delNote()}>
            <div className="flex items-center gap-2">
              <IconSelf iconName="icon-[lucide--trash]" />
              <span>删除</span>
            </div>
          </KlButton>
        </div>
      </div>

      {/* 表格 */}
      <NoteTable
        ref={NoteTableRef}
        openEditNoteModal={() => {
          setNoteModalTitle('编辑标签')
          setOpenCreateNote(true)
        }}
      />

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
        title={noteModalTitle}
        isTitleCenter={true}
        content={
          <NoteModalContent
            closeModal={() => {
              // 清空编辑id，防止下次打开模态框时，显示的是上一次的编辑内容
              dispatch(setEditId(''))
              setOpenCreateNote(false)
            }}
          />
        }
        size="full"
        showCancelButton={false}
        showConfirmButton={false}
        // modal关闭时，恢复默认标题
        onCloseCallback={() => {
          // 清空编辑id，防止下次打开模态框时，显示的是上一次的编辑内容
          dispatch(setEditId(''))
          setNoteModalTitle('创建标签')
        }}
      />
    </div>
  )
}
