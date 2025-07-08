import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

//使用中文包
dayjs.locale('zh-cn')

// 格式化时间
export const formatTime = (time: string | Date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format)
}

export const formatChineseDateTime = (
  time: string | Date,
  format = 'YYYY年M月D日 dddd HH:mm:ss'
) => {
  return dayjs(time).format(format)
}
