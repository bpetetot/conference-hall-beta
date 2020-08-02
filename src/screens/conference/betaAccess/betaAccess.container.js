import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'
import { inject } from '@k-ramel/react'

import BetaAccess from './betaAccess'

const mapStore = (store) => ({
  redirectToNextUrl: () => store.dispatch('@@router/REDIRECT_TO_NEXT_URL'),
})

export default compose(forRoute.absolute('beta-access'), inject(mapStore))(BetaAccess)
