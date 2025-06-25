'use client'

import React, { useMemo, useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
  ScrollShadow
} from '@heroui/react'
import IconSelf from '../icons/icon-self'
import { clm } from '@/utils'
import { KlChip } from './chip'
import KlField from './field'
import { IconEmpty } from '../icons'

type Option = {
  id: string
  value: string
}

type SelectXProps = {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  width?: string
  className?: string
}

export const SelectX = ({
  options,
  value,
  onChange,
  placeholder = '请选择',
  className = '',
  width = ''
}: SelectXProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => opt.value.toLowerCase().includes(search.toLowerCase()))
  }, [search, options])

  const toggleValue = (val: string) => {
    console.log('toggleValue', val)
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <Popover
      isOpen={open}
      onOpenChange={setOpen}
      placement="bottom"
      offset={10}
      showArrow
      triggerScaleOnOpen={false}
    >
      <PopoverTrigger>
        <div
          className={clm(
            'min-w-40 w-80 min-h-10 px-3 py-2 z-0 rounded-xl flex items-center flex-wrap gap-1 cursor-pointer text-left border-1 shadow-none',
            'bg-bgPrimary dark:bg-darkBgPrimary border-borderColor dark:border-darkBorderColor text-primary dark:text-darkprimary',
            width,
            className
          )}
        >
          {value.length === 0 ? (
            <div className="w-full flex items-center justify-between">
              <span className="text-sm text-secondary dark:text-darksecondary">{placeholder}</span>
              <IconSelf
                iconName="icon-[lucide--chevron-down]"
                className="text-secondary dark:text-darksecondary"
              />
            </div>
          ) : (
            <div className="w-full flex items-center gap-1">
              {/* 已选择的内容 */}
              <div className="w-full flex items-center flex-wrap gap-1">
                {value.map((v) => {
                  const opt = options.find((o) => o.value === v)
                  return <KlChip key={v}>{opt?.value || v}</KlChip>
                })}
              </div>
              {/* 删除按钮 */}
              <div
                className={clm(
                  'ml-auto border-0 rounded-full flex justify-center items-center w-4 h-4',
                  'bg-[#5E5E60] hover:bg-darkBgPrimary dark:bg-[#B7B7B7] dark:hover:bg-bgPrimary'
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  clearAll()
                }}
              >
                <IconSelf
                  iconName="icon-[lucide--x]"
                  className="size-3 text-bgPrimary dark:text-darkBgPrimary"
                />
              </div>
            </div>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className={clm(
          'min-w-40 w-80 p-0 z-20 rounded-xl flex items-center flex-wrap gap-1 border-1 ',
          'bg-bgPrimary dark:bg-darkBgPrimary border-borderColor dark:border-darkBorderColor',
          width
        )}
      >
        <div className="w-full p-2 border-b-1 flex items-center border-borderColor dark:border-darkBorderColor">
          <IconSelf iconName="icon-[lucide--search]" />
          <KlField
            placeholder="请输入要搜索的内容"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            size="sm"
            className="placeholder:text-secondary dark:placeholder:text-darksecondary"
            inputWrapper_className="border-0"
          />
        </div>
        <ScrollShadow className="max-h-60 w-full">
          <Listbox
            aria-label="Listbox"
            selectionMode="multiple"
            selectedKeys={value}
            disallowEmptySelection
            className="w-full px-2 pb-1"
            emptyContent={
              <div className="flex flex-col items-center justify-center">
                <IconEmpty className="w-50 h-50 opacity-50" />
              </div>
            }
          >
            {filteredOptions.map((opt) => {
              return (
                <ListboxItem
                  key={opt.value}
                  textValue={opt.value}
                  onClick={() => toggleValue(opt.value)}
                  className={clm(
                    'flex justify-between items-center mb-1',
                    'data-[hover=true]:bg-hoverColor dark:data-[hover=true]:bg-darkHoverColor',
                    'data-[selected=true]:bg-activeColor dark:data-[selected=true]:bg-darkActiveColor',
                    'data-[focus=true]:!bg-activeColor dark:data-[focus=true]:!bg-darkActiveColor'
                  )}
                >
                  <span>{opt.value}</span>
                </ListboxItem>
              )
            })}
          </Listbox>
        </ScrollShadow>
      </PopoverContent>
    </Popover>
  )
}
