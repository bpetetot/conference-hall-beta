import { setupServer } from './helpers/setup-services'
import { getAuthUser } from './helpers/firebase-auth'
import { buildUser } from './builder/user'
import { buildCategory, buildEvent, buildFormat } from './builder/event'
import { buildOrganization, buildOrganizationMember } from './builder/organization'
import { OrganizationRole } from '@prisma/client'
import { prisma } from '../src/db/db'
import { buildSurvey } from './builder/survey'

describe('/api/organizer/events', () => {
  const getAgent = setupServer()

  describe('GET /api/organizer/events/:id', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.get('/api/organizer/events/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return the event if belongs to the user', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        id: event.id,
        name: event.name,
        description: event.description,
        type: event.type,
        visibility: event.visibility,
        creatorId: user.id,
        organizationId: null,
        address: event.address,
        timezone: event.timezone,
        archived: false,
        website: event.website,
        maxProposals: null,
        bannerUrl: event.bannerUrl,
        cfpEnd: null,
        cfpStart: null,
        conferenceEnd: null,
        conferenceStart: null,
        contact: event.contact,
        deliberationEnabled: false,
        displayOrganizersRatings: true,
        displayProposalsRatings: true,
        displayProposalsSpeakers: true,
        formatsRequired: false,
        categoriesRequired: false,
        formats: [],
        categories: [],
        emailNotifications: null,
        emailOrganizer: null,
        slackWebhookUrl: null,
        slackNotifications: null,
        surveyEnabled: false,
        surveyQuestions: null,
        apiKey: null,
        isCfpFinished: false,
        isCfpOpened: false,
      })
    })
  })

  describe('GET /api/organizer/events', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/organizer/events')

      // then
      expect(res.status).toEqual(401)
    })

    test('should list all events of authenticated organizer', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.get('/api/organizer/events')

      // then
      expect(res.status).toEqual(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0]).toEqual({
        id: event.id,
        name: event.name,
        description: event.description,
        type: event.type,
        visibility: event.visibility,
        creatorId: user.id,
        organizationId: null,
        address: event.address,
        timezone: event.timezone,
        archived: false,
        website: event.website,
        maxProposals: null,
        bannerUrl: event.bannerUrl,
        categoriesRequired: false,
        formatsRequired: false,
        cfpEnd: null,
        cfpStart: null,
        conferenceEnd: null,
        conferenceStart: null,
        contact: event.contact,
        deliberationEnabled: false,
        displayOrganizersRatings: true,
        displayProposalsRatings: true,
        displayProposalsSpeakers: true,
        emailNotifications: null,
        emailOrganizer: null,
        slackWebhookUrl: null,
        slackNotifications: null,
        surveyEnabled: false,
        surveyQuestions: null,
        apiKey: null,
        isCfpFinished: false,
        isCfpOpened: false,
      })
    })
  })

  describe('POST /api/organizer/events', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/organizer/events')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.post('/api/organizer/events').send({
        name: 'event1',
        description: 'description1',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
      })

      // then
      expect(res.status).toEqual(404)
    })

    test('should return 400 if event data are not valid', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.post('/api/organizer/events').send({ name: 'name1' })

      // then
      expect(res.status).toEqual(400)
    })

    test('should create an event for the authenticated user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.post('/api/organizer/events').send({
        name: 'event1',
        description: 'description1',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
      })

      // then
      expect(res.status).toEqual(200)
      expect(res.body.name).toEqual('event1')
      expect(res.body.description).toEqual('description1')
    })

    test('should return a 403 if event is linked to an organization which user is not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const orga = await buildOrganization()

      // when
      const res = await agent.post('/api/organizer/events').send({
        name: 'event1',
        description: 'description1',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
        organizationId: orga.id,
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should create an event and link it to an organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.OWNER)

      // when
      const res = await agent.post('/api/organizer/events').send({
        name: 'event1',
        description: 'description1',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
        organizationId: orga.id,
      })

      // then
      expect(res.status).toEqual(200)
      expect(res.body.name).toEqual('event1')
      expect(res.body.description).toEqual('description1')
      expect(res.body.organizationId).toEqual(orga.id)
    })
  })

  describe('PATCH /api/organizer/events/:eventId', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/organizer/events/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.patch('/api/organizer/events/1').send({
        name: 'event1',
      })

      // then
      expect(res.status).toEqual(404)
    })

    test('should return 400 if event data are not valid', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.patch('/api/organizer/events/1').send({ contact: 'name1' })

      // then
      expect(res.status).toEqual(400)
    })

    test('should return a 403 if event is linked to an organization which user is not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const orga = await buildOrganization()
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}`).send({
        name: 'event1',
        description: 'description1',
        visibility: 'PUBLIC',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return a 403 if not owner or member of the event organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.REVIEWER)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}`).send({
        name: 'event1',
        description: 'description1',
        visibility: 'PUBLIC',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return a 403 if user is not owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const event = await buildEvent()

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}`).send({
        name: 'event1',
        description: 'description1',
        visibility: 'PUBLIC',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should update the event if user belongs to orga as owner', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      const orga2 = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.OWNER)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}`).send({
        name: 'event1',
        description: 'description1',
        organizationId: orga2.id,
      })

      // then
      const result = await prisma.event.findUnique({ where: { id: event.id } })
      expect(res.status).toEqual(204)
      expect(result?.name).toEqual('event1')
      expect(result?.description).toEqual('description1')
      expect(result?.organizationId).toEqual(orga2.id)
    })

    test('should update the event if user belongs to orga as member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.MEMBER)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}`).send({
        name: 'event1',
        description: 'description1',
      })

      // then
      const result = await prisma.event.findUnique({ where: { id: event.id } })
      expect(res.status).toEqual(204)
      expect(result?.name).toEqual('event1')
      expect(result?.description).toEqual('description1')
    })

    test('should update the event if the user is the talk owner', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}`).send({
        name: 'event1',
        description: 'description1',
      })

      // then
      const result = await prisma.event.findUnique({ where: { id: event.id } })
      expect(res.status).toEqual(204)
      expect(result?.name).toEqual('event1')
      expect(result?.description).toEqual('description1')
    })
  })

  describe('POST /api/organizer/events/:id/formats', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/organizer/events/1/formats')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return a 403 if user is not owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const event = await buildEvent()

      // when
      const res = await agent.post(`/api/organizer/events/${event.id}/formats`).send({
        name: 'format1',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should add the format', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.post(`/api/organizer/events/${event.id}/formats`).send({
        name: 'format1',
      })

      // then
      expect(res.status).toEqual(200)
    })
  })

  describe('POST /api/organizer/events/:id/categories', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/organizer/events/1/categories')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return a 403 if user is not owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const event = await buildEvent()

      // when
      const res = await agent.post(`/api/organizer/events/${event.id}/categories`).send({
        name: 'category1',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should add the category', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.post(`/api/organizer/events/${event.id}/categories`).send({
        name: 'category1',
      })

      // then
      expect(res.status).toEqual(200)
    })
  })

  describe('PATCH /api/organizer/events/:id/formats/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/organizer/events/1/formats/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return a 403 if user is not owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const event = await buildEvent()

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/formats/1`).send({
        name: 'format1',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should update the format', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const format = await buildFormat(event.id)

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/formats/${format.id}`).send({
        name: 'format-updated',
      })

      // then
      expect(res.status).toEqual(204)
    })
  })

  describe('PATCH /api/organizer/events/:id/categories/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/organizer/events/1/categories/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return a 403 if user is not owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const event = await buildEvent()

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/categories/1`).send({
        name: 'category1',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should update the category', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const category = await buildCategory(event.id)

      // when
      const res = await agent
        .patch(`/api/organizer/events/${event.id}/categories/${category.id}`)
        .send({
          name: 'category-updated',
        })

      // then
      expect(res.status).toEqual(204)
    })
  })

  describe('DELETE /api/organizer/events/:id/formats/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.delete('/api/organizer/events/1/formats/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return a 403 if user is not owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const event = await buildEvent()

      // when
      const res = await agent.delete(`/api/organizer/events/${event.id}/formats/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should delete the format', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const format = await buildFormat(event.id)

      // when
      const res = await agent.delete(`/api/organizer/events/${event.id}/formats/${format.id}`)

      // then
      expect(res.status).toEqual(204)
    })
  })

  describe('DELETE /api/organizer/events/:id/categories/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.delete('/api/organizer/events/1/categories/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return a 403 if user is not owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const event = await buildEvent()

      // when
      const res = await agent.delete(`/api/organizer/events/${event.id}/categories/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should delete the category', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const category = await buildCategory(event.id)

      // when
      const res = await agent.delete(`/api/organizer/events/${event.id}/categories/${category.id}`)

      // then
      expect(res.status).toEqual(204)
    })
  })

  describe('GET /api/organizer/events/:id/speakers/:id/survey', () => {
    test('should return 401 if user not authenticated', async () => {
      // when
      const agent = await getAgent()
      const res = await agent.get('/api/organizer/events/1/speakers/1/survey')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.get('/api/organizer/events/1/speakers/1/survey')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/speakers/1/survey`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/speakers/1/survey`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if survey not enabled on the event', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user, { surveyEnabled: false })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/speakers/1/survey`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if speakers are hidden on the event', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user, { displayProposalsSpeakers: false })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/speakers/1/survey`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return the speaker survey for the event', async () => {
      // when
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user, { surveyEnabled: true })
      const speaker = await buildUser()
      await buildSurvey(speaker.id, event.id, { accomodation: 'yes' })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/speakers/${speaker.id}/survey`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        answers: { accomodation: 'yes' },
      })
    })
  })
})
