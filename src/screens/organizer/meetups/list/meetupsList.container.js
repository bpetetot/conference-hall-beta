import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import MeetupList from './meetupsList'

const mapStore = (store, props, { router }) => ({
  eventId: router.getParam('eventId'),
  push: router.push,
})

export default compose(forRoute.absolute('organizer-event-meetups'), inject(mapStore))(MeetupList)
