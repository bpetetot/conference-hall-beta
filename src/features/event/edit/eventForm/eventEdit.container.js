import { inject } from '@k-ramel/react'

import EventForm from '../../form'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId)

  return {
    onSubmit: (values) => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_EVENT_DETAILS',
        payload: {
          ...values,
          visibility: values.visibility ? 'private' : 'public',
        },
      })
    },
    toggleArchive: () => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_EVENT_DETAILS',
        payload: { id: event.id, archived: !event.archived },
      })
    },
  }
}

export default inject(mapStore)(EventForm)
