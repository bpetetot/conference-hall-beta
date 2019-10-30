import { inject } from '@k-ramel/react'

import NoResult from './noResult'

const mapStore = (store) => ({
  resetSearch: () => store.dispatch('@@ui/RESET_SEARCH'),
})

export default inject(mapStore)(NoResult)
