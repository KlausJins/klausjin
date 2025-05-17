import type { Metadata } from 'next'
import '@/styles/globals.css'
import { NextThemeProvider } from '@/components/providers'
import { WEBSITE, WEBSITE_DESCRIPTION } from '@/constants/info'

export const metadata: Metadata = {
  title: WEBSITE,
  description: WEBSITE_DESCRIPTION
}

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
      <body className={`antialiased`}>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  )
}
