'use client'

import KlField from '../ui/field'
import KlTextarea from '../ui/textarea'
import { useState } from 'react'
import { KlSwitch } from '../ui/switch'
import { MDEditor } from '../markdown'

export const NoteModalContent = () => {
  const [lightIconStr, setLightIconStr] = useState('')
  const [darkIconStr, setDarkIconStr] = useState('')

  return (
    <div className="flex flex-col gap-8 !overflow-scroll">
      <KlField label="标题" labelPlacement="outside" placeholder="请输入标题" />

      <KlTextarea
        type="textarea"
        label="描述"
        labelPlacement="outside"
        placeholder="请输入描述"
        value={lightIconStr}
        onChange={(e) => setLightIconStr(e.target.value)}
        onClear={() => setLightIconStr('')}
      />

      <KlField label="作者" labelPlacement="outside" placeholder="请输入作者" />

      <KlTextarea
        type="textarea"
        label="封面"
        labelPlacement="outside"
        placeholder="请输入封面链接"
        value={darkIconStr}
        onChange={(e) => setDarkIconStr(e.target.value)}
        onClear={() => setDarkIconStr('')}
      />

      <div className="flex flex-col gap-2">
        <span className="text-sm">是否发布</span>
        <KlSwitch></KlSwitch>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-sm">内容</span>
        <MDEditor value="" onChange={(value, setValue) => console.log(value, setValue(value))} />
      </div>
    </div>
  )
}
