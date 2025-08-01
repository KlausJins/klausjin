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
import { createNote, getNoteDetail, isAdmin, searchTags, updateNote } from '@/actions/backend'
import { useToast } from '@/hooks'
import { clm } from '@/utils'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { toggleIsRefreshTable } from '@/store/features/backend-note-slice'
import { replaceMarkdownOssImages, signatureUrl, stripOssSignedUrls, uploadFile } from '@/utils/oss'
import { EditorProps } from '@bytemd/react'

type NoteFormProps = {
  id: string
  title: string
  description: string
  cover: string
  isPublished: boolean
  tags: string[]
  content: string
}

export interface NoteModalContentProps {
  closeModal?: () => void
}

export const NoteModalContent = ({ closeModal }: NoteModalContentProps) => {
  const Toast = useToast()
  const backendNoteStore = useSelector((state: RootState) => state.backendNote)
  const dispatch = useDispatch<AppDispatch>()
  // 创建标签模态框状态
  const [openCreateTag, setOpenCreateTag] = useState(false)
  // 标签下拉框数据
  const [tagsOptions, setTagsOptions] = useState<{ id: string; value: string }[]>([])
  const SelectXRef = useRef<SelectXHandle>(null)
  const MDEditorRef = useRef<MDEditorHandle>(null)
  // 标签栏是否报错
  const [isTagsErr, setIsTagErr] = useState(false)
  // 提交按钮的加载状态
  const [isSubmiting, setIsSubmiting] = useState(false)

  const userStore = useSelector((state: RootState) => state.user)

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
          inst.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
        return
      }
      // 获取表单的已选择标签数据
      if (SelectXRef.current) {
        console.log(SelectXRef.current.selectedIds)
        submitDatas.tags = SelectXRef.current.selectedIds
      }

      // 获取表单的文档内容
      if (MDEditorRef.current) {
        console.log(MDEditorRef.current.MDValue)
        // 处理掉oss url的临时签名
        submitDatas.content = await stripOssSignedUrls(MDEditorRef.current.MDValue)
      }

      if (!submitDatas.content) {
        const inst = document.getElementById('contentInstance')
        if (inst) {
          inst.scrollIntoView({ behavior: 'auto', block: 'start' })
        }

        return Toast({ type: 'warning', description: '请选择输入笔记内容！' })
      }

      setIsSubmiting(true)

      const isAdminPermission = await isAdmin()
      console.log('isAdminPermission: ', isAdminPermission)

      if (!isAdminPermission) {
        setIsSubmiting(false)
        return Toast({ description: '无操作权限！' })
      }

      console.log('提交数据： ', submitDatas)

      if (backendNoteStore.editId) {
        // 更新笔记
        await updateNote({
          ...submitDatas,
          userName: userStore.name as string,
          userId: userStore.id as string
        })
      } else {
        // 创建笔记
        await createNote({
          ...submitDatas,
          userName: userStore.name as string,
          userId: userStore.id as string
        })
      }

      // 接触提交按钮加载状态
      setIsSubmiting(false)

      // 刷新标签表格数据
      dispatch(toggleIsRefreshTable())

      // 关闭弹窗
      if (closeModal) closeModal()

      Toast({ type: 'success', description: '提交成功！' })
    },
    [
      formData,
      Toast,
      setIsTagErr,
      userStore.name,
      userStore.id,
      closeModal,
      dispatch,
      backendNoteStore.editId
    ]
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

  useEffect(() => {
    if (backendNoteStore.editId) {
      getNoteDetail(backendNoteStore.editId).then(async (res) => {
        console.log('getNoteDetail res: ', res)

        setFormData({
          id: res?.id as string,
          title: res?.title as string,
          description: res?.description as string,
          cover: res?.cover as string,
          isPublished: res?.published as boolean,
          tags: res?.tags.map((item) => item.name) as string[],
          content: res?.content as string
        })

        // 设置表单的文档内容
        if (MDEditorRef.current) {
          const MDcontent = await replaceMarkdownOssImages(res?.content as string)
          MDEditorRef.current.setMDValue(MDcontent)
        }
      })
    }
  }, [backendNoteStore.editId, setFormData])

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

  // 处理上传图片的逻辑
  const uploaderHandler = async (file: File | null) => {
    if (file) {
      console.log('uploaderHandler: ', file)

      const isAdminPermission = await isAdmin()
      console.log('isAdminPermission: ', isAdminPermission)

      if (!isAdminPermission) {
        setIsSubmiting(false)
        return Toast({ description: '无操作权限！' })
      }

      const uploadInfo = await uploadFile(file)
      console.log('uploadInfo: ', uploadInfo)

      if (uploadInfo) {
        if (uploadInfo.err != '') {
          return Toast({ description: uploadInfo.err })
        } else {
          setFormData({
            ...formData,
            cover: uploadInfo.url
          })
        }
      }
    }
  }

  // md编辑器图片内容改变
  const uploadImages: EditorProps['uploadImages'] = useCallback(
    async (files: File[]) => {
      console.log('uploadImages!!!', files)
      const file = files[0]
      if (file) {
        const isAdminPermission = await isAdmin()
        console.log('isAdminPermission: ', isAdminPermission)

        if (!isAdminPermission) {
          setIsSubmiting(false)
          Toast({ description: '无操作权限！' })
          return []
        }

        const uploadInfo = await uploadFile(file)
        console.log('uploadImages uploadInfo: ', uploadInfo)

        if (uploadInfo) {
          if (uploadInfo.err != '') {
            // 提示报错内容
            Toast({ description: uploadInfo.err })
            return []
          } else {
            return [{ url: await signatureUrl(uploadInfo.name) }]
          }
        }

        return []
      } else {
        return []
      }
    },
    [Toast]
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
            <KlUploader onChange={(file) => uploaderHandler(file)} />
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
              uploadImages={uploadImages}
              // 必须填写，否则内容不会变
              onChange={(value, setValue) => setValue(value)}
            />
          </div>
        </div>

        <div className="w-full bg-bgPrimary dark:bg-darkBgPrimary absolute bottom-0 left-0 pt-2 pb-4 px-6 flex justify-end">
          <KlButton fill={true} type="submit" isLoading={isSubmiting}>
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
              console.log('创建标签模态框关闭')
              getTagsList('')
              setOpenCreateTag(false)
            }}
          />
        }
        isTitleCenter={true}
        size="2xl"
        showCancelButton={false}
        showConfirmButton={false}
        successCallback={() => console.log('创建标签模态框关闭')}
      />
    </>
  )
}
