import { CardLayout } from '@/components/card-layout'

export default function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-25 max-md:px-10 py-10">
      <div className="grid max-md:gap-4 grid-cols-24 grid-rows-4 gap-6 h-full max-md:flex flex-col">
        {/* 自我介绍 */}
        <CardLayout className="col-span-14 animate-fade-up animate-ease-in-out bg-gradient-to-r from-[#3178C6] to-[#58C4DC] text-darkprimary">
          <div className="flex flex-col gap-1">
            <p>嘿！你发现我啦 👋🏻</p>
            <p className="text-4xl font-bold">我是KlausJin</p>
            <p>是一名前端开发工程师 👨🏻‍💻、篮球运动爱好者 ⛹🏻‍♂️</p>
          </div>
        </CardLayout>

        {/* 追求 */}
        <CardLayout className="col-span-10 animate-fade-up animate-ease-in-out animate-delay-[200ms]">
          <div>追求</div>
        </CardLayout>

        {/* 技术力 */}
        <CardLayout className="col-span-24 animate-fade-up animate-ease-in-out animate-delay-[400ms]">
          <div>技术力</div>
        </CardLayout>

        <div className="grid grid-flow-col grid-cols-24 grid-rows-3 gap-6 col-span-24 max-md:flex flex-col animate-fade-up animate-ease-in-out animate-delay-[600ms]">
          {/* 专业和生涯 */}
          <CardLayout className="row-span-3 col-span-10 animate-fade-up animate-ease-in-out animate-delay-[600ms]">
            <div>专业和生涯</div>
          </CardLayout>

          {/* 特长 */}
          <CardLayout className="col-span-14 animate-fade-up animate-ease-in-out animate-delay-[800ms]">
            <div>特长</div>
          </CardLayout>

          {/* 喜欢的歌手 */}
          <CardLayout className="col-span-14 row-span-2 animate-fade-up animate-ease-in-out animate-delay-[1000ms]">
            <div>喜欢的歌手</div>
          </CardLayout>
        </div>
      </div>
    </div>
  )
}
