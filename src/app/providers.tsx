'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'

export function HerouiProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement={'top-center'} maxVisibleToasts={6} toastOffset={30} />
      {children}
    </HeroUIProvider>
  )
}
