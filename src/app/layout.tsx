import '@/styles/globals.css'
import { NextThemeProvider } from '@/components/providers'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { HerouiProviders } from './providers'
import { Console } from '@/components/console-text'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        <HerouiProviders>
          <NextThemeProvider>
            {children}
            <Console />
          </NextThemeProvider>
        </HerouiProviders>
      </body>
    </html>
  )
}
