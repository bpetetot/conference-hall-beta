import { XCircleIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import { FormHTMLAttributes, ReactNode } from 'react'

import TailSpinLoader from '../../styles/icons/loader'
import Card from '../Card'

type FormCardProps = {
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  isSubmitting?: boolean
  submittingMessage?: string
  isSubmitSuccess?: boolean
  submitSuccessMessage?: string
  isSubmitFail?: boolean
  submitFailMessage?: string
  className?: string
} & FormHTMLAttributes<HTMLFormElement>

const FormCard = ({
  title,
  description,
  children,
  isSubmitting,
  submittingMessage = 'Saving',
  isSubmitSuccess,
  submitSuccessMessage = 'Successfully saved',
  isSubmitFail,
  submitFailMessage = 'An error occured',
  className,
  ...rest
}: FormCardProps) => (
  <form {...rest}>
    <Card withPadding={false} className={className}>
      <div className="pt-6 px-4 sm:pt-6 sm:px-6 flex justify-between items-start flex-wrap sm:flex-nowrap">
        <div>
          <h3>{title}</h3>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        <div className="flex-shrink-0 flex items-center">
          {isSubmitSuccess && !isSubmitting && (
            <>
              <span className="mr-1 text-sm text-gray-500">{submitSuccessMessage}</span>
              <CheckCircleIcon className="h-6 w-6 text-green-500 inline-block" />
            </>
          )}
          {isSubmitFail && !isSubmitting && (
            <>
              <span className="mr-1 text-sm text-gray-500">{submitFailMessage}</span>
              <XCircleIcon className="h-6 w-6 text-red-500 inline-block" />
            </>
          )}
          {isSubmitting && (
            <>
              <span className="mr-1 text-sm text-gray-500">{submittingMessage}</span>
              <TailSpinLoader className="h-6 w-6 text-gray-400 inline-block animate-spin" />
            </>
          )}
        </div>
      </div>

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
