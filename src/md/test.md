## 更新记录

- 2024.11.7，增加 `URL.revokeObjectURL` 调用，释放通过 URL.createObjectURL() 创建的对象 URL，节约内存

## 前言

工作中遇到一个需求，在上传视频和图片前需要在前端读取视频和图片的一些信息：

- **视频：** 视频大小、视频分辨率、视频比例
- **图片：** 图片大小、图片分辨率

## 视频和图片的大小

一般上传文件，都会得到一个 `File` 对象，视频和图片的大小可以通过 `File` 对象的 `size` 属性得到（单位：字节），这里就不多介绍了。

## 视频和图片的分辨率

分辨率即视频和图片的宽 x 高，比如：宽 1920，高 1080，分辨率则为 1920x1080。

js 版：

```js
/**
 * @description 获取视频信息，宽、高、时长
 * @param {File} file File对象
 * @returns {Promise<{ duration: number; width: number; height: number }>}
 */
export function getVideoInfo(file) {
  return new Promise((resolve) => {
    const videoElement = document.createElement('video')
    videoElement.src = URL.createObjectURL(file)
    videoElement.addEventListener('loadedmetadata', function () {
      resolve({
        duration: videoElement.duration,
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      })
      // 释放URL.createObjectURL创建的对象URL，节约内存
      URL.revokeObjectURL(videoElement.src)
    })
  })
}

/**
 * @description 获取图片信息，宽、高
 * @param {File} file File对象
 * @returns {Promise<{ width: number; height: number }>}
 */
export function getImageInfo(file) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.addEventListener('load', () => {
      const { width, height } = image
      resolve({ width, height })
      // 释放URL.createObjectURL创建的对象URL，节约内存
      URL.revokeObjectURL(image.src)
    })
  })
}
```

ts 版：

```ts
/**
 * @description 获取视频信息，宽、高、时长
 * @param {File} file File对象
 * @returns {Promise<{ duration: number; width: number; height: number }>}
 */
export function getVideoInfo(
  file: File
): Promise<{ duration: number; width: number; height: number }> {
  return new Promise((resolve) => {
    const videoElement = document.createElement('video')
    videoElement.src = URL.createObjectURL(file)
    videoElement.addEventListener('loadedmetadata', function () {
      resolve({
        duration: videoElement.duration,
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      })
      // 释放URL.createObjectURL创建的对象URL，节约内存
      URL.revokeObjectURL(videoElement.src)
    })
  })
}

/**
 * @description 获取图片信息，宽、高
 * @param {File} file File对象
 * @returns {Promise<{ width: number; height: number }>}
 */
export function getImageInfo(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.addEventListener('load', () => {
      const { width, height } = image
      resolve({ width, height })
      // 释放URL.createObjectURL创建的对象URL，节约内存
      URL.revokeObjectURL(image.src)
    })
  })
}
```

- `getImageInfo` 可以拿到图片的宽、高

- `getVideoInfo` 可以拿到视频的宽、高、时长（单位：秒），这里要注意视频的宽、高的取值是 `videoWidth` 和 `videoHeight`，它们代表的是视频本身的大小，具体可以看 [HTMLVideoElement - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLVideoElement) 中的介绍

![image.png](https://aifuxi.oss-cn-shanghai.aliyuncs.com/fuxiaochen/image-zwkwremkgdtf8bksdamdvmnm.webp)

### 视频的比例

视频的比例计算规则：（视频的宽 / 视频宽和高的最大公约数) : (视频的高 / 视频宽和高的最大公约数)

举个例子：

一个视频宽为 1080，高为 1920，1080 和 1920 最大公约数为 120，即 (1080/120) : (1920/120)， 得到视频的比例为 9:16。

最大公约数可以根据下面的函数计算：

js 版：

```js
/**
 * @description 计算 a 和 b 的最大公约数
 * @param {number} a
 * @param {number} b
 * @returns {number} a 和 b 的最大公约数
 */
export function greatestCommonDivisor(a, b) {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}
```

ts 版：

```ts
/**
 * @description 计算 a 和 b 的最大公约数
 * @param {number} a
 * @param {number} b
 * @returns {number} a 和 b 的最大公约数
 */
export function greatestCommonDivisor(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}
```

## 参考链接

- [HTMLVideoElement - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLVideoElement)
- [前端上传视频文件获取分辨率与时长](https://juejin.cn/post/6873033200244506638)
