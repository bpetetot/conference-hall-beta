import { compose } from 'redux'
import forRoute from 'hoc-little-router'
import { inject, listen } from '@k-ramel/react'

import listeners from './betaAccess.listeners'
import BetaAccess from './betaAccess'

const mapStore = store => ({
  error: store.ui.beta.get().error,
  validateAccessKey: key => store.dispatch({ type: '@@ui/CHECK_BETA_ACCESS_KEY', payload: key }),
})

export default compose(
  forRoute.absolute('BETA_ACCESS'),
  inject(mapStore),
  listen(listeners),
)(BetaAccess)
