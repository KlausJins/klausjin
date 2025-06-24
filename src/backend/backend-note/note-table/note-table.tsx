'use client'

import React, { ChangeEvent, forwardRef, useCallback, useImperativeHandle } from 'react'
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
import { KlSwitch } from '@/components/ui/switch'

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
    title: '使用Shell脚本实现自动化打包前端项目并上传到云服务器',
    author: 'KlausJin',
    tags: ['React', '效率', 'Rocky Linux', '项目工程化', 'Vue'],
    publishStatus: 'publishStatus',
    createTime: '2024年11月3日 星期日 19:00:13',
    updateTime: '2024年11月3日 星期日 19:04:24'
  },
  {
    id: 2,
    title: '在浏览器中使用 js 获取视频和图片的信息',
    author: 'KlausJin',
    tags: ['TypeScript', 'JavaScript'],
    publishStatus: 'publishStatus',
    createTime: '2024年10月28日 星期一 22:11:42',
    updateTime: '2024年11月7日 星期四 23:50:14'
  },
  {
    id: 3,
    title: 'MySQL 学习笔记',
    author: 'KlausJin',
    tags: ['MySQL'],
    publishStatus: 'publishStatus',
    createTime: '2024年6月26日 星期三 22:31:06',
    updateTime: '2024年7月7日 星期日 23:10:01'
  },
  {
    id: 4,
    title: 'Xcode 上传 app 时报错：You do not have required contracts to perform an operation',
    author: 'KlausJin',
    tags: ['Flutter', 'Xcode', 'iOS'],
    publishStatus: 'publishStatus',
    createTime: '2024年6月25日 星期二 20:08:16',
    updateTime: '2024年6月27日 星期四 12:38:39'
  },
  {
    id: 5,
    title: 'Flutter 中优雅地将数字格式化为各种国家的货币',
    author: 'KlausJin',
    tags: ['Flutter'],
    publishStatus: 'publishStatus',
    createTime: '2024年6月10日 星期一 21:43:34',
    updateTime: '2024年6月18日 星期二 00:24:18'
  },
  {
    id: 6,
    title: '各种 Flutter Material 组件自定义样式',
    author: 'KlausJin',
    tags: ['Flutter'],
    publishStatus: 'publishStatus',
    createTime: '2024年6月10日 星期一 20:53:16',
    updateTime: '2024年6月10日 星期一 21:03:40'
  },
  {
    id: 7,
    title: '如何把 CSS BoxShadow 转换为 Flutter BoxShadow',
    author: 'KlausJin',
    tags: ['Flutter'],
    publishStatus: 'publishStatus',
    createTime: '2024年6月10日 星期一 13:47:44',
    updateTime: '2024年6月10日 星期一 13:47:44'
  },
  {
    id: 8,
    title: 'Flutter GetX 使用问题汇总',
    author: 'KlausJin',
    tags: ['Flutter'],
    publishStatus: 'publishStatus',
    createTime: '2024年6月9日 星期日 23:46:27',
    updateTime: '2024年6月9日 星期日 23:46:27'
  },
  {
    id: 9,
    title: '使用 tailwindcss-debug-screens 实时显示屏幕断点',
    author: 'KlausJin',
    tags: ['Tailwind CSS'],
    publishStatus: 'publishStatus',
    createTime: '2024年5月20日 星期一 20:36:20',
    updateTime: '2024年5月20日 星期一 20:42:28'
  },
  {
    id: 10,
    title:
      '解决 Next.js 报错：Server Error Error: (0 , react__WEBPACK_IMPORTED_MODULE_0__.createContext) is not a function',
    author: 'KlausJin',
    tags: ['Next.js'],
    publishStatus: 'publishStatus',
    createTime: '2024年5月19日 星期日 23:00:54',
    updateTime: '2024年5月20日 星期一 20:39:15'
  },
  {
    id: 11,
    title: 'Flutter 中如何自定义字体',
    author: 'KlausJin',
    tags: ['Flutter'],
    publishStatus: 'publishStatus',
    createTime: '2024年4月27日 星期六 15:27:35',
    updateTime: '2024年4月27日 星期六 15:27:35'
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
  allRowKeys: number[]
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
    selectedKeys,
    allRowKeys: datas.map((row) => row.id)
  }))

  // 处理表格删除事件
  const ModalHandler = useCallback(() => {
    console.log('currentID: ', currentID)
    Toast({ type: 'success', description: '删除成功！' })
  }, [currentID, Toast])

  // 处理表格删除事件
  const publishNote = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: number) => {
      console.log('id: ', id)
      if (e.target.checked) {
        Toast({ type: 'success', description: '笔记发布成功！' })
      } else {
        Toast({ type: 'success', description: '笔记取消发布！' })
      }
    },
    [Toast]
  )

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
  const renderCell = React.useCallback(
    (datas: Datas, columnKey: React.Key) => {
      const cellValue = datas[columnKey as keyof Datas]

      switch (columnKey) {
        case 'title':
          return (
            <div className="flex flex-col max-w-60 wrap-break-word">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          )
        case 'tags':
          const tagsInfo = cellValue as string[]
          if (tagsInfo.length > 0) {
            return (
              <div className="flex flex-wrap max-w-40">
                {tagsInfo.map((item) => (
                  <div key={item} className="m-1">
                    <KlChip>{item}</KlChip>
                  </div>
                ))}
              </div>
            )
          } else {
            return 'N/A'
          }
        case 'publishStatus':
          return <KlSwitch onChange={(e) => publishNote(e, datas.id)}></KlSwitch>
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
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          )
      }
    },
    [publishNote]
  )

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
