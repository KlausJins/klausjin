'use server'

import { PATHS } from '@/constants/path'
import { signIn, signOut } from '@/lib/auth'

export const signOutAndRedirect = async () => {
  await signOut({
    redirectTo: '/'
  })
}

export const signInWithGithub = async () => {
  await signIn('github', {
    redirectTo: PATHS.SITE_ADMIN
  })
}
