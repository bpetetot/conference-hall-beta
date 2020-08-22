import { inject } from '@k-ramel/react'

import Navbar from './navbar'

// TODO FIX IT
const mapStore = () => {
  // const isOrganizer = router.getParam('root') === 'organizer'
  // const eventId = router.getParam('eventId')
  // const { events } = store.data
  // let event
  // if (isOrganizer) {
  //   event = events.get(eventId) || {}
  // } else {
  //   const { currentEventId } = store.ui.app.get()
  //   event = events.get(currentEventId) || events.get(eventId) || {}
  // }
  // return {
  //   name: event.name,
  // }
}

export default inject(mapStore)(Navbar)
