'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { SessionProvider } from 'next-auth/react'

export function HerouiProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <ToastProvider placement={'top-center'} maxVisibleToasts={6} toastOffset={30} />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  )
}
