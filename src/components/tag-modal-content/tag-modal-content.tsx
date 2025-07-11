'use client'

import { isSVGString, svgToDataURL } from '@/utils'
import KlButton from '@/components/ui/button'
import KlField from '@/components/ui/field'
import KlTextarea from '@/components/ui/textarea'
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '@/hooks'
import { createTag, getTagDetail, hasRepeatTag, updateTag } from '@/actions/backend/backend-tag'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import KlForm from '@/components/ui/form'
import { useDispatch } from 'react-redux'
import { toggleIsRefreshTable } from '@/store/features/backend-tag-slice'

export interface TagContentProps {
  closeModal?: () => void
}

export const TagModalContent = ({ closeModal }: TagContentProps) => {
  const backendTagStore = useSelector((state: RootState) => state.backendTag)
  const dispatch = useDispatch<AppDispatch>()
  const [nameStr, setNameStr] = useState('')
  const [lightIconStr, setLightIconStr] = useState('')
  const [darkIconStr, setDarkIconStr] = useState('')

  const Toast = useToast()

  const userStore = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (backendTagStore.editId) {
      getTagDetail(backendTagStore.editId).then((res) => {
        console.log('getTagDetail res: ', res)
        setNameStr(res?.name || '')
        setLightIconStr(res?.icon || '')
        setDarkIconStr(res?.iconDark || '')
      })
    }
  }, [setNameStr, backendTagStore.editId])

  // 浅色标签转换数据格式方法
  const lightIconTurnToDataUrl = useCallback(() => {
    setLightIconStr(svgToDataURL(lightIconStr))
  }, [lightIconStr, setLightIconStr])

  // 深色标签转换数据格式方法
  const darkIconTurnToDataUrl = useCallback(() => {
    setDarkIconStr(svgToDataURL(darkIconStr))
  }, [darkIconStr, setDarkIconStr])

  // 校验标签格式
  const validateTagIcon = useCallback((value: string) => {
    if (value) {
      if (
        !isSVGString(value) &&
        !value.startsWith('data:image/svg+xml') &&
        !value.startsWith('http')
      ) {
        return '标签图标格式不对，必须为svg字符串或者data url或者一个图片地址'
      }
    }
  }, [])

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
        data.icon = svgToDataURL(data.icon as string)
      }
      if (data.darkIcon && isSVGString(data.darkIcon as string)) {
        data.darkIcon = svgToDataURL(data.darkIcon as string)
      }

      if (backendTagStore.editId) {
        // 更新标签
        await updateTag({
          ...data,
          tagId: backendTagStore.editId,
          userId: userStore.id as string
        })
      } else {
        // 创建标签
        await createTag({
          ...data,
          userId: userStore.id as string
        })
      }

      // 刷新标签表格数据
      dispatch(toggleIsRefreshTable())

      // 关闭弹窗
      if (closeModal) closeModal()

      Toast({ type: 'success', description: '标签创建成功' })
    },
    [userStore, closeModal, Toast, dispatch, backendTagStore.editId]
  )

  return (
    <>
      <KlForm onSubmit={onSubmit}>
        <div className="w-full mb-8 flex flex-col gap-8">
          <KlField
            label="名称"
            name="tagName"
            labelPlacement="outside"
            placeholder="请输入名称"
            isRequired
            errorMessage="标签名称必填！"
            value={nameStr}
            onChange={(e) => setNameStr(e.target.value)}
            onClear={() => setNameStr('')}
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
              validate={(value) => validateTagIcon(value)}
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
              validate={(value) => validateTagIcon(value)}
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
            提交
          </KlButton>
        </div>
      </KlForm>
    </>
  )
}
