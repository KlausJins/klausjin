import { ChangeEvent } from 'react'
import { KlSelect } from './select'
import { clm } from '@/utils'

interface PerPageProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  defaultSelectedKeys: string
}

const defaultStyles = clm(
  'bg-lighterBgPrimary dark:bg-darkerBgPrimary',
  'hover:bg-hoverColor [&[data-hover=true]:not([data-active=true])]:bg-hoverColor',
  'dark:hover:bg-darkHoverColor dark:[&[data-hover=true]:not([data-active=true])]:bg-darkHoverColor'
)

export const PerPage = ({ onChange, defaultSelectedKeys }: PerPageProps) => {
  return (
    <div className="min-w-40">
      <KlSelect
        selectProps={{
          label: '每页显示',
          defaultSelectedKeys: [defaultSelectedKeys],
          classNames: {
            label: 'text-primary dark:text-darkprimary',
            trigger: clm(
              defaultStyles,
              'hover:cursor-pointer bg-activeColor dark:bg-darkActiveColor'
            )
          },
          onChange: onChange
        }}
        selectItemProps={{
          className:
            'data-[selected=true]:!bg-activeColor dark:data-[selected=true]:!bg-darkActiveColor data-[hover=true]:!bg-activeColor dark:data-[hover=true]:!bg-darkActiveColor',
          selectDatas: [
            {
              id: '10',
              children: '10'
            },
            {
              id: '15',
              children: '15'
            },
            {
              id: '20',
              children: '20'
            }
          ]
        }}
      />
    </div>
  )
}
