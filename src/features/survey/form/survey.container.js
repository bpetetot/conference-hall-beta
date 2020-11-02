import { inject } from '@k-ramel/react'
import { compose } from 'redux'

import loader from 'components/loader'
import SpeakerSurvey from './survey'

const mapState = (store, { eventId }) => {
  const { name, survey } = store.data.events.get(eventId) || {}
  return {
    name,
    survey,
    loaded: store.data.events.hasKey(eventId),
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: { eventId, loadSettings: false } })
    },
  }
}

export default compose(inject(mapState), loader)(SpeakerSurvey)
