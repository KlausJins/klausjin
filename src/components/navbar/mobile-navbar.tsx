import React from 'react'
import { clm } from '@/utils/normal'
import IconSelf from '../icons/icon-self'
import Button from '../ui/button'

interface IMobileNavbarProps {
  className?: string
}

const MobileNavbar = ({ className }: IMobileNavbarProps) => {
  return (
    <div className={clm(className)}>
      <Button>
        <IconSelf iconName="icon-[lucide--align-left]" />
      </Button>
    </div>
  )
}

export default MobileNavbar
