'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import { Editor, EditorProps, Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm_zhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import { headingsPlugins } from './plugins'
import { clm } from '@/utils'

const plugins = [
  gfm({ locale: gfm_zhHans }),
  highlight(),
  breaks(),
  frontmatter(),
  gemoji(),
  headingsPlugins()
]

interface MDEditorPropsType {
  className?: string
  value: string
  onChange: (value: string, setMDValue: (value: string) => void) => void
  uploadImages?: EditorProps['uploadImages']
}

export type MDEditorHandle = {
  MDValue: string
  setMDValue: (value: string) => void
}

export const MDEditor = forwardRef<MDEditorHandle, MDEditorPropsType>(
  ({ className, value, onChange, uploadImages }, ref) => {
    const [MDValue, setMDValue] = useState(value)

    // 暴露给父组件的变量和方法
    useImperativeHandle(ref, () => ({
      MDValue,
      setMDValue
    }))

    return (
      <div
        id="note-editor"
        // ref={ref}
        className={clm('flex flex-col h-full w-full items-center', className)}
      >
        <Editor
          value={MDValue}
          plugins={plugins}
          locale={zh_Hans}
          uploadImages={uploadImages}
          onChange={(v) => onChange(v, setMDValue)}
        />
      </div>
    )
  }
)
MDEditor.displayName = 'MDEditor'

interface MDViewerPropsType {
  className?: string
  value: string
}

export const MDViewer = forwardRef<HTMLDivElement, MDViewerPropsType>(
  ({ value, className }: MDViewerPropsType, ref) => {
    return (
      <div
        id="content-editor"
        ref={ref}
        className={clm('mx-auto flex flex-col !max-w-detail-content', className)}
      >
        <Viewer value={value} plugins={plugins} />
      </div>
    )
  }
)
MDViewer.displayName = 'MDViewer'
