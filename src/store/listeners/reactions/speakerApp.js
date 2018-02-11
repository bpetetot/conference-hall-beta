import { reaction } from 'k-ramel'

import eventCrud from 'firebase/events'
import { getRouterParam } from 'store/reducers/router'

export const init = reaction((action, store) => {
  // check if an event id is in localstorage
  const localStorageEventId = localStorage.getItem('currentEventId')
  // check if an event id is in URL
  const routerEventId = getRouterParam('eventId')(store.getState())
  // load the event
  store.dispatch({
    type: '@@ui/ON_CHANGE_SPEAKER_APP_EVENT',
    payload: { eventId: routerEventId || localStorageEventId },
  })
})

/**
 * Set the contextual event for the speaker app
 * @param {object} eventId event id
 */
export const setCurrentEvent = reaction(async (action, store) => {
  const { eventId } = action.payload
  if (!eventId) return
  // check if its already in the store else fetch it
  let event = store.data.events.get(eventId)
  if (!event) {
    const eventRef = await eventCrud.read(eventId)
    if (eventRef.exists) {
      event = eventRef.data()
      store.data.events.add(event)
    }
  }
  // fetch event
  if (event) {
    // set contextual event id
    store.ui.speaker.app.set({ currentEventId: eventId })
    // set it in localstorage (it will be persisted later)
    localStorage.setItem('currentEventId', eventId)
  } else {
    localStorage.removeItem('currentEventId', eventId)
  }
})
