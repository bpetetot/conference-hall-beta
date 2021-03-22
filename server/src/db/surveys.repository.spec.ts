import { setupDatabase } from '../../tests/helpers/setup-services'
import { buildUser } from '../../tests/builder/user'
import { getEventSurveyForUser, saveEventSurveyForUser } from './surveys.repository'
import { buildEvent } from '../../tests/builder/event'
import { buildSurvey } from '../../tests/builder/survey'

describe('Surveys repository', () => {
  setupDatabase()

  describe('#getEventSurveyForUser', () => {
    test('should return the event survey of the user', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const survey = await buildSurvey(user.id, event.id, { accomodation: 'yes' })
      // when
      const result = await getEventSurveyForUser(event.id, user.id)
      //then
      expect(result?.id).toEqual(survey.id)
      expect(result?.answers).toEqual({ accomodation: 'yes' })
    })
  })

  describe('#saveEventSurveyForUser', () => {
    test('should create the event survey for the user', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      // when
      const survey = await saveEventSurveyForUser(event.id, user.id, { accomodation: 'yes' })
      //then
      expect(survey?.answers).toEqual({ accomodation: 'yes' })
    })

    test('should update the event survey for the user', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      await buildSurvey(user.id, event.id, { accomodation: 'yes' })
      // when
      const result = await saveEventSurveyForUser(event.id, user.id, { accomodation: 'no' })
      //then
      expect(result?.answers).toEqual({ accomodation: 'no' })
    })
  })
})
