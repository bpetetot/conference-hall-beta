import cn from 'classnames'

type Props = {
  src?: string | null
  name?: string | null
  size?: 's' | 'm' | 'xl'
  className?: string
}

const Avatar = ({ src, name, size = 'm', className }: Props) => {
  const avatarStyles = cn('rounded-full bg-gray-100', className, {
    ['h-8 w-8']: size === 's',
    ['h-10 w-10']: size === 'm',
    ['h-20 w-20']: size === 'xl',
  })

  if (!src && !name) {
    return (
      <span className={cn('block overflow-hidden', avatarStyles)}>
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    )
  }

  const textStyles = cn('font-medium leading-none text-gray-500', {
    ['text-s']: size === 's',
    ['text-xl']: size === 'm',
    ['text-4xl']: size === 'xl',
  })

  if (!src) {
    return (
      <span className={cn('flex items-center justify-center', avatarStyles)}>
        <span className={textStyles}>{name?.charAt(0)}</span>
      </span>
    )
  }

  return <img className={avatarStyles} src={src} alt={`${name} avatar`} />
}

export default Avatar
