'use client'

import React, { forwardRef, useImperativeHandle } from 'react'
import { Listbox, ListboxItem, ScrollShadow } from '@heroui/react'
import { clm } from '@/utils'

type listDataItem = {
  id: string
  title: string
  description: string
}

type KlListProps = {
  childrenContent: (option: listDataItem) => React.ReactNode
  className?: string
  listData: listDataItem[]
  onItemClick?: (id: string) => void
  emptyContent: React.ReactNode
}

export interface KlListHandle {
  // 占位用，以便后续需要暴露参数使用
  className?: string
}

export const KlList = forwardRef<KlListHandle, KlListProps>(
  ({ childrenContent, listData, onItemClick, emptyContent }: KlListProps, ref) => {
    // 暴露给父组件的变量和方法
    useImperativeHandle(ref, () => ({}))

    return (
      <ScrollShadow className="max-h-[60vh] w-full">
        <Listbox
          aria-label="KlListbox"
          disallowEmptySelection
          className="w-full pb-1"
          emptyContent={
            <div className="flex flex-col items-center justify-center">{emptyContent}</div>
          }
        >
          {listData.map((opt) => (
            <ListboxItem
              key={opt.id}
              textValue={opt.id}
              onClick={() => onItemClick && onItemClick(opt.id)}
              className={clm(
                'flex justify-between items-center mb-1',
                'data-[hover=true]:bg-hoverColor dark:data-[hover=true]:bg-darkHoverColor',
                'data-[selected=true]:bg-activeColor dark:data-[selected=true]:bg-darkActiveColor',
                'data-[focus=true]:!bg-activeColor dark:data-[focus=true]:!bg-darkActiveColor'
              )}
            >
              {childrenContent(opt)}
            </ListboxItem>
          ))}
        </Listbox>
      </ScrollShadow>
    )
  }
)
KlList.displayName = 'KlList'
