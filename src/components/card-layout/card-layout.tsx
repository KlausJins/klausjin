import { clm } from '@/utils/normal'

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const CardLayout = ({ className, children }: PropsType) => {
  // hover:bg-hoverColor dark:hover:bg-darkHoverColor
  return (
    <div
      className={clm(
        'inline-block rounded-xl border-0 border-borderColor dark:border-darkBorderColor transition-colors duration-200 text-primary-foreground bg-bgPrimary dark:bg-darkerBgPrimary p-[6px] outline-0 shadow-[0_0_30px_0_rgba(150,150,150,0.1)] dark:shadow-[0_0_30px_0_rgba(0,0,0,0.1)] px-10 py-6',
        className
      )}
    >
      {children}
    </div>
  )
}
