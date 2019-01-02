import { compose } from 'redux'
import { inject, listen } from '@k-ramel/react'

import listeners from './organizersThread.listeners'
import OrganizersThread from './organizersThread'

const mapStore = (store, { eventId, proposalId }) => {
  const { uid } = store.auth.get()
  const messages = store.ui.organizer.organizersThread.get()

  return {
    messages,
    loadMessages: () => {
      store.dispatch({
        type: '@@ui/ON_LOAD_PROPOSAL_ORGANIZERS_MESSAGES',
        payload: { eventId, proposalId },
      })
    },
    onAddMessage: (message) => {
      store.dispatch({
        type: '@@ui/ON_ADD_PROPOSAL_ORGANIZERS_MESSAGE',
        payload: {
          eventId,
          proposalId,
          uid,
          message,
        },
      })
    },
  }
}

export default compose(
  inject(mapStore),
  listen(listeners, 'ORGANIZERS_THREAD'),
)(OrganizersThread)
