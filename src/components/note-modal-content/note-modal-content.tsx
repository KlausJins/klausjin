'use client'

import KlField from '../ui/field'
import KlTextarea from '../ui/textarea'
import { useCallback, useState } from 'react'
import { KlSwitch } from '../ui/switch'
import { MDEditor } from '../markdown'
import { SelectX } from '../ui/select-x'
import KlButton from '../ui/button'
import IconSelf from '../icons/icon-self'
import { TagModalContent } from '../tag-modal-content'
import KlModal from '../ui/modal'
import { KlUploader } from '../ui/uploader'
import KlForm from '@/components/ui/form'

const options = [
  { value: '苹果', id: 'apple' },
  { value: '香蕉', id: 'banana' },
  { value: '橙子', id: 'orange' },
  { value: '榴莲', id: 'durian' },
  { value: '西瓜', id: 'watermelon' }
]

export const NoteModalContent = () => {
  const [lightIconStr, setLightIconStr] = useState('')
  const [darkIconStr, setDarkIconStr] = useState('')
  const [selectedFruits, setSelectedFruits] = useState<string[]>([])
  // 创建标签模态框状态
  const [openCreateTag, setOpenCreateTag] = useState(false)

  // 提交表单信息
  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('data: ', data)
  }, [])

  return (
    <>
      <KlForm onSubmit={onSubmit}>
        <div className="w-full mb-8 flex flex-col gap-8">
          <KlField label="标题" labelPlacement="outside" placeholder="请输入标题" isRequired />

          <KlTextarea
            type="textarea"
            label="描述"
            labelPlacement="outside"
            placeholder="请输入描述"
            value={lightIconStr}
            isRequired
            onChange={(e) => setLightIconStr(e.target.value)}
            onClear={() => setLightIconStr('')}
          />

          <KlField label="作者" labelPlacement="outside" placeholder="请输入作者" isRequired />

          <div className="flex flex-col gap-2">
            <KlTextarea
              type="textarea"
              label="封面"
              labelPlacement="outside"
              placeholder="请输入封面链接"
              value={darkIconStr}
              onChange={(e) => setDarkIconStr(e.target.value)}
              onClear={() => setDarkIconStr('')}
            />
            <KlUploader />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">是否发布</span>
            <KlSwitch></KlSwitch>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">标签</span>
            <div className="flex gap-2 items-center">
              {/* 下拉框 */}
              <SelectX
                width="w-[80%]"
                placement="bottom-start"
                options={options}
                value={selectedFruits}
                onChange={setSelectedFruits}
                placeholder="请选择标签"
              />

              {/* 创建标签按钮 */}
              <KlButton fill={true} onPress={() => setOpenCreateTag(true)}>
                <div className="flex items-center gap-2">
                  <IconSelf iconName="icon-[lucide--plus]" />
                  <span>创建标签</span>
                </div>
              </KlButton>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm font-medium">内容</span>
            <MDEditor
              value=""
              onChange={(value, setValue) => console.log(value, setValue(value))}
            />
          </div>
        </div>

        <div className="w-full bg-bgPrimary dark:bg-darkBgPrimary absolute bottom-0 left-0 pt-2 pb-4 px-6 flex justify-end">
          <KlButton fill={true} type="submit">
            提交
          </KlButton>
        </div>
      </KlForm>

      {/* 创建标签模态框 */}
      <KlModal
        open={openCreateTag}
        setOpen={setOpenCreateTag}
        title="创建标签"
        content={<TagModalContent closeModal={() => setOpenCreateTag(false)} />}
        isTitleCenter={true}
        size="2xl"
        showCancelButton={false}
        showConfirmButton={false}
        successCallback={() => console.log('创建标签')}
      />
    </>
  )
}
