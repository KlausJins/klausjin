import { CardLayout } from '@/components/card-layout'

export const Speciality = () => {
  return (
    <CardLayout className="col-span-15 row-span-2 animate-fade-up animate-ease-in-out animate-delay-[1000ms] bg-gradient-to-r from-[#FF2ADF] to-[#FF5375]">
      <div className="flex flex-col gap-2">
        <p className="text-sm mb-0 text-darkprimary/80">特长</p>
        <p className="text-3xl max-md:text-2xl font-black text-darkprimary/50">经典CV工程师</p>
        <p className="text-3xl max-md:text-2xl font-black text-darkprimary">面向 ChatGPT 编程</p>
      </div>
    </CardLayout>
  )
}
