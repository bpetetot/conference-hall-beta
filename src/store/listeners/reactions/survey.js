import { getSurvey, saveSurvey } from 'firebase/survey'

export const fetch = async (action, store) => {
  const { eventId, uid } = action.payload
  const ref = await getSurvey(eventId, uid)
  if (ref.exists) {
    store.data.surveys.addOrUpdate(ref.data())
  }
}

export const save = async (action, store, { form }) => {
  const { eventId, uid } = action.payload
  const surveyForm = form(`speaker-survey-${uid}`)
  const survey = surveyForm.getFormValues()
  surveyForm.asyncSubmit(saveSurvey, eventId, uid, survey)
  store.data.surveys.addOrUpdate({ uid, ...survey })
}
