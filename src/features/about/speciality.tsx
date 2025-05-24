import { CardLayout } from '@/components/card-layout'
import {
  ABOUT_SPECIALITY_LINE_1,
  ABOUT_SPECIALITY_LINE_2,
  ABOUT_SPECIALITY_TITLE
} from '@/constants/info'

export const Speciality = () => {
  return (
    <CardLayout className="col-span-15 row-span-2 animate-fade-up animate-ease-in-out animate-delay-[1000ms] bg-gradient-to-r from-[#FF2ADF] to-[#FF5375]">
      <div className="flex flex-col gap-2">
        <p className="text-sm mb-0 text-darkprimary/80">{ABOUT_SPECIALITY_TITLE}</p>
        <p className="text-3xl max-md:text-2xl font-black text-darkprimary/50">
          {ABOUT_SPECIALITY_LINE_1}
        </p>
        <p className="text-3xl max-md:text-2xl font-black text-darkprimary">
          {ABOUT_SPECIALITY_LINE_2}
        </p>
      </div>
    </CardLayout>
  )
}
