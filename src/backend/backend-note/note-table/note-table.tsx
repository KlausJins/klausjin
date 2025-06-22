'use client'

import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Selection } from '@heroui/react'
import KlButton from '@/components/ui/button'
import IconSelf from '@/components/icons/icon-self'
import { clm } from '@/utils'
import {
  KlTable,
  KlTableBody,
  KlTableCell,
  KlTableColumn,
  KlTableHeader,
  KlTableRow
} from '@/components/ui/table'
import { KlPagination } from '@/components/ui/pagination'
import { KlChip } from '@/components/ui/chip'
import { PerPage } from '@/components/ui/per-page'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'

export const columns = [
  { children: 'ID', uid: 'id' },
  {
    uid: 'title',
    children: (
      <div className="flex items-center gap-1 text-[14px]">
        <IconSelf iconName="icon-[lucide--type]" />
        <div>标题</div>
      </div>
    )
  },
  {
    uid: 'author',
    children: (
      <div className="flex items-center gap-1 text-[14px]">
        <IconSelf iconName="icon-[lucide--type]" />
        <div>作者</div>
      </div>
    )
  },
  {
    uid: 'tags',
    children: (
      <div className="flex items-center gap-1 text-[14px]  font-semibold">
        <IconSelf iconName="icon-[lucide--tags]" />
        <div>标签</div>
      </div>
    )
  },
  {
    uid: 'publishStatus',
    children: (
      <div className="flex items-center gap-1 text-[14px]  font-semibold">
        <IconSelf iconName="icon-[lucide--stars]" />
        <div>发布状态</div>
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
]

export const datas = [
  {
    id: 1,
    title: 'Tony Reichert',
    author: 'CEO',
    tags: 'Management',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '29'
  },
  {
    id: 2,
    title: 'Zoey Lang',
    author: 'Tech Lead',
    tags: 'Development',
    publishStatus: 'publishStatus',
    createTime: 'paused',
    updateTime: '25'
  },
  {
    id: 3,
    title: 'Jane Fisher',
    author: 'Sr. Dev',
    tags: 'Development',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '22'
  },
  {
    id: 4,
    title: 'William Howard',
    author: 'C.M.',
    tags: 'Marketing',
    publishStatus: 'publishStatus',
    createTime: 'vacation',
    updateTime: '28'
  },
  {
    id: 5,
    title: 'Kristen Copper',
    author: 'S. Manager',
    tags: 'Sales',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '24'
  },
  {
    id: 6,
    title: 'Brian Kim',
    author: 'P. Manager',
    tags: 'Management',
    publishStatus: 'publishStatus',
    createTime: 'Active',
    updateTime: '29'
  },
  {
    id: 7,
    title: 'Michael Hunt',
    author: 'Designer',
    tags: 'Design',
    publishStatus: 'publishStatus',
    createTime: 'paused',
    updateTime: '27'
  },
  {
    id: 8,
    title: 'Samantha Brooks',
    author: 'HR Manager',
    tags: 'HR',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '31'
  },
  {
    id: 9,
    title: 'Frank Harrison',
    author: 'F. Manager',
    tags: 'Finance',
    publishStatus: 'publishStatus',
    createTime: 'vacation',
    updateTime: '33'
  },
  {
    id: 10,
    title: 'Emma Adams',
    author: 'Ops Manager',
    tags: 'Operations',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '35'
  },
  {
    id: 11,
    title: 'Brandon Stevens',
    author: 'Jr. Dev',
    tags: 'Development',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '22'
  },
  {
    id: 12,
    title: 'Megan Richards',
    author: 'P. Manager',
    tags: 'Product',
    publishStatus: 'publishStatus',
    createTime: 'paused',
    updateTime: '28'
  },
  {
    id: 13,
    title: 'Oliver Scott',
    author: 'S. Manager',
    tags: 'Security',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '37'
  },
  {
    id: 14,
    title: 'Grace Allen',
    author: 'M. Specialist',
    tags: 'Marketing',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '30'
  },
  {
    id: 15,
    title: 'Noah Carter',
    author: 'IT Specialist',
    tags: 'I. Technology',
    publishStatus: 'publishStatus',
    createTime: 'paused',
    updateTime: '31'
  },
  {
    id: 16,
    title: 'Ava Perez',
    author: 'Manager',
    tags: 'Sales',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '29'
  },
  {
    id: 17,
    title: 'Liam Johnson',
    author: 'Data Analyst',
    tags: 'Analysis',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '28'
  },
  {
    id: 18,
    title: 'Sophia Taylor',
    author: 'QA Analyst',
    tags: 'Testing',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '27'
  },
  {
    id: 19,
    title: 'Lucas Harris',
    author: 'Administrator',
    tags: 'Information Technology',
    publishStatus: 'publishStatus',
    createTime: 'paused',
    updateTime: '32'
  },
  {
    id: 20,
    title: 'Mia Robinson',
    author: 'Coordinator',
    tags: 'Operations',
    publishStatus: 'publishStatus',
    createTime: 'active',
    updateTime: '26'
  }
]
const INITIAL_VISIBLE_COLUMNS = [
  'title',
  'author',
  'tags',
  'publishStatus',
  'createTime',
  'updateTime',
  'actions'
]

type Datas = (typeof datas)[0]

export interface NoteTableHandle {
  selectedKeys: 'all' | Iterable<React.Key> | undefined
}

export const NoteTable = forwardRef<NoteTableHandle>((_props, ref) => {
  const Toast = useToast()
  // 表格行选择的keys
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  // 实际显示的行表头属性值
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  // 获取当前点击actions时表格的key
  const [currentID, setCurrentID] = React.useState<number | null>(null)
  // 提示框状态
  const [open, setOpen] = React.useState(false)
  // 表格每页的行数
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  // 表格当前页码
  const [page, setPage] = React.useState(1)
  // 表格总页数
  const pages = Math.ceil(datas.length / rowsPerPage) || 1

  // 暴露给父组件的变量和方法
  useImperativeHandle(ref, () => ({
    selectedKeys
  }))

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

    return datas.slice(start, end)
  }, [page, rowsPerPage])

  // 表格行单元格的渲染设置方法
  const renderCell = React.useCallback((datas: Datas, columnKey: React.Key) => {
    const cellValue = datas[columnKey as keyof Datas]

    switch (columnKey) {
      case 'lightIcon':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        )
      case 'darkIcon':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        )
      case 'createTime':
        return <KlChip>{cellValue}</KlChip>
      case 'updateTime':
        return <KlChip>{cellValue}</KlChip>
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <KlButton isIconOnly={true}>
              <IconSelf iconName="icon-[lucide--eye]" />
            </KlButton>
            <KlButton isIconOnly={true}>
              <IconSelf iconName="icon-[lucide--edit-2]" />
            </KlButton>
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
      default:
        return cellValue
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
            ? `已全选，总共 ${datas.length} 项`
            : `已选择 ${selectedKeys.size} 项，总共 ${datas.length} 项`}
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
        desc="确定删除该条数据吗？"
        open={open}
        setOpen={setOpen}
        successCallback={() => ModalHandler()}
      ></KlModal>
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

NoteTable.displayName = 'NoteTable'
