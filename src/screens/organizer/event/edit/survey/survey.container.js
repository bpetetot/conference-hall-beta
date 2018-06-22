import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import SurveyForm from './survey'

const mapStore = (store, { eventId }) => {
  const { surveyActive, survey } = store.data.events.get(eventId) || {}
  return {
    surveyActive,
    survey,
    onActiveSurvey: e =>
      store.dispatch({
        type: '@@ui/ON_TOGGLE_EVENT_SURVEY',
        payload: {
          event: {
            id: eventId,
            surveyActive: e.target.checked,
          },
        },
      }),
    onSelectQuestion: e =>
      store.dispatch({
        type: '@@ui/ON_SELECT_SURVEY_QUESTION',
        payload: {
          event: {
            id: eventId,
            survey: {
              ...survey,
              [e.target.name]: e.target.checked,
            },
          },
        },
      }),
  }
}

export default compose(forRoute.absolute('EDIT_EVENT_SURVEY'), inject(mapStore))(SurveyForm)
