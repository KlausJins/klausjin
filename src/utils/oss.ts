'use server'

import aliOSS from '@/lib/oss'
// import path from 'path'

// 文件路径
// const getFilePath = (input: string) => {
//   return path.join(process.cwd(), 'public', input)
// }

// 上传文件
export const uploadFile = async (file: File) => {
  console.log(file)

  try {
    const OSSclient = await aliOSS()
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const filename = file.name

    console.log(filename, buffer)

    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await OSSclient.put(filename, buffer)
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
