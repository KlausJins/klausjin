import { clm } from '@/utils/normal'

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const CardLayout = ({ className, children }: PropsType) => {
  return (
    <div
      className={clm(
        'inline-block w-full rounded-xl border-borderColor dark:border-darkBorderColor transition-colors duration-200 bg-lighterBgPrimary dark:bg-darkerBgPrimary outline-0 px-10 py-6',
        className
      )}
    >
      {children}
    </div>
  )
}
