'use client'

import * as React from 'react'
import Button from '@/components/ui/button'
import Field from '@/components/ui/field'
import IconSelf from '@/components/icons/icon-self'

interface FilterPropsType {
  placeholder?: string
}

export const Filter = ({ placeholder = '请输入名称' }: FilterPropsType) => {
  return (
    <div className="flex items-center gap-6">
      {/* 名称 */}
      <Field className="w-80" placeholder={placeholder} />

      <div className="flex gap-6">
        {/* 搜索按钮 */}
        <Button filled="true">
          <div className="flex items-center gap-2">
            <IconSelf iconName="icon-[lucide--search]" />
            <span>搜索</span>
          </div>
        </Button>
        {/* 重置按钮 */}
        <Button filled="true">
          <div className="flex items-center gap-2">
            <IconSelf iconName="icon-[lucide--rotate-cw]" />
            <span>重置</span>
          </div>
        </Button>
        {/* 创建标签按钮 */}
        <Button filled="true">
          <div className="flex items-center gap-2">
            <IconSelf iconName="icon-[lucide--plus]" />
            <span>创建标签</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
