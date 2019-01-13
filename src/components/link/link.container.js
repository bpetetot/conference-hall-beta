import { inject } from '@k-ramel/react'
import cn from 'classnames'
import { Link } from '@k-redux-router/react-k-ramel'

const mapStore = (store, { code, className, classNameActive }, { router }) => {
  const { route } = router.getResult()
  const isActive = route.code === code || route.parentScreen === code
  return {
    className: cn(className, { [classNameActive]: isActive }),
  }
}

export default inject(mapStore)(Link)
