import cn from 'classnames'
import { InputHTMLAttributes } from 'react'

type Props = {
  name: string
  label: string
  type?: string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ name, label, className, ...rest }: Props) => {
  return (
    <div className={className}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input name={name} id={name} className={styles.input} {...rest} />
    </div>
  )
}

const styles = {
  label: cn(['block', 'text-sm', 'font-medium', 'text-gray-700']),
  input: cn([
    'mt-1',
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
}

export default Input
