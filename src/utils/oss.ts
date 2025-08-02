'use server'

import aliOSS from '@/lib/oss'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'

// 压缩图片质量，并将图片转换为webp格式
const compressAndConvertImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer()

  return webpBuffer
}

// 上传文件
export const uploadFile = async (file: File) => {
  try {
    // 重命名文件，使图片文件为唯一
    const newFile = new File([file], `${uuidv4()}-${file.name}`, {
      type: file.type,
      lastModified: file.lastModified
    })

    // 压缩图片质量，并将图片转换为webp格式
    const buffer = await compressAndConvertImage(newFile)
    // 直接修改图片名称的后缀为webp
    const filename = newFile.name.replace(/\.[^/.]+$/, '.webp')

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

// 清洗临时签名 URL 为原始 OSS 地址（用于数据库保存）
export const stripOssSignedUrls = async (markdownContent: string): Promise<string> => {
  // 匹配所有 OSS 签名地址，并移除查询参数
  return markdownContent.replace(
    /(https:\/\/[\w\-\.]+\.oss-[\w\-]+\.aliyuncs\.com\/[^\s)]+\?[^)\s]+)/g,
    (fullUrl) => {
      const [baseUrl] = fullUrl.split('?') // 去掉 ? 后的部分
      return baseUrl
    }
  )
}

// 替换 Markdown 中的 OSS 图片链接为临时签名链接
export const replaceMarkdownOssImages = async (
  markdownContent: string,
  signexpires?: number
): Promise<string> => {
  // 匹配 Markdown 图片语法中的 URL，例如 ![](https://xxx)
  const imageRegex = /!\[([^\]]*)\]\((https:\/\/[\w\-\.]+\.oss-[\w\-]+\.aliyuncs\.com\/[^\s)]+)\)/g

  const matches = [...markdownContent.matchAll(imageRegex)]

  // 存储旧地址到新签名地址的映射
  const replacementMap: Record<string, string> = {}

  for (const match of matches) {
    const originalUrl = match[2]
    try {
      // 提取 objectKey（去掉域名部分）
      const objectKey = originalUrl.replace(
        /^https:\/\/[\w\-\.]+\.oss-[\w\-]+\.aliyuncs\.com\//,
        ''
      )

      const signedUrl = await signatureUrl(objectKey, (signexpires = 1800)) // 有效期半小时
      replacementMap[originalUrl] = signedUrl
    } catch (err) {
      console.warn(`生成签名地址失败：${originalUrl}`, err)
    }
  }

  // 批量替换url地址
  let updatedMarkdown = markdownContent
  for (const [originalUrl, signedUrl] of Object.entries(replacementMap)) {
    updatedMarkdown = updatedMarkdown.replaceAll(originalUrl, signedUrl)
  }

  return updatedMarkdown
}
