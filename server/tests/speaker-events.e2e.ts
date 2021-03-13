import { getAgent } from './helpers/setup-tests'
import { getAuthUser } from './helpers/firebase-auth'
import { buildUser } from './builder/user'
import { buildEvent } from './builder/event'
import { EventVisibility } from '@prisma/client'
import { buildSurvey } from './builder/survey'
import { buildProposal } from './builder/proposal'
import { buildTalk } from './builder/talk'

describe('/api/speaker/events', () => {
  describe('GET /api/speaker/events', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/speaker/events')

      // then
      expect(res.status).toEqual(401)
    })

    test('should search events available', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user, {
        visibility: EventVisibility.PUBLIC,
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })

      // when
      const res = await agent.get('/api/speaker/events')

      // then
      expect(res.status).toEqual(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0]).toEqual({
        id: event.id,
        name: event.name,
        description: event.description,
        type: 'MEETUP',
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
        cfpStart: event.cfpStart?.toISOString(),
        isCfpFinished: false,
        isCfpOpened: true,
        surveyEnabled: false,
        surveyQuestions: null,
      })
    })
  })

  describe('GET /api/speaker/events/:id/proposals', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/speaker/events/1/proposals')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return the user proposals for the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      await buildProposal(event.id, talk, { title: 'my proposal' })

      // when
      const res = await agent.get(`/api/speaker/events/${event.id}/proposals`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body.length).toEqual(1)
      expect(res.body[0].title).toEqual('my proposal')
    })
  })

  describe('GET /api/speaker/events/:id/survey', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/speaker/events/1/survey')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return the survey', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const survey = await buildSurvey(user.id, event.id, {})

      // when
      const res = await agent.get(`/api/speaker/events/${event.id}/survey`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({ answers: survey.answers })
    })
  })

  describe('POST /api/speaker/events/:id/survey', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/speaker/events/1/survey')

      // then
      expect(res.status).toEqual(401)
    })

    test('should save the survey', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.post(`/api/speaker/events/${event.id}/survey`).send({
        answers: {},
      })

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({ answers: {} })
    })
  })
})
