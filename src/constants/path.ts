import { NICKNAME } from './info'

export const PATHS = {
  /** ****************** SITE ****************** */
  SITE_HOME: '/',
  SITE_NOTE: '/note',
  SITE_ABOUT: '/about',
  SITE_ADMIN: '/admin',
  BACKEND_TAG: '/admin/tag',
  BACKEND_NOTE: '/admin/note'
}

export const PATHS_MAP: Record<string, string> = {
  /** ****************** SITE ****************** */
  [PATHS.SITE_HOME]: '首页',
  [PATHS.SITE_NOTE]: '笔记',
  [PATHS.SITE_ABOUT]: '关于',
  [PATHS.SITE_ADMIN]: '后台管理',
  [PATHS.BACKEND_TAG]: '标签管理',
  [PATHS.BACKEND_NOTE]: '笔记管理'
}

export const PATHS_MAP_DESC: Record<string, string> = {
  /** ****************** SITE ****************** */
  [PATHS.SITE_HOME]: '🚀 一个用于记录自己成长的简单的个人博客网站，使用 Next.js 构建。',
  [PATHS.SITE_NOTE]: '这里记录了我的想法、文章，希望和大家一起交流～',
  [PATHS.SITE_ABOUT]: `叮～ 你有一份关于${NICKNAME}的简介，请查收～`,
  [PATHS.SITE_ADMIN]: '【后台管理】欢迎回来，要努力学习嗷～',
  [PATHS.BACKEND_TAG]: '【标签管理】在这里对 标签 进行 增、删、改、查操作，在这里尽情地创作吧！',
  [PATHS.BACKEND_NOTE]: '【笔记管理】在这里对 笔记 进行 增、删、改、查操作，在这里尽情地创作吧！'
}
