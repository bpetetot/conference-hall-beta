import cn from 'classnames'

type Props = {
  size?: 's' | 'm' | 'l'
  alt?: string
  className?: string
}

const Logo = ({ size = 'l', alt = 'Conference Hall', className }: Props) => {
  const styles = cn(className, {
    'h-8': size === 's',
    'h-10': size === 'm',
    'h-12': size === 'l',
  })

  return (
    <img
      className={styles}
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
      alt={alt}
    />
  )
}

export default Logo
