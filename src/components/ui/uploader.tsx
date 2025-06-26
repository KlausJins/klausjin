'use client'

import React, { useRef, useState } from 'react'
import KlButton from './button'
import IconSelf from '../icons/icon-self'

interface KlUploaderProps {
  onChange?: (file: File | null) => void
  accept?: string
  multiple?: boolean
}

export const KlUploader = ({ onChange, accept = 'image/*', multiple = false }: KlUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])

  // 选择文件后处理方法
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? [])
    setFiles(selectedFiles)
    onChange?.(multiple ? null : selectedFiles[0])
  }

  // 点击上传按钮
  const handleClick = () => {
    inputRef.current?.click()
  }

  // 删除文件处理方法
  const handleClear = () => {
    setFiles([])
    if (inputRef.current) inputRef.current.value = ''
    onChange?.(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        <KlButton onPress={handleClick} fill={true} className="gap-2 font-normal">
          <IconSelf iconName="icon-[lucide--upload]" />
          上传文件
        </KlButton>

        <div className="flex flex-col gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-borderColor dark:border-darkBorderColor px-2 pl-6 h-9 -ml-6 text-sm"
            >
              <span className="truncate max-w-[500px] mr-2 ">{file.name}</span>
              <div
                className="w-6 h-6 flex items-center justify-center hover:cursor-pointer hover:bg-hoverColor dark:hover:bg-darkHoverColor rounded-md"
                onClick={handleClear}
              >
                <IconSelf iconName="icon-[lucide--trash]" className="text-[#EF4444]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
