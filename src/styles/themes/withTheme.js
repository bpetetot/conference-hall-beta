import { inject } from '@k-ramel/react'
import { isOrganizerRoute, isSpeakerRoute } from 'store/reducers/router'
import classnames from 'classnames'

const mapStore = (store, { className }) => ({
  className: classnames('default-theme', className, {
    'red-theme': isOrganizerRoute(store.getState()),
    'blue-theme': isSpeakerRoute(store.getState()),
  }),
})

export default inject(mapStore)
