'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Button from '../ui/button'
import IconSelf from '../icons/icon-self'
import { Checkbox } from 'radix-ui'

type TagType = {
  select: boolean
  tagName: string
  lightIcon: string
  darkIcon: string
  createtime: string
  updatetime: string
  action?: string
}

const defaultData: TagType[] = [
  {
    select: false,
    tagName: 'SSR',
    lightIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cg fill='none'%3E%3Crect width='256' height='256' fill='%23f4f2ed' rx='60'/%3E%3Cpath fill='%2344d1fd' d='M144.934 38.062L200.709 38l-93.575 93.526l-24.387 24.251L55 127.996zm-.519 83.507c.724-.956 2.056-.484 3.067-.607l53.179.013l-48.467 48.42l-27.891-27.72z'/%3E%3Cpath fill='%231fbcfd' d='m96.501 169.442l27.802-27.767l27.891 27.72l.116.123l-28 27.74z'/%3E%3Cpath fill='%2308589c' d='m124.31 197.258l28-27.74l48.371 48.419c-18.22.041-36.434-.014-54.647.027c-1.038.232-1.68-.717-2.343-1.304z'/%3E%3C/g%3E%3C/svg%3E",
    darkIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cg fill='none'%3E%3Crect width='256' height='256' fill='%23242938' rx='60'/%3E%3Cpath fill='%2344d1fd' d='M144.934 38.062L200.709 38l-93.575 93.526l-24.387 24.251L55 127.996zm-.519 83.507c.724-.956 2.056-.484 3.067-.607l53.179.013l-48.467 48.42l-27.891-27.72z'/%3E%3Cpath fill='%231fbcfd' d='m96.501 169.442l27.802-27.767l27.891 27.72l.116.123l-28 27.74z'/%3E%3Cpath fill='%2308589c' d='m124.31 197.258l28-27.74l48.371 48.419c-18.22.041-36.434-.014-54.647.027c-1.038.232-1.68-.717-2.343-1.304z'/%3E%3C/g%3E%3C/svg%3E",
    createtime: '2024年3月19日 星期二 10:58:00',
    updatetime: '2024年3月19日 星期二 10:58:00'
  },
  {
    select: false,
    tagName: 'React',
    lightIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cg fill='none'%3E%3Crect width='256' height='256' fill='%23f4f2ed' rx='60'/%3E%3Cpath fill='%2344d1fd' d='M144.934 38.062L200.709 38l-93.575 93.526l-24.387 24.251L55 127.996zm-.519 83.507c.724-.956 2.056-.484 3.067-.607l53.179.013l-48.467 48.42l-27.891-27.72z'/%3E%3Cpath fill='%231fbcfd' d='m96.501 169.442l27.802-27.767l27.891 27.72l.116.123l-28 27.74z'/%3E%3Cpath fill='%2308589c' d='m124.31 197.258l28-27.74l48.371 48.419c-18.22.041-36.434-.014-54.647.027c-1.038.232-1.68-.717-2.343-1.304z'/%3E%3C/g%3E%3C/svg%3E",
    darkIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cg fill='none'%3E%3Crect width='256' height='256' fill='%23242938' rx='60'/%3E%3Cpath fill='%2344d1fd' d='M144.934 38.062L200.709 38l-93.575 93.526l-24.387 24.251L55 127.996zm-.519 83.507c.724-.956 2.056-.484 3.067-.607l53.179.013l-48.467 48.42l-27.891-27.72z'/%3E%3Cpath fill='%231fbcfd' d='m96.501 169.442l27.802-27.767l27.891 27.72l.116.123l-28 27.74z'/%3E%3Cpath fill='%2308589c' d='m124.31 197.258l28-27.74l48.371 48.419c-18.22.041-36.434-.014-54.647.027c-1.038.232-1.68-.717-2.343-1.304z'/%3E%3C/g%3E%3C/svg%3E",
    createtime: '2024年3月19日 星期二 10:56:18',
    updatetime: '2024年5月19日 星期日 16:27:31'
  },
  {
    select: false,
    tagName: '个人计划',
    lightIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cg fill='none'%3E%3Crect width='256' height='256' fill='%23f4f2ed' rx='60'/%3E%3Cpath fill='%2344d1fd' d='M144.934 38.062L200.709 38l-93.575 93.526l-24.387 24.251L55 127.996zm-.519 83.507c.724-.956 2.056-.484 3.067-.607l53.179.013l-48.467 48.42l-27.891-27.72z'/%3E%3Cpath fill='%231fbcfd' d='m96.501 169.442l27.802-27.767l27.891 27.72l.116.123l-28 27.74z'/%3E%3Cpath fill='%2308589c' d='m124.31 197.258l28-27.74l48.371 48.419c-18.22.041-36.434-.014-54.647.027c-1.038.232-1.68-.717-2.343-1.304z'/%3E%3C/g%3E%3C/svg%3E",
    darkIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cg fill='none'%3E%3Crect width='256' height='256' fill='%23242938' rx='60'/%3E%3Cpath fill='%2344d1fd' d='M144.934 38.062L200.709 38l-93.575 93.526l-24.387 24.251L55 127.996zm-.519 83.507c.724-.956 2.056-.484 3.067-.607l53.179.013l-48.467 48.42l-27.891-27.72z'/%3E%3Cpath fill='%231fbcfd' d='m96.501 169.442l27.802-27.767l27.891 27.72l.116.123l-28 27.74z'/%3E%3Cpath fill='%2308589c' d='m124.31 197.258l28-27.74l48.371 48.419c-18.22.041-36.434-.014-54.647.027c-1.038.232-1.68-.717-2.343-1.304z'/%3E%3C/g%3E%3C/svg%3E",
    createtime: '2024年3月19日 星期二 04:31:05',
    updatetime: '2024年3月22日 星期五 23:48:34'
  }
]

const columns: ColumnDef<TagType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="w-0 box-border">
        <Checkbox.Root className="flex size-4.5 appearance-none items-center justify-center rounded-full border outline-none hover:cursor-pointer border-primary dark:border-darkprimary text-primary dark:text-darkprimary">
          <Checkbox.Indicator className="flex justify-center items-center">
            <IconSelf iconName="icon-[lucide--check]" className="text-sm" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
    ),
    cell: (info) => (
      <div className="w-2 box-border">
        <Checkbox.Root className="flex size-4.5 appearance-none items-center justify-center rounded-full border outline-none hover:cursor-pointer border-primary dark:border-darkprimary text-primary dark:text-darkprimary">
          <Checkbox.Indicator className="flex justify-center items-center">
            <IconSelf iconName="icon-[lucide--check]" className="text-sm" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
    ),
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'tagName',
    header: ({ table }) => (
      <div className="flex items-center gap-1">
        <IconSelf iconName="icon-[lucide--type]" />
        <span>名称</span>
      </div>
    ),
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'lightIcon',
    header: ({ table }) => (
      <div className="flex items-center gap-1">
        <IconSelf iconName="icon-[lucide--image]" />
        <span>浅色标签</span>
      </div>
    ),
    cell: (info) => <img src={info.row.original.lightIcon} className="size-6" alt="" />,
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'darkIcon',
    header: ({ table }) => (
      <div className="flex items-center gap-1">
        <IconSelf iconName="icon-[lucide--image]" />
        <span>深色标签</span>
      </div>
    ),
    cell: (info) => <img src={info.row.original.darkIcon} className="size-6" alt="" />,
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'createtime',
    header: ({ table }) => (
      <Button className="border-0 flex items-center gap-1 text-sm text-secondary dark:text-darksecondary font-semibold px-4 h-9 active:bg-activeColor/10 dark:active:bg-darkActiveColor/10">
        <IconSelf iconName="icon-[lucide--calendar]" />
        <span>创建时间</span>
        {/* <div className="flex items-center">
          <IconSelf iconName="icon-[lucide--arrow-up-narrow-wide]" />
          <IconSelf iconName="icon-[lucide--arrow-down-narrow-wide]" />
        </div> */}
      </Button>
    ),
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'updatetime',
    header: ({ table }) => (
      <Button className="border-0 flex items-center gap-1 text-sm text-secondary dark:text-darksecondary font-semibold px-4 h-9 active:bg-activeColor/10 dark:active:bg-darkActiveColor/10">
        <IconSelf iconName="icon-[lucide--calendar]" />
        <span>更新时间</span>
        {/* <div className="flex items-center">
          <IconSelf iconName="icon-[lucide--arrow-up-narrow-wide]" />
          <IconSelf iconName="icon-[lucide--arrow-down-narrow-wide]" />
        </div> */}
      </Button>
    ),
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  },
  {
    id: 'action',
    header: ({ table }) => <></>,
    cell: (info) => (
      <div className="flex gap-2">
        <Button className="text-sm font-semibold px-2.5 h-9 active:bg-activeColor/10 dark:active:bg-darkActiveColor/10">
          <IconSelf iconName="icon-[lucide--edit]" />
        </Button>
        <Button className="text-sm font-semibold px-2.5 h-9 active:bg-activeColor/10 dark:active:bg-darkActiveColor/10">
          <IconSelf iconName="icon-[lucide--trash]" className="text-[#FA2C37]" />
        </Button>
      </div>
    ),
    footer: (info) => info.column.id
  }
]

export const DataTable = () => {
  const [data, _setData] = useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="border-1 h-[100%] border-borderColor dark:border-darkBorderColor rounded-2xl mt-6 overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
