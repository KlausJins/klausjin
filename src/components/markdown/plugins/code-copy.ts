/* eslint-disable */
// @ts-nocheck
import type { BytemdPlugin } from 'bytemd'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { visit } from 'unist-util-visit'
import { copyToClipboard, isBrowser } from '@/utils'

const copyBtnNode = fromHtmlIsomorphic(`
<div class="w-full flex justify-end h-6 items-center">
  <div class="copy-code-button hover:cursor-pointer flex justify-end items-center text-primary dark:text-darkprimary">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
  </div>
</div>
`)

const languageNode = (language) => {
  return fromHtmlIsomorphic(
    `<div class="code-lang-label absolute flex justify-start h-6 items-center text-primary dark:text-darkprimary">${language}</div>`
  )
}

const clipboardCheckIcon = `
<div class="w-full flex justify-end h-6 items-center">
  <div class="copy-code-button hover:cursor-pointer flex justify-end gap-2 items-center text-primary dark:text-darkprimary">
    <span style="font-size: 0.8em;">复制成功</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  </div>
</div>
`

export const codeCopyPlugin = (): BytemdPlugin => {
  return {
    rehype: (process) =>
      process.use(() => (tree) => {
        visit(tree, 'element', (node) => {
          if (node.tagName === 'pre') {
            node.children.unshift(copyBtnNode)

            const codeNode = node.children.find((child) => child.tagName === 'code')
            const language = codeNode?.properties?.className
              ?.find((c) => c.startsWith('language-'))
              ?.replace('language-', '')

            if (language) {
              // 添加语言标签
              node.children.unshift(languageNode(language))
            }
          }

          visit(tree, 'element', (code, idx, parent) => {
            if (code.tagName === 'code') {
              const language = code.properties?.className
                ?.filter((cs) => cs.startsWith('language'))[0]
                ?.split('-')[1]
                ?.split(':')[0]

              if (language && !parent.properties['data-language']) {
                parent.properties['data-language'] = language
              }
            }
          })
        })
      }),

    viewerEffect({ markdownBody }) {
      // 针对 SSR 场景适配
      if (!isBrowser()) {
        return
      }

      /**
       * MD 内容异步插，会导致事件监听没有注册成功
       * 使用 MutationObserver 会在 DOM 发生变化时被调用，以确保事件监听成功
       *  */
      const observer = new MutationObserver(() => {
        const elements = markdownBody.querySelectorAll('.copy-code-button')
        if (!elements.length) return

        elements.forEach((element) => {
          // 避免重复绑定
          if ((element as any)._copyBound) {
            return
          }

          ;(element as any)._copyBound = true

          // 点击按钮复制代码到粘贴板
          element.addEventListener('click', () => {
            const pre = element.closest('pre')
            const code = pre?.querySelector('code')
            let codeText = code?.textContent?.trim() || ''

            // 复制代码时去除开头的$符号，然后trim一下，一般是复制shell命令的代码块会用到
            if (codeText.startsWith('$')) {
              codeText = codeText.slice(1).trim()
            }

            copyToClipboard(codeText)

            const tmp = element.innerHTML
            element.innerHTML = clipboardCheckIcon
            let timer = window.setTimeout(() => {
              element.innerHTML = tmp
              clearTimeout(timer)
            }, 3000)
          })
        })
      })

      observer.observe(markdownBody, { childList: true, subtree: true })
    }
  }
}
