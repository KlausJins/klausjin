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
import { PerPage } from '@/components/ui/per-page'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'

export const columns = [
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
]

export const datas = [
  {
    id: 1,
    tagName: 'Vue',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年10月7日 星期一 22:56:54',
    updateTime: '2024年10月7日 星期一 22:56:54'
  },
  {
    id: 2,
    tagName: 'iOS',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年6月25日 星期二 19:48:34',
    updateTime: '2024年6月25日 星期二 19:48:34'
  },
  {
    id: 3,
    tagName: 'Xcode',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年6月25日 星期二 19:48:24',
    updateTime: '2024年6月25日 星期二 19:48:24'
  },
  {
    id: 4,
    tagName: '项目工程化',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年5月22日 星期三 23:36:25',
    updateTime: '2024年5月22日 星期三 23:36:25'
  },
  {
    id: 5,
    tagName: '名词解释',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年5月19日 星期日 22:27:12',
    updateTime: '2024年5月19日 星期日 22:27:12'
  },
  {
    id: 6,
    tagName: 'Flutter',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年4月27日 星期六 15:12:30',
    updateTime: '2024年4月27日 星期六 15:12:30'
  },
  {
    id: 7,
    tagName: 'Caddy',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年4月3日 星期三 17:02:47',
    updateTime: '2024年4月3日 星期三 17:02:47'
  },
  {
    id: 8,
    tagName: 'Docker',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年4月1日 星期一 13:23:30',
    updateTime: '2024年4月1日 星期一 13:23:30'
  },
  {
    id: 9,
    tagName: 'Git',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年3月31日 星期日 12:37:39',
    updateTime: '2024年3月31日 星期日 12:37:39'
  },
  {
    id: 10,
    tagName: 'Rocky Linux',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年3月28日 星期四 22:57:06',
    updateTime: '2024年3月28日 星期四 22:57:06'
  },
  {
    id: 11,
    tagName: 'NextAuth.js',
    lightIcon: 'N/A',
    darkIcon: 'N/A',
    createTime: '2024年3月27日 星期三 21:41:31',
    updateTime: '2024年3月27日 星期三 21:41:31'
  }
]

const INITIAL_VISIBLE_COLUMNS = [
  'tagName',
  'lightIcon',
  'darkIcon',
  'createTime',
  'updateTime',
  'actions'
]

type Datas = (typeof datas)[0]

export interface TagTableHandle {
  selectedKeys: 'all' | Iterable<React.Key> | undefined
  allRowKeys: number[]
}

export const TagTable = forwardRef<TagTableHandle>((_props, ref) => {
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
    selectedKeys,
    allRowKeys: datas.map((row) => row.id)
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
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
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
