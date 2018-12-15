import { inject } from '@k-ramel/react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import SpeakerSurvey from './survey'

const mapState = (store, props, { router }) => {
  const { uid } = store.auth.get()
  const eventId = router.getPathParam('eventId')
  const { name } = store.data.events.get(eventId) || {}
  return {
    loaded: store.data.events.hasKey(eventId),
    uid,
    name,
  }
}

export default compose(
  forRoute.absolute('EVENT_SURVEY'), //
  inject(mapState), //
  loader, //
)(SpeakerSurvey)
