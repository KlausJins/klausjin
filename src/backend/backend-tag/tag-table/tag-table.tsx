'use client'

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from 'react'
import { Selection } from '@heroui/react'
import KlButton from '@/components/ui/button'
import IconSelf from '@/components/icons/icon-self'
import { clm, formatChineseDateTime } from '@/utils'
import {
  KlTable,
  KlTableBody,
  KlTableCell,
  KlTableColumn,
  KlTableHeader,
  KlTableRow
} from '@/components/ui/table'
import { KlPagination } from '@/components/ui/pagination'
import { PerPage } from '@/components/ui/per-page'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { searchTags } from '@/actions/backend/backend-tag'

const INITIAL_VISIBLE_COLUMNS = [
  'tagName',
  'lightIcon',
  'darkIcon',
  'createTime',
  'updateTime',
  'actions'
]

type Datas = {
  id: string
  tagName: string
  lightIcon: string | null
  darkIcon: string | null
  createTime: string
  updateTime: string
}

export interface TagTableHandle {
  selectedKeys: 'all' | Iterable<React.Key> | undefined
  allRowKeys: string[]
}

export interface TagTableProps {
  openEditTagModal: () => void
}

export const TagTable = forwardRef<TagTableHandle, TagTableProps>(({ openEditTagModal }, ref) => {
  const Toast = useToast()
  // 表格数据
  const [tagInfos, setTagInfos] = React.useState<Datas[]>([])
  // 表格行选择的keys
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  // 实际显示的行表头属性值
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  // 获取当前点击actions时表格的key
  const [currentID, setCurrentID] = React.useState<string | null>(null)
  // 提示框状态
  const [open, setOpen] = React.useState(false)
  // 表格每页的行数
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  // 表格当前页码
  const [page, setPage] = React.useState(1)
  // 表格总页数
  const pages = Math.ceil(tagInfos.length / rowsPerPage) || 1

  // 暴露给父组件的变量和方法
  useImperativeHandle(ref, () => ({
    selectedKeys,
    allRowKeys: tagInfos.map((row) => row.id)
  }))

  // 首次展示加载所有tag数据
  useEffect(() => {
    searchTags().then((res) => {
      console.log('searchTags res: ', res)
      const res_info = res.map((item) => {
        return {
          id: item.id,
          tagName: item.name,
          lightIcon: item.icon,
          darkIcon: item.iconDark,
          createTime: formatChineseDateTime(item.createdAt),
          updateTime: formatChineseDateTime(item.updatedAt)
        }
      })

      setTagInfos(res_info)
    })
  }, [setTagInfos])

  // 每一列的样式格式设置
  const columns = useMemo(
    () => [
      { children: 'ID', uid: 'id' },
      {
        uid: 'tagName',
        children: (
          <div className="flex items-center gap-1 text-[14px]">
            <IconSelf iconName="icon-[lucide--type]" />
            <div>名称</div>
          </div>
        )
      },
      {
        uid: 'lightIcon',
        children: (
          <div className="flex items-center gap-1 text-[14px]">
            <IconSelf iconName="icon-[lucide--image]" />
            <div>浅色标签</div>
          </div>
        )
      },
      {
        uid: 'darkIcon',
        children: (
          <div className="flex items-center gap-1 text-[14px]  font-semibold">
            <IconSelf iconName="icon-[lucide--image]" />
            <div>深色标签</div>
          </div>
        )
      },
      {
        uid: 'createTime',
        children: (
          <KlButton
            className={clm(
              'gap-1 text-[14px] border-0 h-8 font-semibold',
              'bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary hover:bg-transparent hover:dark:bg-hoverColor'
            )}
          >
            <IconSelf iconName="icon-[lucide--calendar]" />
            <div>创建时间</div>
            {/* <IconSelf iconName="icon-[lucide--sort-asc]" />
        <IconSelf iconName="icon-[lucide--sort-desc]" /> */}
          </KlButton>
        )
      },
      {
        uid: 'updateTime',
        children: (
          <KlButton
            className={clm(
              'gap-1 text-[14px] border-0 h-8 font-semibold',
              'bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary hover:bg-transparent hover:dark:bg-hoverColor'
            )}
          >
            <IconSelf iconName="icon-[lucide--calendar]" />
            <div>更新时间</div>
            {/* <IconSelf iconName="icon-[lucide--sort-asc]" />
        <IconSelf iconName="icon-[lucide--sort-desc]" /> */}
          </KlButton>
        )
      },
      { children: '', uid: 'actions' }
    ],
    []
  )

  // 处理表格删除事件
  const ModalHandler = useCallback(() => {
    console.log('currentID: ', currentID)
    Toast({ type: 'success', description: '删除成功！' })
  }, [currentID, Toast])

  // 处理后的表头（过滤掉不相交的表头属性数据）
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  // 处理后的表格行数据
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return tagInfos.slice(start, end)
  }, [page, rowsPerPage, tagInfos])

  // 表格行单元格的渲染设置方法
  const renderCell = React.useCallback((datas: Datas, columnKey: React.Key) => {
    const cellValue = datas[columnKey as keyof Datas]

    switch (columnKey) {
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            {/* 编辑按钮 */}
            <KlButton
              isIconOnly={true}
              onPress={() => {
                openEditTagModal()
                setCurrentID(datas.id)
              }}
            >
              <IconSelf iconName="icon-[lucide--edit-2]" />
            </KlButton>
            {/* 删除按钮 */}
            <KlButton
              isIconOnly={true}
              onPress={() => {
                setOpen(true)
                setCurrentID(datas.id)
              }}
            >
              <IconSelf iconName="icon-[lucide--trash]" className="text-[#EF4444]" />
            </KlButton>
          </div>
        )
      case 'lightIcon':
        return (
          <div className="flex flex-col w-8">{cellValue ? <img src={cellValue} /> : 'N/A'}</div>
        )
      case 'darkIcon':
        return (
          <div className="flex flex-col w-8">
            <div className="flex flex-col w-8">{cellValue ? <img src={cellValue} /> : 'N/A'}</div>
          </div>
        )
      default:
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        )
    }
  }, [])

  // 分页器条数设置方法
  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  // 表格底部组件
  const tableBottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-secondary dark:text-darksecondary">
          {selectedKeys === 'all'
            ? `已全选，总共 ${tagInfos.length} 项`
            : `已选择 ${selectedKeys.size} 项，总共 ${tagInfos.length} 项`}
        </span>
        <div className="flex gap-10 justify-end items-center min-w-100">
          <KlPagination page={page} total={pages} onChange={setPage} />
          <PerPage defaultSelectedKeys={'10'} onChange={onRowsPerPageChange} />
        </div>
      </div>
    )
  }, [selectedKeys, onRowsPerPageChange, page, pages])

  return (
    <>
      {/* modal提示框 */}
      <KlModal
        content="确定删除该条数据吗？"
        open={open}
        setOpen={setOpen}
        successCallback={() => ModalHandler()}
      />
      {/* 表格 */}
      <KlTable
        bottomContent={tableBottomContent}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <KlTableHeader columns={headerColumns}>
          {(column) => (
            <KlTableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.children}
            </KlTableColumn>
          )}
        </KlTableHeader>
        <KlTableBody emptyContent={'No users found'} items={items}>
          {(item) => (
            <KlTableRow key={item.id}>
              {(columnKey) => <KlTableCell>{renderCell(item, columnKey)}</KlTableCell>}
            </KlTableRow>
          )}
        </KlTableBody>
      </KlTable>
    </>
  )
})

TagTable.displayName = 'TagTable'
