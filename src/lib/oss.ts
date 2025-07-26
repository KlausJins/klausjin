'use server'

import OSS from 'ali-oss'
import Credential, { Config } from '@alicloud/credentials'

async function createOSSClient() {
  console.log(process.env)
  const isProd = process.env.NODE_ENV === 'production'

  if (isProd) {
    console.log('生产环境')
    const config = {
      type: 'ecs_ram_role', // 凭证类型
      roleName: process.env.OSS_ROLE_NAME, // 账户RoleName，非必填，不填则自动获取，建议设置，可以减少请求
      disableIMDSv1: true // 禁用 V1 兜底，获取安全令牌失败则报错，可以设置环境变量来开启：ALIBABA_CLOUD_IMDSV1_DISABLED=true
    } as Config

    const cred = new Credential(config)
    const { accessKeyId, accessKeySecret, securityToken } = await cred.getCredential()

    return new OSS({
      accessKeyId: accessKeyId || '',
      accessKeySecret: accessKeySecret || '',
      stsToken: securityToken,
      refreshSTSTokenInterval: 0, // 由Credential控制accessKeyId、accessKeySecret和stsToken值的更新
      refreshSTSToken: async () => {
        const { accessKeyId, accessKeySecret, securityToken } = await cred.getCredential()

        return {
          accessKeyId: accessKeyId || '',
          accessKeySecret: accessKeySecret || '',
          stsToken: securityToken || ''
        }
      }
    })
  } else {
    console.log('开发环境')
    return new OSS({
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
  }
}

export default createOSSClient
