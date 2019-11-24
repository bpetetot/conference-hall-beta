import { inject } from '@k-ramel/react'
import cn from 'classnames'
import { Link } from '@k-redux-router/react-k-ramel'

const mapStore = (store, { code, className, classNameActive, onlyRoot }, { router }) => {
  const { route } = router.getResult()
  const root = router.getParam('root')
  const isActive = route.code === code || route.parentScreen === code || (onlyRoot && root === code)
  return {
    className: cn(className, { [classNameActive]: isActive }),
  }
}

export default inject(mapStore)(Link)
