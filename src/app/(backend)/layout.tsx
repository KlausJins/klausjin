import { Admin } from '@/backend'
import { BackendNavbar } from '@/components/backend-navbar'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-[100vh] bg-bgPrimary text-[#18181B] dark:bg-darkBgPrimary dark:text-[#FAFAFA] flex flex-col">
      <BackendNavbar />

      <Admin>{children}</Admin>
    </div>
  )
}
