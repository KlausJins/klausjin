'use server'

import aliOSS from '@/lib/oss'
import { v4 as uuidv4 } from 'uuid'
// import path from 'path'

// 文件路径
const fileToBuffer = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return buffer
}

// 上传文件
export const uploadFile = async (file: File) => {
  console.log(file)

  try {
    // 重命名文件，使图片文件为唯一
    const newFile = new File([file], `${uuidv4()}-${file.name}`, {
      type: file.type,
      lastModified: file.lastModified
    })

    const buffer = await fileToBuffer(newFile)
    const filename = newFile.name

    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await aliOSS.put(filename, buffer, {
      headers: {
        // 指定上传文件操作时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。如果同名Object已存在，程序将报错
        'x-oss-forbid-overwrite': true
      }
    })
    console.log('result: ', result)
    return {
      name: result.name,
      url: result.url,
      status: result.res.status,
      err: ''
    }
  } catch (err) {
    let errMsg = ''
    if ((err as { name: string }).name.indexOf('FileAlreadyExistsError') > -1) {
      errMsg = '存在重复的文件名，不可提交'
    }

    return {
      name: '',
      url: '',
      status: 500,
      err: errMsg
    }
  }
}

// 删除文件
export const deleteFiles = async (files: File[]) => {
  try {
    // 需要删除的文件名数组
    const filesName = files.map((file) => file.name)

    // 填写需要删除的多个Object完整路径并设置返回模式为简单模式。Object完整路径中不能包含Bucket名称。
    const result = await aliOSS.deleteMulti(filesName, { quiet: true })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

// 生成临时签名URL
export const signatureUrl = async (objectKey: string, expires: number = 1800): Promise<string> => {
  try {
    const url = aliOSS.signatureUrl(objectKey, {
      expires,
      method: 'GET'
    })

    return url
  } catch (err) {
    console.error('生成签名URL失败:', err)
    throw err
  }
}
