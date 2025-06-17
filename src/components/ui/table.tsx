import { clm } from '@/utils'
import * as React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  TableProps
} from '@heroui/react'

// 表格组件
const KlTable = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      onRowAction = () => {},
      bottomContentPlacement = 'outside',
      selectionMode = 'multiple',
      ...props
    },
    ref
  ) => (
    <Table
      ref={ref}
      isHeaderSticky
      aria-label="Table"
      bottomContentPlacement={bottomContentPlacement}
      onRowAction={onRowAction}
      classNames={{
        base: ' h-[90%] mt-6',
        wrapper: 'h-[100%] bg-bgPrimary dark:bg-darkBgPrimary text-primary dark:text-darkprimary',
        table: 'bg-bgPrimary dark:bg-darkBgPrimary',
        th: 'bg-darkBgPrimary text-darkprimary dark:bg-bgPrimary dark:text-primary',
        td: clm(`
                before:opacity-0
                group-data-[disabled=true]/tr:text-secondary/30
                data-[selected=true]:before:bg-tableSelectColor
                dark:data-[selected=true]:before:bg-darkTableColor/50
                data-[selected=true]:text-primary
                dark:data-[selected=true]:text-darkprimary
                group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:bg-tableHoverColor
                group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:opacity-100
                dark:group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:bg-darkTableColor/30
              `)
      }}
      checkboxesProps={{
        classNames: {
          wrapper:
            'dark:group-data-[hover=true]:before:bg-transparent group-data-[hover=true]:before:bg-transparent dark:after:bg-bgPrimary dark:text-primary after:bg-darkBgPrimary text-bgPrimary'
        }
      }}
      selectionMode={selectionMode}
      {...props}
    >
      {children}
    </Table>
  )
)
KlTable.displayName = 'KlTable'

export {
  KlTable,
  TableHeader as KlTableHeader,
  TableBody as KlTableBody,
  TableColumn as KlTableColumn,
  TableRow as KlTableRow,
  TableCell as KlTableCell
}
