import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

// 获取本地md文档
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const slug = url.pathname.split('/').pop()

  const filePath = path.join(process.cwd(), 'src/md', `${slug}.md`)
  const content = fs.readFileSync(filePath, 'utf-8')

  return NextResponse.json({ content })
}
