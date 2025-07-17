import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

// 获取本地md文档
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const slug = url.pathname.split('/').pop()

  if (slug == 'test') {
    const filePath = path.join(process.cwd(), 'src/md', `${slug}.md`)
    const content = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ content })
  } else {
    return NextResponse.json({
      content:
        '## 视频和图片的大小\n 一般上传文件，都会得到一个 `File` 对象，视频和图片的大小可以通过 `File` 对象的 `size` 属性得到（单位：字节），这里就不多介绍了。'
    })
  }
}
