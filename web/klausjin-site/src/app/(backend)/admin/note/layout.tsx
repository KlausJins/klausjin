import * as React from 'react'

import { type Metadata } from 'next'
import { PATHS, PATHS_MAP, PATHS_MAP_DESC } from '@/constants/path'

export const metadata: Metadata = {
  title: PATHS_MAP[PATHS.BACKEND_NOTE],
  description: PATHS_MAP_DESC[PATHS.BACKEND_NOTE]
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>
}
