'use client'

import React from 'react'
import { Chip, Pagination, Selection } from '@heroui/react'
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
    tagName: 'Tony Reichert',
    lightIcon: 'CEO',
    darkIcon: 'Management',
    createTime: 'active',
    updateTime: '29'
  },
  {
    id: 2,
    tagName: 'Zoey Lang',
    lightIcon: 'Tech Lead',
    darkIcon: 'Development',
    createTime: 'paused',
    updateTime: '25'
  },
  {
    id: 3,
    tagName: 'Jane Fisher',
    lightIcon: 'Sr. Dev',
    darkIcon: 'Development',
    createTime: 'active',
    updateTime: '22'
  },
  {
    id: 4,
    tagName: 'William Howard',
    lightIcon: 'C.M.',
    darkIcon: 'Marketing',
    createTime: 'vacation',
    updateTime: '28'
  },
  {
    id: 5,
    tagName: 'Kristen Copper',
    lightIcon: 'S. Manager',
    darkIcon: 'Sales',
    createTime: 'active',
    updateTime: '24'
  },
  {
    id: 6,
    tagName: 'Brian Kim',
    lightIcon: 'P. Manager',
    darkIcon: 'Management',
    createTime: 'Active',
    updateTime: '29'
  },
  {
    id: 7,
    tagName: 'Michael Hunt',
    lightIcon: 'Designer',
    darkIcon: 'Design',
    createTime: 'paused',
    updateTime: '27'
  },
  {
    id: 8,
    tagName: 'Samantha Brooks',
    lightIcon: 'HR Manager',
    darkIcon: 'HR',
    createTime: 'active',
    updateTime: '31'
  },
  {
    id: 9,
    tagName: 'Frank Harrison',
    lightIcon: 'F. Manager',
    darkIcon: 'Finance',
    createTime: 'vacation',
    updateTime: '33'
  },
  {
    id: 10,
    tagName: 'Emma Adams',
    lightIcon: 'Ops Manager',
    darkIcon: 'Operations',
    createTime: 'active',
    updateTime: '35'
  },
  {
    id: 11,
    tagName: 'Brandon Stevens',
    lightIcon: 'Jr. Dev',
    darkIcon: 'Development',
    createTime: 'active',
    updateTime: '22'
  },
  {
    id: 12,
    tagName: 'Megan Richards',
    lightIcon: 'P. Manager',
    darkIcon: 'Product',
    createTime: 'paused',
    updateTime: '28'
  },
  {
    id: 13,
    tagName: 'Oliver Scott',
    lightIcon: 'S. Manager',
    darkIcon: 'Security',
    createTime: 'active',
    updateTime: '37'
  },
  {
    id: 14,
    tagName: 'Grace Allen',
    lightIcon: 'M. Specialist',
    darkIcon: 'Marketing',
    createTime: 'active',
    updateTime: '30'
  },
  {
    id: 15,
    tagName: 'Noah Carter',
    lightIcon: 'IT Specialist',
    darkIcon: 'I. Technology',
    createTime: 'paused',
    updateTime: '31'
  },
  {
    id: 16,
    tagName: 'Ava Perez',
    lightIcon: 'Manager',
    darkIcon: 'Sales',
    createTime: 'active',
    updateTime: '29'
  },
  {
    id: 17,
    tagName: 'Liam Johnson',
    lightIcon: 'Data Analyst',
    darkIcon: 'Analysis',
    createTime: 'active',
    updateTime: '28'
  },
  {
    id: 18,
    tagName: 'Sophia Taylor',
    lightIcon: 'QA Analyst',
    darkIcon: 'Testing',
    createTime: 'active',
    updateTime: '27'
  },
  {
    id: 19,
    tagName: 'Lucas Harris',
    lightIcon: 'Administrator',
    darkIcon: 'Information Technology',
    createTime: 'paused',
    updateTime: '32'
  },
  {
    id: 20,
    tagName: 'Mia Robinson',
    lightIcon: 'Coordinator',
    darkIcon: 'Operations',
    createTime: 'active',
    updateTime: '26'
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

export const TagTable = () => {
  // 表格行选择的keys
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  // 实际显示的行表头属性值
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  // 表格每页的行数
  const [rowsPerPage, setRowsPerPage] = React.useState(15)
  // 表格当前页码
  const [page, setPage] = React.useState(1)
  // 表格总页数
  const pages = Math.ceil(datas.length / rowsPerPage) || 1

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
        return (
          <Chip className="capitalize text-primary dark:text-darkprimary" size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'updateTime':
        return (
          <Chip className="capitalize text-primary dark:text-darkprimary" size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <KlButton isIconOnly={true}>
              <IconSelf iconName="icon-[lucide--edit-2]" />
            </KlButton>
            <KlButton isIconOnly={true}>
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
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? `已全选，总共 ${datas.length} 项`
            : `已选择 ${selectedKeys.size} 项，总共 ${datas.length} 项`}
        </span>
        <div className="flex gap-10">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
          <select
            className="bg-transparent outline-hidden text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    )
  }, [selectedKeys, onRowsPerPageChange, page, pages])

  return (
    // 表格
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
  )
}
