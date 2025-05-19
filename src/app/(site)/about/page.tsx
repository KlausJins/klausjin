import { CardLayout } from '@/components/card-layout'

export default function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-25 py-10">
      <div className=" grid grid-cols-24 grid-rows-4 gap-6 h-full items-center justify-center">
        <CardLayout className="col-span-14 animate-fade-up animate-ease-in-out">
          CardLayout
        </CardLayout>
        <CardLayout className="col-span-10 animate-fade-up animate-ease-in-out animate-delay-[200ms]">
          CardLayout
        </CardLayout>

        <CardLayout className="col-span-24 animate-fade-up animate-ease-in-out animate-delay-[400ms]">
          CardLayout
        </CardLayout>

        <CardLayout className="col-span-10 animate-fade-up animate-ease-in-out animate-delay-[400ms]">
          CardLayout
        </CardLayout>
        <CardLayout className="col-span-14 animate-fade-up animate-ease-in-out animate-delay-[600ms]">
          CardLayout
        </CardLayout>

        <CardLayout className="col-span-10 animate-fade-up animate-ease-in-out animate-delay-[600ms]">
          CardLayout
        </CardLayout>
        <CardLayout className="col-span-14 animate-fade-up animate-ease-in-out animate-delay-[800ms]">
          CardLayout
        </CardLayout>
      </div>
    </div>
  )
}
