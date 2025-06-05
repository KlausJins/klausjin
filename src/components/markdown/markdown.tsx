'use client'

import { forwardRef, useState } from 'react'
import { Editor, Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm_zhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import { headingsPlugins } from './plugins'

const plugins = [
  gfm({ locale: gfm_zhHans }),
  highlight(),
  breaks(),
  frontmatter(),
  gemoji(),
  headingsPlugins()
]

interface MDEditorPropsType {
  onChange: (value: string) => void
}

export const MDEditor = forwardRef<HTMLDivElement, MDEditorPropsType>(({ onChange }, ref) => {
  const [value] = useState('')
  return (
    <div id="note-editor" ref={ref} className="flex flex-col h-full w-full items-center">
      <Editor value={value} plugins={plugins} locale={zh_Hans} onChange={(v) => onChange(v)} />
    </div>
  )
})
MDEditor.displayName = 'MDEditor'

interface MDViewerPropsType {
  value: string
}

export const MDViewer = forwardRef<HTMLDivElement, MDViewerPropsType>(
  ({ value }: { value: string }, ref) => {
    return (
      <div id="content-editor" ref={ref} className="mx-auto flex flex-col !max-w-detail-content">
        <Viewer value={value} plugins={plugins} />
      </div>
    )
  }
)
MDViewer.displayName = 'MDViewer'
