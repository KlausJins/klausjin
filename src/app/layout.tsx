import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { NextThemeProvider } from '@/components/providers'
import { WEBSITE, WEBSITE_DESCRIPTION } from '@/constants/info'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  )
}
