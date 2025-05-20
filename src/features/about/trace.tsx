import { CardLayout } from '@/components/card-layout'
import { RollingText } from '@/components/rolling-text'
export const Trace = () => {
  const rollingText = [
    {
      text: '体验',
      className: 'text-3xl font-black from-[#FA7572] to-[#F55F7F]'
    },
    {
      text: '学习',
      className: 'text-3xl font-black from-[#17E198] to-[#0CC15D]'
    },
    {
      text: '生活',
      className: 'text-3xl font-black from-[#0ECFFE] to-[#09A6F1]'
    },
    {
      text: '程序',
      className: 'text-3xl font-black from-[#8A7BFB] to-[#633E9C]'
    }
  ]

  return (
    <CardLayout className="col-span-8 animate-fade-up animate-ease-in-out animate-delay-[200ms]">
      <div className="flex flex-col">
        <p className="text-sm mb-4 text-secondary dark:text-darksecondary">追求</p>
        <p className="text-3xl font-black">源于</p>
        <p className="text-3xl font-black">热爱而去感受</p>
        <RollingText
          stringArr={rollingText}
          animateName="animate-rolling-text"
          layoutHeightClassName="h-13"
          className="pt-2 -mt-1"
          isGradient={true}
        />
      </div>
    </CardLayout>
  )
}
