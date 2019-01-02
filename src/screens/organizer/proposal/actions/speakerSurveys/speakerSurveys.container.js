import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import SpeakerSurveys from './speakerSurveys'

const mapState = (store, { eventId, proposalId }) => {
  const { survey } = store.data.events.get(eventId) || {}
  const { speakers } = store.data.proposals.get(proposalId) || {}
  const uids = Object.keys(speakers)
  const responses = uids.map(uid => ({ uid, response: store.data.surveys.get(uid) }))
  return {
    survey,
    responses,
    load: () => {
      uids.forEach(uid => store.dispatch({ type: '@@ui/ON_LOAD_SURVEY', payload: { eventId, uid } }))
    },
  }
}

export default compose(
  inject(mapState), //
  loader(), //
)(SpeakerSurveys)
