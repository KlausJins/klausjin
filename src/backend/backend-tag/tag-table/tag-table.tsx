'use client'

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import { Selection } from '@heroui/react'
import KlButton from '@/components/ui/button'
import IconSelf from '@/components/icons/icon-self'
import { clm, formatChineseDateTime, getTimeValue } from '@/utils'
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
import { deleteTags, isAdmin, searchTags, searchTagsParams } from '@/actions/backend'
// import { TableSkeleton } from '@/components/ui/table-skeleton'
import { EmptyContent } from '@/components/icons/empty-content'
import { setEditId, toggleIsRefreshTable } from '@/store/features/backend-tag-slice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import IconLoading from '@/components/icons/icon-loading'

export const enum TIME_ASC_DESC {
  CREATEASC = 'CREATEASC',
  CREATEDESC = 'CREATEDESC',
  UPDATEASC = 'UPDATEASC',
  UPDATEDESC = 'UPDATEDESC'
}

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
  createTS: number
  createTime: string
  updateTS: number
  updateTime: string
}

export interface TagTableHandle {
  selectedKeys: 'all' | Iterable<React.Key> | undefined
  allRowKeys: string[]
  loadTagTable: (payload: searchTagsParams) => void
  setTagInfos: React.Dispatch<React.SetStateAction<Datas[]>>
  timeAscDesc: TIME_ASC_DESC
}

export interface TagTableProps {
  openEditTagModal: () => void
}

export const TagTable = forwardRef<TagTableHandle, TagTableProps>(({ openEditTagModal }, ref) => {
  const Toast = useToast()
  const backendTagStore = useSelector((state: RootState) => state.backendTag)
  const dispatch = useDispatch<AppDispatch>()
  // 表格数据
  const [tagInfos, setTagInfos] = React.useState<Datas[]>([])
  // 是否正在加载表格数据
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  // 表格行选择的keys
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  // 实际显示的行表头属性值
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  // 表头时间的状态
  const [timeAscDesc, setTimeAscDesc] = useState<TIME_ASC_DESC>(TIME_ASC_DESC.UPDATEDESC)
  // 获取当前点击actions时表格的key
  const [deleteId, setDeleteId] = React.useState<string>('')
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
    allRowKeys: tagInfos.map((row) => row.id),
    loadTagTable,
    setTagInfos,
    timeAscDesc
  }))

  // 刷新页面（加载页面）
  const loadTagTable = useCallback(
    (payload: searchTagsParams) => {
      setIsLoading(true)

      searchTags(payload).then((res) => {
        console.log('searchTags res: ', res)
        const res_info = res.map((item) => {
          return {
            id: item.id,
            tagName: item.name,
            lightIcon: item.icon,
            darkIcon: item.iconDark,
            createTS: getTimeValue(item.createdAt),
            createTime: formatChineseDateTime(item.createdAt),
            updateTS: getTimeValue(item.updatedAt),
            updateTime: formatChineseDateTime(item.updatedAt)
          }
        })

        setIsLoading(false)
        setTagInfos(res_info)
      })
    },
    [setIsLoading, setTagInfos]
  )

  // 首次展示加载所有tag数据
  useEffect(() => {
    loadTagTable({ name: '' })
  }, [loadTagTable, backendTagStore.isRefreshTable])

  const timerHandler = useCallback(
    (type: 'create' | 'update') => {
      const temp_tagInfos = [...tagInfos]

      if (type === 'create') {
        // 创建时间变换
        if (timeAscDesc == 'CREATEDESC') {
          // 升序
          setTimeAscDesc(TIME_ASC_DESC.CREATEASC)
          setTagInfos(temp_tagInfos.sort((a, b) => a.createTS - b.createTS))
        } else {
          // 降序
          setTimeAscDesc(TIME_ASC_DESC.CREATEDESC)
          setTagInfos(temp_tagInfos.sort((a, b) => b.createTS - a.createTS))
        }
      } else if (type === 'update') {
        // 更新时间变换
        if (timeAscDesc == 'UPDATEDESC') {
          // 升序
          setTimeAscDesc(TIME_ASC_DESC.UPDATEASC)
          setTagInfos(temp_tagInfos.sort((a, b) => a.updateTS - b.updateTS))
        } else {
          // 降序
          setTimeAscDesc(TIME_ASC_DESC.UPDATEDESC)
          setTagInfos(temp_tagInfos.sort((a, b) => b.updateTS - a.updateTS))
        }
      }
    },
    [tagInfos, setTagInfos, timeAscDesc, setTimeAscDesc]
  )

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
            onPress={() => timerHandler('create')}
          >
            <IconSelf iconName="icon-[lucide--calendar]" />
            <div>创建时间</div>
            {/* 创建时间的图形变换 */}
            {timeAscDesc == TIME_ASC_DESC.CREATEASC && (
              <IconSelf iconName="icon-[lucide--sort-asc]" />
            )}
            {timeAscDesc == TIME_ASC_DESC.CREATEDESC && (
              <IconSelf iconName="icon-[lucide--sort-desc]" />
            )}
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
            onPress={() => timerHandler('update')}
          >
            <IconSelf iconName="icon-[lucide--calendar]" />
            <div>更新时间</div>
            {/* 更新时间的图形变换 */}
            {timeAscDesc == TIME_ASC_DESC.UPDATEASC && (
              <IconSelf iconName="icon-[lucide--sort-asc]" />
            )}
            {timeAscDesc == TIME_ASC_DESC.UPDATEDESC && (
              <IconSelf iconName="icon-[lucide--sort-desc]" />
            )}
          </KlButton>
        )
      },
      { children: '', uid: 'actions' }
    ],
    [timeAscDesc, timerHandler]
  )

  // 处理表格删除事件
  const ModalHandler = useCallback(async () => {
    console.log('deleteId: ', deleteId)
    if (deleteId) {
      const isAdminPermission = await isAdmin(process.env.ADMIN_GITHUB_IDS)
      console.log('isAdminPermission: ', isAdminPermission)

      if (!isAdminPermission) {
        return Toast({ description: '无操作权限！' })
      }

      deleteTags([deleteId]).then(() => {
        // 刷新页面
        dispatch(toggleIsRefreshTable())

        Toast({ type: 'success', description: '删除成功！' })
      })
    } else {
      Toast({ type: 'warning', description: '没有找到对应的id！' })
    }
  }, [deleteId, Toast, dispatch])

  // 处理后的表头（过滤掉不相交的表头属性数据）
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [columns, visibleColumns])

  // 处理后的表格行数据
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return tagInfos.slice(start, end)
  }, [page, rowsPerPage, tagInfos])

  // 表格行单元格的渲染设置方法
  const renderCell = React.useCallback(
    (datas: Omit<Datas, 'createTS' | 'updateTS'>, columnKey: React.Key) => {
      const cellValue = datas[columnKey as keyof Omit<Datas, 'createTS' | 'updateTS'>]

      switch (columnKey) {
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              {/* 编辑按钮 */}
              <KlButton
                isIconOnly={true}
                onPress={() => {
                  openEditTagModal()
                  // 存储编辑id
                  dispatch(setEditId(datas.id))
                }}
              >
                <IconSelf iconName="icon-[lucide--edit-2]" />
              </KlButton>
              {/* 删除按钮 */}
              <KlButton
                isIconOnly={true}
                onPress={() => {
                  setOpen(true)
                  setDeleteId(datas.id)
                }}
              >
                <IconSelf iconName="icon-[lucide--trash]" className="text-[#EF4444]" />
              </KlButton>
            </div>
          )
        case 'lightIcon':
          return (
            <div className="flex flex-col w-8">
              {cellValue ? <img src={cellValue} alt="" /> : 'N/A'}
            </div>
          )
        case 'darkIcon':
          return (
            <div className="flex flex-col w-8">
              <div className="flex flex-col w-8">
                {cellValue ? <img src={cellValue} alt="" /> : 'N/A'}
              </div>
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
    [openEditTagModal, dispatch]
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
            ? `已全选，总共 ${tagInfos.length} 项`
            : `已选择 ${selectedKeys.size} 项，总共 ${tagInfos.length} 项`}
        </span>
        <div className="flex gap-10 justify-end items-center min-w-100">
          <KlPagination page={page} total={pages} onChange={setPage} />
          <PerPage defaultSelectedKeys={'10'} onChange={onRowsPerPageChange} />
        </div>
      </div>
    )
  }, [tagInfos.length, selectedKeys, onRowsPerPageChange, page, pages])

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
        <KlTableBody
          emptyContent={<EmptyContent />}
          isLoading={isLoading as boolean}
          loadingContent={<IconLoading />}
          items={items}
        >
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
