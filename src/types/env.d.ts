declare namespace NodeJS {
  interface ProcessEnv {
    ADMIN_GITHUB_SECRET: string
    ADMIN_GITHUB_ROLEID: string
    OSS_ACCESS_KEY_ID: string
    OSS_ACCESS_KEY_SECRET: string
    OSS_BUCKET: string
    OSS_ENDPOINT: string
    OSS_REGION: string
    OSS_ROLE_NAME: string
    ALGOLIA_APP_ID: string
    ALGOLIA_SEARCH_KEY: string
    ALGOLIA_WRITE_KEY: string
  }
}
