import { useEffect, useState } from 'react'

type ScrollType = {
  isThrottle?: boolean
  delay?: number
}

export const useScroll = (props: ScrollType) => {
  const { isThrottle = false, delay = 500 } = props
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let timer: any = null
    const handleScroll = () => {
      if (isThrottle) {
        if (!timer) {
          timer = setTimeout(() => {
            setScrollY(window.scrollY || window.pageYOffset)
            timer = null
          }, delay)
        }
      } else {
        setScrollY(window.scrollY || window.pageYOffset)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollY
}
