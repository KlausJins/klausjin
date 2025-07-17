'use client'

import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
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
import { KlChip } from '@/components/ui/chip'
import { PerPage } from '@/components/ui/per-page'
import KlModal from '@/components/ui/modal'
import { useToast } from '@/hooks'
import { KlSwitch } from '@/components/ui/switch'
import { EmptyContent } from '@/components/icons/empty-content'
import IconLoading from '@/components/icons/icon-loading'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { setEditId } from '@/store/features/backend-note-slice'
import { useSelector } from 'react-redux'
import {
  changeNotePublishStatus,
  deleteNotes,
  isAdmin,
  searchNotes,
  searchNotesParams
} from '@/actions/backend'
import Link from 'next/link'

const enum TIME_ASC_DESC {
  CREATEASC = 'CREATEASC',
  CREATEDESC = 'CREATEDESC',
  UPDATEASC = 'UPDATEASC',
  UPDATEDESC = 'UPDATEDESC'
}

export type TIME_SORT_TYPE = 'CREATEASC' | 'CREATEDESC' | 'UPDATEASC' | 'UPDATEDESC'

const INITIAL_VISIBLE_COLUMNS = [
  'title',
  'author',
  'tags',
  'publishStatus',
  'createTime',
  'updateTime',
  'actions'
]

export type Datas = {
  id: string
  title: string
  author: string
  tags: string[]
  publishStatus: boolean
  createTS: number
  createTime: string
  updateTS: number
  updateTime: string
}

export interface NoteTableHandle {
  selectedKeys: 'all' | Iterable<React.Key> | undefined
  allRowKeys: string[]
  loadNoteTable: (payload: searchNotesParams) => void
  setNoteInfos: React.Dispatch<React.SetStateAction<Datas[]>>
  timeAscDesc: TIME_SORT_TYPE
}

export interface NoteTableProps {
  openEditNoteModal: () => void
}

export const NoteTable = forwardRef<NoteTableHandle, NoteTableProps>(
  ({ openEditNoteModal }, ref) => {
    const Toast = useToast()
    const backendNoteStore = useSelector((state: RootState) => state.backendNote)
    const dispatch = useDispatch<AppDispatch>()
    // 表格数据
    const [noteInfos, setNoteInfos] = useState<Datas[]>([])
    // 是否正在加载表格数据
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // 表格行选择的keys
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
    // 实际显示的行表头属性值
    const [visibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
    // 表头时间的状态(永远保持最新状态，不受闭包的影响)
    const timeAscDescRef = useRef<TIME_SORT_TYPE>('CREATEDESC')
    // 表头时间的状态
    const [timeAscDesc, setTimeAscDesc] = useState<TIME_ASC_DESC>(TIME_ASC_DESC.CREATEDESC)
    // 获取当前点击actions时表格的key
    const [deleteId, setDeleteId] = useState<string | null>(null)
    // 提示框状态
    const [open, setOpen] = useState(false)
    // 表格每页的行数
    const [rowsPerPage, setRowsPerPage] = useState(10)
    // 表格当前页码
    const [page, setPage] = useState(1)
    // 表格总页数
    const pages = Math.ceil(noteInfos.length / rowsPerPage) || 1

    // 刷新页面（加载页面）
    const loadNoteTable = useCallback(
      (payload: searchNotesParams) => {
        setIsLoading(true)

        searchNotes({
          // 筛选条件放到store中，以便操作发布状态时刷新页面保留筛选条件内容
          ...backendNoteStore.filterValue,
          orderByType: timeAscDescRef.current,
          ...payload
        }).then((res) => {
          console.log('searchNotes res: ', res)
          const res_info = res.map((item) => {
            return {
              id: item.id,
              title: item.title,
              author: item.author,
              tags: item.tags.map((tagItem) => tagItem.name),
              publishStatus: item.published,
              createTS: getTimeValue(item.createdAt),
              createTime: formatChineseDateTime(item.createdAt),
              updateTS: getTimeValue(item.updatedAt),
              updateTime: formatChineseDateTime(item.updatedAt)
            }
          })

          setIsLoading(false)
          setNoteInfos(res_info)
        })
      },
      [setIsLoading, setNoteInfos, backendNoteStore.filterValue]
    )

    // 暴露给父组件的变量和方法
    useImperativeHandle(ref, () => ({
      selectedKeys,
      allRowKeys: noteInfos.map((row) => row.id),
      loadNoteTable,
      setNoteInfos,
      timeAscDesc
    }))

    // 处理表格删除事件
    const ModalHandler = useCallback(async () => {
      console.log('deleteId: ', deleteId)
      if (deleteId) {
        const isAdminPermission = await isAdmin()
        console.log('isAdminPermission: ', isAdminPermission)

        if (!isAdminPermission) {
          return Toast({ description: '无操作权限！' })
        }

        deleteNotes([deleteId]).then(() => {
          // 刷新页面
          // dispatch(toggleIsRefreshTable())
          loadNoteTable({})

          Toast({ type: 'success', description: '删除成功！' })
        })
      } else {
        Toast({ type: 'warning', description: '没有找到对应的id！' })
      }
    }, [deleteId, Toast, loadNoteTable])

    // 处理表格删除事件
    const publishNote = useCallback(
      async (e: ChangeEvent<HTMLInputElement>, id: string, timeType: TIME_SORT_TYPE) => {
        const checkedValue = e.target.checked

        console.log('timeType: ', timeType)

        // 切换笔记发布状态
        await changeNotePublishStatus(id, checkedValue)

        if (checkedValue) {
          Toast({ type: 'success', description: '笔记发布成功！' })
        } else {
          Toast({ type: 'success', description: '笔记取消发布！' })
        }

        // 刷新页面
        // dispatch(toggleIsRefreshTable())
        loadNoteTable({})
      },
      [Toast, loadNoteTable]
    )

    // 首次进来加载数据
    useEffect(() => {
      loadNoteTable({})
    }, [backendNoteStore.isRefreshTable])

    const timerHandler = useCallback(
      (type: 'create' | 'update') => {
        const temp_noteInfos = [...noteInfos]

        console.log('noteInfos: ', noteInfos, timeAscDesc)

        if (type === 'create') {
          // 创建时间变换
          if (timeAscDesc == 'CREATEDESC') {
            // 升序
            setTimeAscDesc(TIME_ASC_DESC.CREATEASC)
            timeAscDescRef.current = 'CREATEASC'

            setNoteInfos(temp_noteInfos.sort((a, b) => a.createTS - b.createTS))
          } else {
            // 降序
            setTimeAscDesc(TIME_ASC_DESC.CREATEDESC)
            timeAscDescRef.current = 'CREATEDESC'

            setNoteInfos(temp_noteInfos.sort((a, b) => b.createTS - a.createTS))
          }
        } else if (type === 'update') {
          // 更新时间变换
          if (timeAscDesc == 'UPDATEDESC') {
            // 升序
            setTimeAscDesc(TIME_ASC_DESC.UPDATEASC)
            timeAscDescRef.current = 'UPDATEASC'

            setNoteInfos(temp_noteInfos.sort((a, b) => a.updateTS - b.updateTS))
          } else {
            // 降序
            setTimeAscDesc(TIME_ASC_DESC.UPDATEDESC)
            timeAscDescRef.current = 'UPDATEDESC'

            setNoteInfos(temp_noteInfos.sort((a, b) => b.updateTS - a.updateTS))
          }
        }
      },
      [noteInfos, setNoteInfos, timeAscDesc, setTimeAscDesc]
    )

    // 每一列的样式格式设置
    const columns = useMemo(
      () => [
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
            <div className="flex items-center gap-1 text-[14px] font-semibold">
              <IconSelf iconName="icon-[lucide--tags]" />
              <div>标签</div>
            </div>
          )
        },
        {
          uid: 'publishStatus',
          children: (
            <div className="flex items-center gap-1 text-[14px] font-semibold">
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
              onPress={() => timerHandler('create')}
            >
              <IconSelf iconName="icon-[lucide--calendar]" />
              <div>创建时间</div>
              {timeAscDesc === TIME_ASC_DESC.CREATEASC && (
                <IconSelf iconName="icon-[lucide--sort-asc]" />
              )}
              {timeAscDesc === TIME_ASC_DESC.CREATEDESC && (
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
              {timeAscDesc === TIME_ASC_DESC.UPDATEASC && (
                <IconSelf iconName="icon-[lucide--sort-asc]" />
              )}
              {timeAscDesc === TIME_ASC_DESC.UPDATEDESC && (
                <IconSelf iconName="icon-[lucide--sort-desc]" />
              )}
            </KlButton>
          )
        },
        { children: '', uid: 'actions' }
      ],
      [timeAscDesc, timerHandler]
    )

    // 处理后的表头（过滤掉不相交的表头属性数据）
    const headerColumns = useMemo(() => {
      if (visibleColumns === 'all') return columns

      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
    }, [visibleColumns, columns])

    // 处理后的表格行数据
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage
      const end = start + rowsPerPage

      return noteInfos.slice(start, end)
    }, [page, noteInfos, rowsPerPage])

    // 表格行单元格的渲染设置方法
    const renderCell = useCallback(
      (datas: Omit<Datas, 'createTS' | 'updateTS'>, columnKey: React.Key) => {
        const cellValue = datas[columnKey as keyof Omit<Datas, 'createTS' | 'updateTS'>]

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
            return (
              <KlSwitch
                isSelected={cellValue as boolean}
                onChange={(e) => publishNote(e, datas.id, timeAscDesc)}
              ></KlSwitch>
            )
          case 'actions':
            return (
              <div className="relative flex justify-end items-center gap-2">
                {/* 查看笔记按钮 */}
                <Link href={`/note/${datas.id}`} target="_blank">
                  <KlButton isIconOnly={true}>
                    <IconSelf iconName="icon-[lucide--eye]" />
                  </KlButton>
                </Link>
                {/* 编辑按钮 */}
                <KlButton
                  isIconOnly={true}
                  onPress={() => {
                    openEditNoteModal()
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
          default:
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
              </div>
            )
        }
      },
      [publishNote, openEditNoteModal, dispatch, timeAscDesc]
    )

    // 分页器条数设置方法
    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    }, [])

    // 表格底部组件
    const tableBottomContent = useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-secondary dark:text-darksecondary">
            {selectedKeys === 'all'
              ? `已全选，总共 ${noteInfos.length} 项`
              : `已选择 ${selectedKeys.size} 项，总共 ${noteInfos.length} 项`}
          </span>
          <div className="flex gap-10 justify-end items-center min-w-100">
            <KlPagination page={page} total={pages} onChange={setPage} />
            <PerPage defaultSelectedKeys={'10'} onChange={onRowsPerPageChange} />
          </div>
        </div>
      )
    }, [noteInfos.length, selectedKeys, onRowsPerPageChange, page, pages])

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
  }
)

NoteTable.displayName = 'NoteTable'
