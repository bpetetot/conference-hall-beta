/* eslint-disable react/display-name */
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { forwardRef, HTMLProps } from 'react'

type TextAreaProps = {
  name: string
  label: string
  type?: string
  description?: string
  error?: string
  optional?: boolean
  className?: string
} & HTMLProps<HTMLTextAreaElement>

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, label, className, description, error, optional, ...rest }, ref) => {
    return (
      <div className={className}>
        <label htmlFor={name} className={styles.label}>
          {label} {optional && <span className={styles.optional}>(optional)</span>}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <textarea
            ref={ref}
            name={name}
            id={name}
            rows={5}
            className={cn(styles.textarea, { [styles.textareaError]: !!error })}
            aria-invalid={!!error}
            aria-describedby={getDescribedBy(name, description, error)}
            {...rest}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" id="email-error" role="alert">
            {error}
          </p>
        )}
        {description && !error && (
          <p className="mt-1 text-sm text-gray-500" id={`${name}-description`}>
            {description}
          </p>
        )}
      </div>
    )
  },
)

const styles = {
  label: 'block text-sm font-medium text-gray-700',
  optional: 'text-xs font-normal text-gray-500',
  textarea: cn([
    'block',
    'w-full',
    'border',
    'border-gray-300',
    'rounded-md',
    'shadow-sm',
    'py-2',
    'px-3',
    'focus:outline-none',
    'focus:ring-primary-500',
    'focus:border-primary-500',
    'sm:text-sm',
  ]),
  textareaError: cn([
    'pr-10',
    'border-red-300',
    'text-red-900',
    'placeholder-red-300',
    'focus:ring-red-500',
    'focus:border-red-500',
  ]),
}

function getDescribedBy(name: string, description?: string, error?: string) {
  if (error) return `${name}-error`
  if (description) return `${name}-description`
  return ''
}

export default TextArea
