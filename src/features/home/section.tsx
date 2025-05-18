'use client'

import {
  HOME_GREETINIG_TEXT,
  HOME_NAME_TEXT,
  HOME_PRE_TEXT,
  HOME_SLOGAN_TEXT,
  HOME_TPYE_EN_TEXT,
  HOME_TPYE_ZH_TEXT
} from '@/constants/info'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Section = () => {
  return (
    <div className="flex flex-col gap-4 m-auto text-primary dark:text-darkprimary px-4">
      <span className="text-5xl max-sm:text-3xl">{HOME_PRE_TEXT}</span>

      <span className="text-8xl max-sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#23D1EE] to-[#29B7F0] ">
        {HOME_NAME_TEXT}
      </span>

      <TypeAnimation
        sequence={[HOME_TPYE_ZH_TEXT, 1000, HOME_TPYE_EN_TEXT, 2000, () => {}]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        speed={8}
        className="text-5xl max-sm:text-3xl flex break-all"
      />

      <span className="text-5xl max-sm:text-3xl">{HOME_GREETINIG_TEXT}</span>

      <span className="text-2xl max-sm:text-lg text-secondary dark:text-darksecondary">
        {HOME_SLOGAN_TEXT}
      </span>
    </div>
  )
}

export default Section
