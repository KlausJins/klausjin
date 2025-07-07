import { Form, FormProps } from '@heroui/react'
import React from 'react'

interface FormPropsType
  extends React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>> {
  children?: React.ReactNode
}

const KlForm = React.forwardRef<HTMLFormElement, FormPropsType>((props, ref) => {
  const { children, ...rest } = props
  return (
    <Form ref={ref} {...rest}>
      {children}
    </Form>
  )
})
KlForm.displayName = 'KlForm'

export default KlForm
