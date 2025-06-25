'use client'

import { isSVGString, svgToDataURL } from '@/utils'
import KlButton from '../ui/button'
import KlField from '../ui/field'
import KlTextarea from '../ui/textarea'
import { useCallback, useState } from 'react'

export const TagModalContent = () => {
  const [lightIconStr, setLightIconStr] = useState('')
  const [darkIconStr, setDarkIconStr] = useState('')

  // 浅色标签转换数据格式方法
  const lightIconTurnToDataUrl = useCallback(() => {
    if (isSVGString(lightIconStr)) {
      setLightIconStr(svgToDataURL(lightIconStr))
    }
  }, [lightIconStr, setLightIconStr])

  // 深色标签转换数据格式方法
  const darkIconTurnToDataUrl = useCallback(() => {
    if (isSVGString(darkIconStr)) {
      setDarkIconStr(svgToDataURL(darkIconStr))
    }
  }, [darkIconStr, setDarkIconStr])

  return (
    <div className="flex flex-col gap-8">
      <KlField label="名称" labelPlacement="outside" placeholder="请输入名称" />

      <div>
        <KlTextarea
          type="textarea"
          label="浅色标签"
          labelPlacement="outside"
          placeholder="请输入一个svg字符串（会自动转换为data url）或者data url或者一个
          图片地址"
          value={lightIconStr}
          onChange={(e) => setLightIconStr(e.target.value)}
          onClear={() => setLightIconStr('')}
        />
        <KlButton fill={true} className="mt-2 font-normal" onPress={() => lightIconTurnToDataUrl()}>
          转为Data Url
        </KlButton>
      </div>

      <div>
        <KlTextarea
          type="textarea"
          label="深色标签"
          labelPlacement="outside"
          placeholder="请输入一个svg字符串（会自动转换为data url）或者data url或者一个
          图片地址"
          value={darkIconStr}
          onChange={(e) => setDarkIconStr(e.target.value)}
          onClear={() => setDarkIconStr('')}
        />
        <KlButton fill={true} className="mt-2 font-normal" onPress={() => darkIconTurnToDataUrl()}>
          转为Data Url
        </KlButton>
      </div>
    </div>
  )
}
