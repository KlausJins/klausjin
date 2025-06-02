'use client'

import { useEffect, useState } from 'react'
import { Editor, Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import gfm_zhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import zh_Hans from 'bytemd/locales/zh_Hans.json'

const plugins = [
  gfm({ locale: gfm_zhHans }),
  highlight(),
  breaks(),
  frontmatter(),
  gemoji(),
  mediumZoom()
]

export const MDEditor = () => {
  const [value, setValue] = useState('')
  return (
    <div id="note-editor" className="flex flex-col h-full w-full items-center">
      <Editor
        value={value}
        plugins={plugins}
        locale={zh_Hans}
        onChange={(v) => {
          console.log(v)
          setValue(v)
        }}
      />
    </div>
  )
}

export const MDViewer = () => {
  const [MDContent, setMDContent] = useState('')

  useEffect(() => {
    fetch('/api/md/test').then((res) =>
      res.json().then((res) => {
        setMDContent(res.content)
      })
    )
  })

  return (
    <div id="content-editor" className="mx-auto flex !max-w-detail-content flex-col">
      <Viewer value={MDContent} plugins={plugins} />
    </div>
  )
}
