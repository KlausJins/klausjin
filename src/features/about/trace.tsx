import { CardLayout } from '@/components/card-layout'
import { RollingText } from '@/components/rolling-text'
import {
  ABOUT_TRACE_LINE_1,
  ABOUT_TRACE_LINE_2,
  ABOUT_TRACE_ROLLING_TEXT,
  ABOUT_TRACE_TITLE
} from '@/constants/info'

export const Trace = () => {
  return (
    <CardLayout className="col-span-8 animate-fade-up animate-ease-in-out animate-delay-[200ms]">
      <div className="flex flex-col">
        <p className="text-sm mb-4 max-md:mb-2 text-secondary dark:text-darksecondary">
          {ABOUT_TRACE_TITLE}
        </p>
        <p className="text-3xl max-md:text-2xl font-black">{ABOUT_TRACE_LINE_1}</p>
        <p className="text-3xl max-md:text-2xl font-black">{ABOUT_TRACE_LINE_2}</p>
        <RollingText
          stringArr={ABOUT_TRACE_ROLLING_TEXT}
          animateName="animate-rolling-text"
          layoutHeightClassName="h-11"
          className="pt-1.5 -mt-1 max-md:pt-2"
          isGradient={true}
        />
      </div>
    </CardLayout>
  )
}
