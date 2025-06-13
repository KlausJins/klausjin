import { clm } from '@/utils'
import * as React from 'react'

// 表格组件
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={clm(
          'w-full caption-bottom text-sm text-primary dark:text-darkprimary',
          className
        )}
        {...props}
      />
    </div>
  )
)
Table.displayName = 'Table'

// 表格头部
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={clm('[&_tr]:border-b text-borderColor dark:text-darkBorderColor', className)}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

// 表格内容
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={clm('[&_tr:last-child]:border-0 ', className)} {...props} />
))
TableBody.displayName = 'TableBody'

// 表格底部
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={clm(
      'border-t bg-lighterBgPrimary dark:bg-darkerBgPrimary font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

// 表格行
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={clm(
        'border-b border-borderColor dark:border-darkBorderColor transition-colors hover:bg-hoverColor/30 dark:hover:bg-darkHoverColor/30 data-[state=selected]:bg-hoverColor/60 dark:data-[state=selected]:bg-darkHoverColor/60',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

// 表格头部单元格
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={clm(
      'h-12 px-4 text-left align-middle font-medium text-secondary dark:text-darksecondary [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

// 表格内容单元格
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={clm('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

// 表格标题
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={clm('mt-4 text-sm text-primary dark:text-darkprimary', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
