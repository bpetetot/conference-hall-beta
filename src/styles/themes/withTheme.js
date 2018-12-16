import { inject } from '@k-ramel/react'
import classnames from 'classnames'

const mapStore = (store, { className }, { router }) => ({
  className: classnames('default-theme', className, {
    'red-theme': router.getParam('root') === 'organizer',
    'blue-theme': router.getParam('root') === 'speaker',
  }),
})

export default inject(mapStore)
