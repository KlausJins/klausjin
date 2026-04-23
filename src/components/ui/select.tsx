import { clm } from '@/utils'
import { Select, SelectItem, SelectItemProps, SelectProps } from '@heroui/react'
import React from 'react'

interface KlSelectItemProps extends SelectItemProps {
  selectDatas: {
    id: string
    children: React.ReactNode
  }[]
}

interface KlSelectProps {
  selectProps: Omit<SelectProps, 'children'>
  selectItemProps: KlSelectItemProps
}

export const KlSelect = ({
  selectProps,
  selectProps: { labelPlacement = 'outside-left', label, className },
  selectItemProps,
  selectItemProps: { selectDatas }
}: KlSelectProps) => {
  return (
    <Select
      {...selectProps}
      key={labelPlacement}
      className={clm('max-w-xs', className)}
      label={label}
      labelPlacement={labelPlacement}
    >
      {selectDatas.map((item) => (
        <SelectItem {...selectItemProps} key={item.id}>
          {item.children}
        </SelectItem>
      ))}
    </Select>
  )
}
