import React from 'react'

interface FormPropsType extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode
}

const KlForm = React.forwardRef<HTMLFormElement, FormPropsType>((props, ref) => {
  const { children, ...rest } = props
  return (
    <form ref={ref} {...rest}>
      {children}
    </form>
  )
})
KlForm.displayName = 'KlForm'

export default KlForm
