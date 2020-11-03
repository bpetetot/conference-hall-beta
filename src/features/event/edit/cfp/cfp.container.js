import { inject } from '@k-ramel/react'

import CFPForm from './cfp'

const mapStore = (store) => {
  return {
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_EVENT_CFP', payload })
    },
  }
}

export default inject(mapStore)(CFPForm)
