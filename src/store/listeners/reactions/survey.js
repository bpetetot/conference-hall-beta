import { getSurvey, saveSurvey } from 'firebase/survey'

export const fetch = async (action, store) => {
  const { eventId, uid } = action.payload
  const ref = await getSurvey(eventId, uid)
  if (ref.exists) {
    store.data.surveys.addOrUpdate(ref.data())
  }
}

export const save = async (action, store) => {
  const { eventId, uid, data } = action.payload

  store.ui.loaders.update({ isSurveySaving: true })
  await saveSurvey(eventId, uid, data)
  store.ui.loaders.update({ isSurveySaving: false })

  store.data.surveys.addOrUpdate({ uid, ...data })
}
