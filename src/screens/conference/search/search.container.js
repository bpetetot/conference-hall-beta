import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Search from './search'

const mapStore = store => ({
  query: store.ui.searchEvents.get().query,
})

export default compose(
  forRoute.absolute('search'),
  inject(mapStore),
)(Search)
