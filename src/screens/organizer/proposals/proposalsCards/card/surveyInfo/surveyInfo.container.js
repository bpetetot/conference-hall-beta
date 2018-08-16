import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import SurveyInfo from './surveyInfo'

const mapState = (store, { eventId, speakers }) => {
  const uids = Object.keys(speakers)
  const responses = uids.map(uid => ({ uid, response: store.data.surveys.get(uid) }))
  return {
    responses,
    load: () => {
      uids.forEach(uid => store.dispatch({ type: '@@ui/ON_LOAD_SURVEY', payload: { eventId, uid } }))
    },
  }
}

export default compose(
  inject(mapState), //
  loader(), //
)(SurveyInfo)
