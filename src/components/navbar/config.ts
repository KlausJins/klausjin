import { PATHS, PATHS_MAP } from '@/constants/path'

export const NAVBAR_ITEMS: {
  link: string
  name: string
}[] = [
  { link: PATHS.SITE_HOME, name: PATHS_MAP[PATHS.SITE_HOME] },
  { link: PATHS.SITE_NOTE, name: PATHS_MAP[PATHS.SITE_NOTE] },
  { link: PATHS.SITE_ABOUT, name: PATHS_MAP[PATHS.SITE_ABOUT] },
  { link: PATHS.SITE_ADMIN, name: PATHS_MAP[PATHS.SITE_ADMIN] }
]
