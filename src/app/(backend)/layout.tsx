import { Admin } from '@/backend'
import { BackendNavbar } from '@/components/backend-navbar'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bgPrimary text-[#18181B] dark:bg-darkBgPrimary dark:text-[#FAFAFA] flex flex-col">
      <BackendNavbar />

      <Admin>{children}</Admin>
    </div>
  )
}
