import { compose } from 'redux'
import { inject, listen } from '@k-ramel/react'

import listeners from './organizersThread.listeners'
import OrganizersThread from './organizersThread'

const mapStore = (store, { eventId, proposalId }) => {
  const { uid } = store.auth.get()
  const messages = store.ui.organizer.organizersThread.getAsArray()

  return {
    currentUser: uid,
    messages,
    loadMessages: () => {
      store.dispatch({
        type: '@@ui/ON_LOAD_PROPOSAL_ORGANIZERS_MESSAGES',
        payload: { eventId, proposalId },
      })
    },
    onSaveMessage: (message, messageId) => {
      store.dispatch({
        type: '@@ui/ON_SAVE_PROPOSAL_ORGANIZERS_MESSAGE',
        payload: {
          eventId,
          proposalId,
          uid,
          messageId,
          message,
        },
      })
    },
    onDeleteMessage: (messageId) => {
      store.dispatch({
        type: '@@ui/ON_DELETE_PROPOSAL_ORGANIZERS_MESSAGE',
        payload: {
          eventId,
          proposalId,
          messageId,
        },
      })
    },
  }
}

export default compose(
  inject(mapStore),
  listen(listeners, 'ORGANIZERS_THREAD'),
)(OrganizersThread)
