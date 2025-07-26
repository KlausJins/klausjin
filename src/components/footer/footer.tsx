import { formatTime } from '@/utils'
import Image from 'next/image'

export const Footer = () => {
  return (
    <div className="flex text-sm max-md:text-xs max-md:flex-col gap-4 max-md:gap-1 justify-center items-center h-40 pt-20 pb-10 px-10 box-border text-secondary">
      {/* 手机端展示：ICP备案号 */}
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        className="hover:font-bold hidden max-md:flex"
      >
        粤ICP备2025446997号
      </a>

      {/* 公安备案号 */}
      <div className="flex justify-center items-center gap-1 hover:font-bold">
        <Image
          src="/footer/gongan.png"
          alt="公安备案号"
          className="size-5 -mt-0.5"
          width={20}
          height={20}
        />
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=2025XXXXXX"
          rel="noreferrer"
          target="_blank"
        >
          粤公网安备2025XXXXXX号
        </a>
      </div>

      {/* ICP备案号 */}
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        className="hover:font-bold flex max-md:hidden"
      >
        粤ICP备2025446997号
      </a>

      {/* 版权所有 */}
      <span>{`© ${formatTime(new Date(), 'YYYY')} KlausJin. All rights reserved.`}</span>
    </div>
  )
}
