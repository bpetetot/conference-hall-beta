import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { reduxForm } from 'redux-form'
import loader from 'hoc-react-loader/build/core'

import SurveyForm from './surveyForm'

const speakerSurveyForm = uid => `speaker-survey-${uid}`

const mapState = (store, { uid }, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const { survey } = store.data.events.get(eventId) || {}
  const speakerSurvey = store.data.surveys.get(uid)
  return {
    form: speakerSurveyForm(uid),
    survey,
    initialValues: speakerSurvey,
    onSubmit: () => store.dispatch({ type: '@@ui/SAVE_SPEAKER_SURVEY', payload: { eventId, uid } }),
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_SURVEY', payload: { eventId, uid } }),
  }
}

export default compose(
  inject(mapState), //
  loader(), //
  reduxForm(), //
)(SurveyForm)
