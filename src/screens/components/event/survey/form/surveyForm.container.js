import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { reduxForm } from 'redux-form'

import SurveyForm from './surveyForm'

const speakerSurveyForm = uid => `speaker-survey-${uid}`

const mapState = (store, { uid }, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const { survey } = store.data.events.get(eventId) || {}
  return {
    form: speakerSurveyForm(uid),
    survey,
  }
}

export default compose(inject(mapState), reduxForm())(SurveyForm)
