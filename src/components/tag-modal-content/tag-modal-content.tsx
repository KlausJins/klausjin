'use client'

import { isSVGString, svgToDataURL } from '@/utils'
import KlButton from '../ui/button'
import KlField from '../ui/field'
import KlTextarea from '../ui/textarea'
import { useCallback, useState } from 'react'
import { Form } from '@heroui/react'
import { useToast } from '@/hooks'
import { createTag, hasRepeatTag } from '@/actions/backend/backend-tag'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export interface TagContentProps {
  closeModal: () => void
}

export const TagModalContent = ({ closeModal }: TagContentProps) => {
  const [lightIconStr, setLightIconStr] = useState('')
  const [darkIconStr, setDarkIconStr] = useState('')

  const Toast = useToast()

  const userStore = useSelector((state: RootState) => state.user)

  // 浅色标签转换数据格式方法
  const lightIconTurnToDataUrl = useCallback(() => {
    setLightIconStr(svgToDataURL(lightIconStr))
  }, [lightIconStr, setLightIconStr])

  // 深色标签转换数据格式方法
  const darkIconTurnToDataUrl = useCallback(() => {
    setDarkIconStr(svgToDataURL(darkIconStr))
  }, [darkIconStr, setDarkIconStr])

  // 提交表单信息
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const data = Object.fromEntries(new FormData(e.currentTarget))
      console.log('data: ', data)

      // 检查标签名是否重复
      const hasRepeat = await hasRepeatTag(data.tagName as string)

      if (hasRepeat) {
        return Toast({ description: '已存在相同的标签名，请修改后再提交！' })
      }

      // 如果图标为svg，则自动转为data url
      if (data.icon && isSVGString(data.icon as string)) {
        console.log('data.icon: ', data.icon)
        svgToDataURL(data.icon as string)
      }
      if (data.darkIcon && isSVGString(data.darkIcon as string)) {
        console.log('data.darkIcon: ', data.darkIcon)
        svgToDataURL(data.darkIcon as string)
      }

      // 创建标签
      await createTag({
        ...data,
        userId: userStore.id as string
      })

      // 关闭弹窗
      closeModal()

      Toast({ type: 'success', description: '标签创建成功' })
    },
    [userStore, closeModal]
  )

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="w-full mb-8 flex flex-col gap-8">
          <KlField
            label="名称"
            name="tagName"
            labelPlacement="outside"
            placeholder="请输入名称"
            isRequired
            errorMessage="标签名称必填！"
          />

          <div className="w-full">
            <KlTextarea
              type="textarea"
              label="浅色标签"
              name="icon"
              labelPlacement="outside"
              placeholder="请输入一个svg字符串（会自动转换为data url）或者data url或者一个
          图片地址"
              value={lightIconStr}
              validate={(value) => {
                if (value.length < 3) {
                  return 'Username must be at least 3 characters long'
                }

                return value === 'admin' ? 'Nice try!' : null
              }}
              onChange={(e) => setLightIconStr(e.target.value)}
              onClear={() => setLightIconStr('')}
            />
            <KlButton
              fill={true}
              className="mt-2 font-normal"
              onPress={() => lightIconTurnToDataUrl()}
            >
              转为Data Url
            </KlButton>
          </div>

          <div className="w-full">
            <KlTextarea
              type="textarea"
              label="深色标签"
              name="darkIcon"
              labelPlacement="outside"
              placeholder="请输入一个svg字符串（会自动转换为data url）或者data url或者一个
          图片地址"
              value={darkIconStr}
              validate={(value) => {
                if (value.length < 3) {
                  return 'Username must be at least 3 characters long'
                }

                return value === 'admin' ? 'Nice try!' : null
              }}
              onChange={(e) => setDarkIconStr(e.target.value)}
              onClear={() => setDarkIconStr('')}
            />
            <KlButton
              fill={true}
              className="mt-2 font-normal"
              onPress={() => darkIconTurnToDataUrl()}
            >
              转为Data Url
            </KlButton>
          </div>
        </div>
        <div className="w-full bg-bgPrimary dark:bg-darkBgPrimary absolute bottom-0 left-0 pt-2 pb-4 px-6 flex justify-end">
          <KlButton fill={true} type="submit">
            创建标签
          </KlButton>
        </div>
      </Form>
    </>
  )
}
