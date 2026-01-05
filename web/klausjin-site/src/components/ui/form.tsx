import { Form, PropsOf } from '@heroui/react'
import React from 'react'

interface FormPropsType extends PropsOf<typeof Form> {
  children?: React.ReactNode
}

const KlForm = React.forwardRef<HTMLFormElement, FormPropsType>((props, ref) => {
  const { children, onSubmit, ...rest } = props
  return (
    <Form ref={ref} {...rest} onSubmit={onSubmit}>
      {children}
    </Form>
  )
})
KlForm.displayName = 'KlForm'

export default KlForm
