import { BytemdPlugin } from 'bytemd'
import rehypeSlug from 'rehype-slug'

// 给标题加上id锚点
export const headingsPlugins = (): BytemdPlugin => {
  return {
    rehype: (processor) => {
      return processor.use(rehypeSlug)
    }
  }
}
