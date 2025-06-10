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
            <Button filled="true">{item.TEXT}</Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
