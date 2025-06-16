'use client'

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor
} from '@heroui/react'
import KlButton from '../ui/button'
import IconSelf from '../icons/icon-self'

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
      <KlButton className="gap-1 text-[14px] border-0 h-8 bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary font-semibold hover:bg-darkHoverColor hover:dark:bg-hoverColor">
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
      <KlButton className="gap-1 text-[14px] border-0 h-8 bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary font-semibold hover:bg-darkHoverColor hover:dark:bg-hoverColor">
        <IconSelf iconName="icon-[lucide--calendar]" />
        <div>更新时间</div>
        {/* <IconSelf iconName="icon-[lucide--sort-asc]" />
        <IconSelf iconName="icon-[lucide--sort-desc]" /> */}
      </KlButton>
    )
  },
  { children: '', uid: 'actions' }
]

export const users = [
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

type User = (typeof users)[0]

export const DataTable = () => {
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending'
  })

  const [page, setPage] = React.useState(1)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

    console.log(filteredUsers)

    return filteredUsers
  }, [users, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number
      const second = b[sortDescriptor.column as keyof User] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User]

    switch (columnKey) {
      case 'tagName':
        return <div>{cellValue}</div>
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
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'updateTime':
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <KlButton isIconOnly={true}>
              <IconSelf iconName="icon-[lucide--eye]" />
            </KlButton>
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

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {users.length} users</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-hidden text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    )
  }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, users.length])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? `总共 ${filteredItems.length} 项，已全选`
            : `总共 ${filteredItems.length} 项，已选择 ${selectedKeys.size} 项`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    )
  }, [selectedKeys, items.length, page, pages])

  return (
    <Table
      isHeaderSticky
      aria-label="TagTable"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      onRowAction={() => {}}
      classNames={{
        base: ' h-[90%] mt-6',
        wrapper: 'h-[100%] bg-bgPrimary dark:bg-darkBgPrimary',
        table: 'bg-bgPrimary dark:bg-darkBgPrimary',
        th: 'bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary',
        tr: 'dark:data-[hover=true]:bg-darkTableHoverColor/1 dark:data-[selected=true]:bg-darkTableSelectColor/1 data-[hover=true]:bg-tableHoverColor/1 data-[selected=true]:bg-tableSelectColor/1'
      }}
      selectedKeys={selectedKeys}
      checkboxesProps={{
        classNames: {
          wrapper:
            'dark:group-data-[hover=true]:before:bg-transparent group-data-[hover=true]:before:bg-transparent dark:after:bg-bgPrimary dark:text-primary after:bg-darkBgPrimary text-bgPrimary'
        }
      }}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.children}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
