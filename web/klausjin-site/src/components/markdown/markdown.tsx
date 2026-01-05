'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import { Editor, EditorProps, Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import { common } from 'lowlight'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm_zhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import { codeCopyPlugin, headingsPlugins, prettyLinkPlugin } from './plugins'
import { clm } from '@/utils'

// highlight需要额外扩充的高亮语言
import asciidoc from 'highlight.js/lib/languages/asciidoc'
import dart from 'highlight.js/lib/languages/dart'
import nginx from 'highlight.js/lib/languages/nginx'

const plugins = [
  gfm({ locale: gfm_zhHans }),
  highlight({
    languages: {
      ...common,

      // 默认common配置中没有以下几个语言高亮配置，这里我们自己加上
      dart: dart, // flutter代码会用到dart
      nginx: nginx, // nginx配置文件高亮
      asciidoc: asciidoc // asciidoc高亮, 控制台输出信息高亮
    }
  }),
  breaks(),
  frontmatter(),
  gemoji(),
  headingsPlugins(),
  codeCopyPlugin(),
  prettyLinkPlugin()
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
