import { inject } from '@k-ramel/react'

import BetaAccess from './betaAccess'

const mapStore = (store) => ({
  redirectToNextUrl: () => store.dispatch('@@router/REDIRECT_TO_NEXT_URL'),
})

export default inject(mapStore)(BetaAccess)
