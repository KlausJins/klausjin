import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  compiler: {
    // 去掉生产环境的console，但是保留error
    // removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.oss-cn-guangzhou.aliyuncs.com'
      }
    ]
  }
}

export default nextConfig
