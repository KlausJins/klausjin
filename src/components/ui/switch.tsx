import { Switch, SwitchProps } from '@heroui/react'

export const KlSwitch = ({ children, size = 'sm', ...props }: SwitchProps) => {
  return (
    <Switch
      size={size}
      classNames={{
        wrapper:
          'bg-[#E4E4E7] dark:bg-[#27272A] group-data-[selected=true]:bg-darkBgPrimary dark:group-data-[selected=true]:bg-bgPrimary',
        thumb: 'bg-bgPrimary dark:bg-darkBgPrimary'
      }}
      {...props}
    >
      {children}
    </Switch>
  )
}
