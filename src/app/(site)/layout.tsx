import type { Metadata } from 'next'
import { WEBSITE, WEBSITE_DESCRIPTION } from '@/constants/info'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: {
    template: `${WEBSITE} - %s`,
    default: WEBSITE
  },
  description: WEBSITE_DESCRIPTION
}

export default function Layout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <div className="min-h-[100vh] bg-bgPrimary text-[#18181B] dark:bg-darkBgPrimary dark:text-[#FAFAFA] flex flex-col">
      <Navbar />
      {children}
      {modal}
      <Footer />
    </div>
  )
}
