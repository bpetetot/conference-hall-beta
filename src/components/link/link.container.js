import { inject } from '@k-ramel/react'
import cn from 'classnames'
import { Link } from '@k-redux-router/react-k-ramel'

const mapStore = (store, { code, className, classNameActive }, { router }) => {
  const isActive = router.getCurrentCode() === code
  return {
    className: cn(className, { [classNameActive]: isActive }),
  }
}

export default inject(mapStore)(Link)
