import { compose } from 'redux'
import forRoute from 'hoc-little-router'
import { inject } from '@k-ramel/react'

import BetaAccess from './betaAccess'

const mapStore = () => ({
  error: undefined,
  validateAccessKey: key => console.log(key),
})

export default compose(forRoute.absolute('BETA_ACCESS'), inject(mapStore))(BetaAccess)
