import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'
import { inject, listen } from '@k-ramel/react'

import listeners from './betaAccess.listeners'
import BetaAccess from './betaAccess'

const mapStore = (store) => ({
  error: store.ui.beta.get().error,
  validateAccessKey: (uid, key) =>
    store.dispatch({ type: '@@ui/CHECK_BETA_ACCESS_KEY', payload: { uid, key } }),
})

export default compose(
  forRoute.absolute('beta-access'),
  inject(mapStore),
  listen(listeners),
)(BetaAccess)
