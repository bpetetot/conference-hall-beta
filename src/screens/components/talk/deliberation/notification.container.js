import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Notification from './notification'

const mapStore = (store, { eventId, submission }) => {
  const { name } = store.data.events.get(eventId) || {}
  return {
    name,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId })
    },
    onChange: () => {
      // change state of submission soorginzer can see the new statusin deliberation page.
      store.dispatch({
        type: '@@ui/ON_UPDATE_PROPOSAL',
        payload: {
          proposal: {
            id: submission.id,
            evtId: eventId,
            state: 'confirmed',
          },
          options: { updateTimestamp: true },
        },
      })
    },
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Notification)
