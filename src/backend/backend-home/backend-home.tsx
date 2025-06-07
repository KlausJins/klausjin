import Button from '@/components/ui/button'
import { BACKEND_HOME_LINKS, BACKEND_HOME_TEXT } from '@/constants/backend-info'
import Link from 'next/link'

export const BackendHome = () => {
  return (
    <div className="flex flex-col gap-4 p-10 fixed top-50">
      <div className="font-black text-3xl">{BACKEND_HOME_TEXT.GREETING_TEXT}</div>
      <div className="text-secondary dark:text-darksecondary text-lg">
        {BACKEND_HOME_TEXT.DES_TEXT}
      </div>
      <div className="flex gap-4">
        {BACKEND_HOME_LINKS.map((item) => (
          <Link href={item.SRC} key={item.SRC}>
            <Button className="px-3 py-2 border-0 text-sm font-bold text-bgPrimary dark:text-darkBgPrimary bg-darkBgPrimary dark:bg-bgPrimary hover:bg-darkBgPrimary/90 dark:hover:text-darkBgPrimary/90">
              {item.TEXT}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
