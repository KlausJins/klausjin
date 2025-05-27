export const addKeyframe = (keyframes: string) => {
  // 创建style标签
  const style = document.createElement('style')
  // 设置style属性
  // style.type = 'text/css'
  // 将 keyframes样式写入style内
  style.innerHTML = keyframes
  // 将style样式存放到box标签
  document.body.appendChild(style)
}

export const removeBodyKeyframe = () => {
  // 设置定时器，延迟删除style标签，避免页面闪烁
  setTimeout(() => {
    document.querySelectorAll('body style').forEach((styleTag) => styleTag.remove())
  }, 500)
}
