import * as React from 'react'

import { type Metadata } from 'next'
import { PATHS, PATHS_MAP, PATHS_MAP_DESC } from '@/constants/path'

export const metadata: Metadata = {
  title: PATHS_MAP[PATHS.SITE_ABOUT],
  description: PATHS_MAP_DESC[PATHS.SITE_ABOUT]
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>
}
