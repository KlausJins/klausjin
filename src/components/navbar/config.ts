import { PATHS, PATHS_MAP } from '@/constants/path'

export const NAVBAR_ITEMS: {
  link: string
  name: string
}[] = [
  { link: PATHS.SITE_HOME, name: PATHS_MAP[PATHS.SITE_HOME] },
  { link: PATHS.SITE_BLOG, name: PATHS_MAP[PATHS.SITE_BLOG] },
  { link: PATHS.SITE_ABOUT, name: PATHS_MAP[PATHS.SITE_ABOUT] }
]
