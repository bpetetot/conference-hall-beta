import cn from 'classnames'
import { FormHTMLAttributes, ReactNode } from 'react'

import Card from '../Card'

type FormCardProps = {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
} & FormHTMLAttributes<HTMLFormElement>

const FormCard = ({ title, description, children, className, ...rest }: FormCardProps) => (
  <form {...rest}>
    <Card withPadding={false} className={className}>
      {title && (
        <div className="pt-6 px-4 sm:pt-6 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      {children}
    </Card>
  </form>
)

type FormCardActionsProps = {
  children: ReactNode
  className?: string
}

const FormCardActions = ({ children, className }: FormCardActionsProps) => (
  <div className={cn('bg-gray-50 rounded-b-lg text-right px-4 py-3 sm:px-6 space-x-3', className)}>
    {children}
  </div>
)

type FormCardContentProps = {
  children: ReactNode
}

const FormCardContent = ({ children }: FormCardContentProps) => (
  <div className="py-6 px-4 space-y-6 sm:pt-6 sm:px-6">{children}</div>
)

FormCard.Content = FormCardContent
FormCard.Actions = FormCardActions

export default FormCard
