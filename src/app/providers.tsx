'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { SessionProvider } from 'next-auth/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store'

export function HerouiProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>
        <HeroUIProvider>
          <ToastProvider placement={'top-center'} maxVisibleToasts={6} toastOffset={30} />
          {children}
        </HeroUIProvider>
      </SessionProvider>
    </ReduxProvider>
  )
}
