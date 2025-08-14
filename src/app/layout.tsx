import '@/styles/globals.css'
import { NextThemeProvider } from '@/components/providers'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { HerouiProviders } from './providers'
import { Console } from '@/components/console-text'
import Script from 'next/script'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteId = process.env.NEXT_PUBLIC_BAIDU_SITE_ID
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME

  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        <HerouiProviders>
          <NextThemeProvider>
            {children}
            <Console />
          </NextThemeProvider>
        </HerouiProviders>

        {/* 百度统计 */}
        {siteId && (
          <Script
            id="baidu-tongji"
            // 确保脚本在页面 hydration 之后加载
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if (window.location.hostname.endsWith('${siteName}')) {
                  var _hmt = _hmt || [];
                  (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?${siteId}";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                  })();
                }
              `
            }}
          />
        )}
      </body>
    </html>
  )
}
