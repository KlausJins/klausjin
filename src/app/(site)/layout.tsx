import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-[100vh] bg-bgPrimary text-[#18181B] dark:bg-darkBgPrimary dark:text-[#FAFAFA] flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
