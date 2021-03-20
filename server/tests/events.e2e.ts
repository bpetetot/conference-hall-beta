import { setupServer } from './helpers/setup-test'
import { buildEvent } from './builder/event'

describe('/api/events', () => {
  const getAgent = setupServer()

  describe('GET /api/events/:id', () => {
    test('should return 404 if event not found', async () => {
      // when
      const agent = await getAgent()
      const res = await agent.get('/api/events/1')

      // then
      expect(res.status).toEqual(404)
    })

    test('should return the event', async () => {
      // given
      const event = await buildEvent()

      // when
      const agent = await getAgent()
      const res = await agent.get(`/api/events/${event.id}`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        id: event.id,
        name: event.name,
        description: event.description,
        type: 'CONFERENCE',
        address: event.address,
        timezone: event.timezone,
        conferenceStart: null,
        conferenceEnd: null,
        contact: event.contact,
        website: event.website,
        maxProposals: null,
        bannerUrl: event.bannerUrl,
        categoriesRequired: false,
        formatsRequired: false,
        cfpEnd: null,
        cfpStart: null,
        isCfpFinished: false,
        isCfpOpened: false,
        surveyEnabled: false,
        surveyQuestions: null,
        categories: [],
        formats: [],
      })
    })
  })
})
