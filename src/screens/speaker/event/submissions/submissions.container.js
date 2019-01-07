import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Submissions from './submissions'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  return {
    eventId,
  }
}

export default compose(
  forRoute('speaker-event-submissions'),
  inject(mapStore),
)(Submissions)
