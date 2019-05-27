import { inject } from '@k-ramel/react'

import SearchEvent from './searchEvent'

const mapStore = (store, props, { router }) => {
  let value = store.ui.searchEvents.get().query
  if (value === undefined) {
    value = router.getParam('query')
  }

  return {
    value,
    onChange: (e) => {
      store.dispatch({ type: '@@ui/ON_CHANGE_SEARCH_EVENTS_QUERY', payload: e.target.value })
    },
    onClick: () => {
      const { query } = store.ui.searchEvents.get()
      if (query) {
        router.push('search', null, { query })
      }
    },
  }
}

export default inject(mapStore)(SearchEvent)
