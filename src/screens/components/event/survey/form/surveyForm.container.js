import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import SurveyForm from './surveyForm'

const mapState = (store, { uid }, { router }) => {
  const eventId = router.getParam('eventId')
  const { survey } = store.data.events.get(eventId) || {}
  const speakerSurvey = store.data.surveys.get(uid)
  return {
    survey,
    initialValues: speakerSurvey,
    submitting: store.ui.loaders.get().isSurveySaving,
    onSubmit: (data) => {
      store.dispatch({ type: '@@ui/SAVE_SPEAKER_SURVEY', payload: { eventId, uid, data } })
    },
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_SURVEY', payload: { eventId, uid } })
    },
  }
}

export default compose(
  inject(mapState), //
  loader(), //
)(SurveyForm)
