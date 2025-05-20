import { CardLayout } from '@/components/card-layout'
import { ABOUT_IDENTITY_TEXT, ABOUT_NAME_TEXT, ABOUT_PRE_TEXT } from '@/constants/info'

export const Identity = () => {
  return (
    <CardLayout className="col-span-16 flex items-center animate-fade-up animate-ease-in-out bg-gradient-to-r from-[#3178C6] to-[#58C4DC] text-darkprimary">
      <div className="flex flex-col gap-1 justify-center">
        <p className="text-lg max-md:text-md">{ABOUT_PRE_TEXT}</p>
        <p className="text-6xl max-md:text-4xl font-bold">{ABOUT_NAME_TEXT}</p>
        <p className="text-lg max-md:text-md">{ABOUT_IDENTITY_TEXT}</p>
      </div>
    </CardLayout>
  )
}
