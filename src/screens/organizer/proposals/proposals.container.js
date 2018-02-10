import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'redux/router'
import Proposals from './proposals'

const mapStore = store => ({ eventId: getRouterParam('eventId')(store.getState()) })

export default compose(
  forRoute.absolute('PROPOSALS'), //
  inject(mapStore), //
)(Proposals)
