import OSS from 'ali-oss'

const aliOSS = new OSS({
  // 从环境变量中获取访问凭证
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  // 填写Bucket所在地域
  region: process.env.OSS_REGION,
  // 填写Bucket名称
  bucket: process.env.OSS_BUCKET,
  // 填写Bucket所在地域对应的公网Endpoint
  endpoint: process.env.OSS_ENDPOINT
})

export default aliOSS
