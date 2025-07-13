'use client'

import KlField from '@/components/ui/field'
import KlTextarea from '@/components/ui/textarea'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { KlSwitch } from '@/components/ui/switch'
import { MDEditor, MDEditorHandle } from '../markdown'
import { SelectX, SelectXHandle } from '@/components/ui/select-x'
import KlButton from '@/components/ui/button'
import IconSelf from '../icons/icon-self'
import { TagModalContent } from '../tag-modal-content'
import KlModal from '@/components/ui/modal'
import { KlUploader } from '@/components/ui/uploader'
import KlForm from '@/components/ui/form'
import { debounce } from 'lodash-es'
import { searchTags } from '@/actions/backend'
import { useToast } from '@/hooks'
import { clm } from '@/utils'

type NoteFormProps = {
  id: string
  title: string
  description: string
  cover: string
  isPublished: boolean
  tags: string[]
  content: string
}

export const NoteModalContent = () => {
  const Toast = useToast()
  // 创建标签模态框状态
  const [openCreateTag, setOpenCreateTag] = useState(false)
  // 标签下拉框数据
  const [tagsOptions, setTagsOptions] = useState<{ id: string; value: string }[]>([])
  const SelectXRef = useRef<SelectXHandle>(null)
  const MDEditorRef = useRef<MDEditorHandle>(null)
  // 标签栏是否报错
  const [isTagsErr, setIsTagErr] = useState(false)

  // 表单数据
  const [formData, setFormData] = useState<NoteFormProps>({
    id: '',
    title: '',
    description: '',
    cover: '',
    isPublished: false,
    tags: [],
    content: ''
  })

  // 提交表单信息
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // 获取表单数据
      // const data = Object.fromEntries(new FormData(e.currentTarget))
      // console.log('data: ', data)

      // 获取表单数据
      console.log('formData: ', formData)
      const submitDatas = { ...formData }

      if (formData.tags.length === 0) {
        setIsTagErr(true)
        const inst = document.getElementById('tagsInstance')
        if (inst) {
          inst.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return Toast({ type: 'warning', description: '请选择标签！' })
      }

      // 获取表单的已选择标签数据
      if (SelectXRef.current) {
        console.log(SelectXRef.current.selectedIds)
        submitDatas.tags = SelectXRef.current.selectedIds
      }

      // 获取表单的文档内容
      if (MDEditorRef.current) {
        console.log(MDEditorRef.current.MDValue)
        submitDatas.content = MDEditorRef.current.MDValue
      }

      if (!submitDatas.content) {
        const inst = document.getElementById('contentInstance')
        if (inst) {
          inst.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return Toast({ type: 'warning', description: '请选择输入笔记内容！' })
      }

      console.log('submitDatas: ', submitDatas)
    },
    [formData, SelectXRef.current, Toast, setIsTagErr, MDEditorRef.current]
  )

  // 搜索标签
  const getTagsList = useMemo(() => {
    return debounce((name) => {
      searchTags({ name }).then((res) => {
        console.log('notePage searchTags res: ', res)
        // 处理返回来的标签数据
        const temp_info = res.map((item) => {
          return {
            id: item.id,
            value: item.name
          }
        })

        // 设置标签数据
        setTagsOptions(temp_info)
      })
    }, 500)
  }, [setTagsOptions])

  // 首次进入页面加载所有标签
  useEffect(() => {
    getTagsList('')
  }, [getTagsList])

  // 表单数据变化
  const formDataOnChange = useCallback(
    (
      type: 'title' | 'description' | 'cover' | 'isPublished' | 'tags' | 'content',
      value: string | boolean | string[]
    ) => {
      // 如果是标签，则判断是否为空
      if (type === 'tags' && (value as string[]).length > 0) {
        setIsTagErr(false)
      }

      console.log(type, value)
      setFormData({
        ...formData,
        [type]: value
      })
    },
    [formData, setFormData, setIsTagErr]
  )

  // 表单数据清空
  const formDataOnClear = useCallback(
    (
      type: 'title' | 'description' | 'cover' | 'isPublished' | 'tags' | 'content',
      value: string | boolean | string[]
    ) => {
      console.log(type, value)
      setFormData({
        ...formData,
        [type]: value
      })
    },
    [formData, setFormData]
  )

  return (
    <>
      <KlForm onSubmit={onSubmit}>
        <div className="w-full mb-8 flex flex-col gap-8">
          <KlField
            label="标题"
            name="title"
            value={formData.title}
            labelPlacement="outside"
            placeholder="请输入标题"
            isRequired
            errorMessage="标题必填！"
            onChange={(e) => formDataOnChange('title', e.target.value)}
            onClear={() => formDataOnClear('title', '')}
          />

          <KlTextarea
            type="textarea"
            label="描述"
            name="description"
            labelPlacement="outside"
            placeholder="请输入描述"
            value={formData.description}
            isRequired
            errorMessage="描述必填！"
            onChange={(e) => formDataOnChange('description', e.target.value)}
            onClear={() => formDataOnClear('description', '')}
          />

          {/* <KlField label="作者" labelPlacement="outside" placeholder="请输入作者" isRequired errorMessage="作者必填！" /> */}

          <div className="flex flex-col gap-2">
            <KlTextarea
              type="textarea"
              label="封面"
              name="cover"
              labelPlacement="outside"
              placeholder="请输入封面链接"
              value={formData.cover}
              onChange={(e) => formDataOnChange('cover', e.target.value)}
              onClear={() => formDataOnClear('cover', '')}
            />
            <KlUploader />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">是否发布</span>
            <KlSwitch
              name="isPublished"
              isSelected={formData.isPublished}
              // value={formData.isPublished + ''}
              onValueChange={(isSelected) => formDataOnChange('isPublished', isSelected)}
            ></KlSwitch>
          </div>

          <div className="flex flex-col gap-2" id="tagsInstance">
            <span className="text-sm font-medium after:content-['*'] after:text-[#F31260] after:ml-0.5">
              标签
            </span>
            <div className="flex gap-2 items-center">
              {/* 下拉框 */}
              <SelectX
                ref={SelectXRef}
                width="w-[80%]"
                placement="bottom-start"
                options={tagsOptions}
                value={formData.tags}
                onChange={(value) => formDataOnChange('tags', value)}
                placeholder="请选择标签"
                className={clm(isTagsErr ? 'border-[#F31260]' : '')}
              />

              {/* 创建标签按钮 */}
              <KlButton fill={true} onPress={() => setOpenCreateTag(true)}>
                <div className="flex items-center gap-2">
                  <IconSelf iconName="icon-[lucide--plus]" />
                  <span>创建标签</span>
                </div>
              </KlButton>
            </div>
            {/* 报错必填提示 */}
            {isTagsErr && (
              <div className="text-[12px] text-[#F31260] ml-1 -mt-1 w-50">请选择至少一个标签！</div>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full" id="contentInstance">
            <span className="text-sm font-medium after:content-['*'] after:text-[#F31260] after:ml-0.5">
              内容
            </span>
            <MDEditor
              ref={MDEditorRef}
              value={formData.content}
              // 必须填写，否则内容不会变
              onChange={(value, setValue) => setValue(value)}
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
        content={
          <TagModalContent
            closeModal={() => {
              console.log('创建标签1')
              getTagsList('')
              setOpenCreateTag(false)
            }}
          />
        }
        isTitleCenter={true}
        size="2xl"
        showCancelButton={false}
        showConfirmButton={false}
        successCallback={() => console.log('创建标签2')}
      />
    </>
  )
}
