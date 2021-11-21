import { setupServer } from './helpers/setup-services'
import { getAuthUser } from './helpers/firebase-auth'
import { buildUser } from './builder/user'
import { buildCategory, buildEvent, buildFormat } from './builder/event'
import { buildOrganization, buildOrganizationMember } from './builder/organization'
import { buildTalk } from './builder/talk'
import { buildProposal } from './builder/proposal'
import { MessageChannel, OrganizationRole, RatingFeeling } from '@prisma/client'
import { prisma } from '../src/db/db'
import { buildRating } from './builder/rating'
import { buildMessage } from './builder/message'
import { buildSurvey } from './builder/survey'

jest.mock('../src/emails/email.services', () => ({
  sendProposalsDeliberationEmails: jest.fn(),
}))

describe('/api/organizer/events/:id/proposals', () => {
  const getAgent = setupServer()

  describe('GET /api/organizer/events/:id/proposals', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.get('/api/organizer/events/1/proposals')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return proposals of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      await buildRating(user.id, proposal.id, 1, RatingFeeling.NEUTRAL)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body.total).toEqual(1)
      expect(res.body.totalRated).toEqual(1)
      expect(res.body.proposals).toEqual([
        {
          id: proposal.id,
          title: proposal.title,
          abstract: proposal.abstract,
          languages: proposal.languages,
          level: proposal.level,
          references: proposal.references,
          comments: proposal.comments,
          status: 'SUBMITTED',
          emailStatus: null,
          speakerNotified: false,
          formats: [],
          categories: [],
          ratings: [
            {
              feeling: 'NEUTRAL',
              rating: 1,
              userId: user.id,
              userName: user.name,
              userPhotoURL: user.photoURL,
            },
          ],
          ratingStats: {
            average: 1,
            count: 1,
            negatives: 0,
            positives: 0,
            noopinion: 0,
          },
          userRating: {
            feeling: 'NEUTRAL',
            rating: 1,
            userId: user.id,
            userName: user.name,
            userPhotoURL: user.photoURL,
          },
          createdAt: proposal.createdAt.toISOString(),
          speakers: [
            {
              id: user.id,
              name: user.name,
              photoURL: user.photoURL,
              address: user.address,
              bio: user.bio,
              company: user.company,
              email: user.email,
              github: user.github,
              references: user.references,
              twitter: user.twitter,
            },
          ],
        },
      ])
    })

    test('should return partial proposals following the event settings', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user, {
        displayOrganizersRatings: false,
        displayProposalsSpeakers: false,
        displayProposalsRatings: false,
      })
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      await buildRating(user.id, proposal.id, 1, RatingFeeling.NEUTRAL)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body.total).toEqual(1)
      expect(res.body.totalRated).toEqual(1)
      expect(res.body.proposals).toEqual([
        {
          id: proposal.id,
          title: proposal.title,
          abstract: proposal.abstract,
          languages: proposal.languages,
          level: proposal.level,
          references: proposal.references,
          comments: proposal.comments,
          status: 'SUBMITTED',
          emailStatus: null,
          speakerNotified: false,
          formats: [],
          categories: [],
          userRating: {
            feeling: 'NEUTRAL',
            rating: 1,
            userId: user.id,
            userName: user.name,
            userPhotoURL: user.photoURL,
          },
          createdAt: proposal.createdAt.toISOString(),
        },
      ])
    })
  })

  describe('GET /api/organizer/events/:id/proposals/ids', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.get('/api/organizer/events/1/proposals/ids')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/ids`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/ids`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return proposal ids of the search', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      await buildRating(user.id, proposal.id, 1, RatingFeeling.NEUTRAL)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/ids`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual([proposal.id])
    })
  })

  describe('GET /api/organizer/events/:id/proposals/:id', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.get('/api/organizer/events/1/proposals/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 404 proposal not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/1`)

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Proposal not found')
    })

    test('should return proposals of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      await buildRating(user.id, proposal.id, 1, RatingFeeling.NEUTRAL)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/${proposal.id}`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        id: proposal.id,
        title: proposal.title,
        abstract: proposal.abstract,
        languages: proposal.languages,
        level: proposal.level,
        references: proposal.references,
        comments: proposal.comments,
        status: 'SUBMITTED',
        emailStatus: null,
        speakerNotified: false,
        formats: [],
        categories: [],
        messageCount: 0,
        ratings: [
          {
            feeling: 'NEUTRAL',
            rating: 1,
            userId: user.id,
            userName: user.name,
            userPhotoURL: user.photoURL,
          },
        ],
        ratingStats: {
          average: 1,
          count: 1,
          negatives: 0,
          positives: 0,
          noopinion: 0,
        },
        userRating: {
          feeling: 'NEUTRAL',
          rating: 1,
          userId: user.id,
          userName: user.name,
          userPhotoURL: user.photoURL,
        },
        createdAt: proposal.createdAt.toISOString(),
        speakers: [
          {
            id: user.id,
            name: user.name,
            photoURL: user.photoURL,
            address: user.address,
            bio: user.bio,
            company: user.company,
            email: user.email,
            github: user.github,
            references: user.references,
            twitter: user.twitter,
          },
        ],
      })
    })
  })

  describe('PUT /api/organizer/events/:id/proposals/export', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.put('/api/organizer/events/1/proposals/export')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/export`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/export`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user is reviewer', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.REVIEWER)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/export`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should stream the JSON export of event proposals', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const survey = await buildSurvey(user.id, event.id, { response: 'ko' })
      const proposal = await buildProposal(event.id, talk)

      // when
      const res = await agent
        .put(`/api/organizer/events/${event.id}/proposals/export?format=json`)
        .parse((res, callback) => {
          let data = ''
          res.on('data', (chunk) => (data += chunk))
          res.on('end', () => {
            callback(null, JSON.parse(data))
          })
        })

      expect(res.status).toEqual(200)
      expect(res.body[0]).toEqual({
        id: proposal.id,
        title: proposal.title,
        abstract: proposal.abstract,
        comments: proposal.comments,
        level: proposal.level,
        references: proposal.references,
        languages: proposal.languages,
        status: proposal.status,
        createdAt: proposal.createdAt.toISOString(),
        categories: [],
        formats: [],
        ratingStats: { average: 0, count: 0, negatives: 0, noopinion: 0, positives: 0 },
        speakers: [
          {
            id: user.id,
            name: user.name,
            bio: user.bio,
            address: user.address,
            company: user.company,
            email: user.email,
            github: user.github,
            twitter: user.twitter,
            photoURL: user.photoURL,
            references: user.references,
            survey: survey.answers,
          },
        ],
      })
    })

    test('should stream the HTML export of event proposals', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      await buildProposal(event.id, talk)

      // when
      const res = await agent
        .put(`/api/organizer/events/${event.id}/proposals/export?format=html`)
        .parse((res, callback) => {
          let data = ''
          res.on('data', (chunk) => (data += chunk))
          res.on('end', () => {
            callback(null, data)
          })
        })

      expect(res.status).toEqual(200)
      expect(res.body).toContain('<html>')
    })
  })

  describe('PUT /api/organizer/events/:id/proposals/sendEmails', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.put('/api/organizer/events/1/proposals/sendEmails')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/sendEmails`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/sendEmails`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user is reviewer', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.REVIEWER)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/sendEmails`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should update the proposals when deliberation emails sent', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/sendEmails`)

      // then
      expect(res.status).toEqual(204)
      const result = await prisma.proposal.findUnique({ where: { id: proposal.id } })
      expect(result?.emailStatus).toEqual('SENT')
      expect(result?.speakerNotified).toEqual(true)
    })
  })

  describe('PATCH /api/organizer/events/:id/proposals', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.patch('/api/organizer/events/1/proposals').send({
        filters: {},
        data: { status: 'ACCEPTED' },
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/proposals`).send({
        filters: {},
        data: { status: 'ACCEPTED' },
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/proposals`).send({
        filters: {},
        data: { status: 'ACCEPTED' },
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user is reviewer', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.REVIEWER)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/proposals`).send({
        filters: {},
        data: { status: 'ACCEPTED' },
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should update event proposals', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      await buildProposal(event.id, talk)

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/proposals`).send({
        filters: {},
        data: { status: 'ACCEPTED' },
      })

      // then
      expect(res.status).toEqual(204)
    })
  })

  describe('PATCH /api/organizer/events/:id/proposals/:id', () => {
    test('should return 401 if user not authenticated', async () => {
      // when
      const agent = await getAgent()
      const res = await agent.patch('/api/organizer/events/1/proposals/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.patch('/api/organizer/events/1/proposals/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/proposals/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/proposals/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user is reviewer', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.REVIEWER)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.patch(`/api/organizer/events/${event.id}/proposals/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should update the proposal', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const format1 = await buildFormat(event.id)
      const format2 = await buildFormat(event.id)
      const category1 = await buildCategory(event.id)
      const category2 = await buildCategory(event.id)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk, {
        formats: { connect: [{ id: format1.id }] },
        categories: { connect: [{ id: category1.id }] },
      })

      // when
      const res = await agent
        .patch(`/api/organizer/events/${event.id}/proposals/${proposal.id}`)
        .send({
          title: 'title-updated',
          abstract: 'abstract-updated',
          formats: [format2.id],
          categories: [category2.id],
        })

      // then
      expect(res.status).toEqual(204)
    })
  })

  describe('PUT /api/organizer/events/:id/proposals/:id/rate', () => {
    test('should return 401 if user not authenticated', async () => {
      // when
      const agent = await getAgent()
      const res = await agent.put('/api/organizer/events/1/proposals/1/rate')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.put('/api/organizer/events/1/proposals/1/rate').send({
        rating: 1,
        feeling: RatingFeeling.NEUTRAL,
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/1/rate`).send({
        rating: 1,
        feeling: RatingFeeling.NEUTRAL,
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/1/rate`).send({
        rating: 1,
        feeling: RatingFeeling.NEUTRAL,
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 400 if rating value is not valid', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)

      // when
      const res = await agent.put(`/api/organizer/events/${event.id}/proposals/1/rate`).send({
        feeling: 'BAD_FEELING',
      })

      // then
      expect(res.status).toEqual(400)
    })

    test('should rate the proposal for the user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)

      // when
      const res = await agent
        .put(`/api/organizer/events/${event.id}/proposals/${proposal.id}/rate`)
        .send({
          rating: 3,
          feeling: RatingFeeling.NEUTRAL,
        })

      // then
      const result = await prisma.proposal.findUnique({
        where: { id: proposal.id },
        include: { ratings: true },
      })
      expect(res.status).toEqual(204)
      expect(result?.ratings[0].rating).toEqual(3)
      expect(result?.ratings[0].feeling).toEqual('NEUTRAL')
      expect(result?.avgRateForSort).toEqual(3)
    })

    test('should delete the proposal rating for the user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      await buildRating(user.id, proposal.id, 1, RatingFeeling.NEUTRAL)

      // when
      const res = await agent
        .put(`/api/organizer/events/${event.id}/proposals/${proposal.id}/rate`)
        .send({ rating: null, feeling: null })

      // then
      const result = await prisma.proposal.findUnique({
        where: { id: proposal.id },
        include: { ratings: true },
      })
      expect(res.status).toEqual(204)
      expect(result?.ratings).toEqual([])
      expect(result?.avgRateForSort).toEqual(0)
    })
  })

  describe('GET /api/organizer/events/:id/proposals/:id/messages', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.get('/api/organizer/events/1/proposals/1/messages')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/1/messages`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.get(`/api/organizer/events/${event.id}/proposals/1/messages`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return messages of a proposal', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const message1 = await buildMessage(
        user.id,
        proposal.id,
        'Hello world',
        MessageChannel.ORGANIZER,
      )
      const message2 = await buildMessage(
        user.id,
        proposal.id,
        'How are you ?',
        MessageChannel.ORGANIZER,
      )

      // when
      const res = await agent.get(
        `/api/organizer/events/${event.id}/proposals/${proposal.id}/messages`,
      )

      // then
      expect(res.status).toEqual(200)
      expect(res.body.length).toEqual(2)
      expect(res.body).toEqual([
        {
          id: message1.id,
          message: message1.message,
          createdAt: message1.createdAt.toISOString(),
          updatedAt: message1.updatedAt.toISOString(),
          name: user.name,
          photoURL: user.photoURL,
          me: true,
        },
        {
          id: message2.id,
          message: message2.message,
          createdAt: message2.createdAt.toISOString(),
          updatedAt: message2.updatedAt.toISOString(),
          name: user.name,
          photoURL: user.photoURL,
          me: true,
        },
      ])
    })
  })

  describe('POST /api/organizer/events/:id/proposals/:id/messages', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.post('/api/organizer/events/1/proposals/1/messages').send({
        message: 'Hello world',
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.post(`/api/organizer/events/${event.id}/proposals/1/messages`).send({
        message: 'Hello world',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.post(`/api/organizer/events/${event.id}/proposals/1/messages`).send({
        message: 'Hello world',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 400 if no message given', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.post(`/api/organizer/events/${event.id}/proposals/1/messages`).send()

      // then
      expect(res.status).toEqual(400)
    })

    test('should post a message to the proposal', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)

      // when
      const res = await agent
        .post(`/api/organizer/events/${event.id}/proposals/${proposal.id}/messages`)
        .send({
          message: 'Hello world',
        })

      // then
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('Hello world')
    })
  })

  describe('PATCH /api/organizer/events/:id/proposals/:id/messages/:id', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.patch('/api/organizer/events/1/proposals/1/messages/1').send({
        message: 'Hello world',
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent
        .patch(`/api/organizer/events/${event.id}/proposals/1/messages/1`)
        .send({
          message: 'Hello world',
        })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent
        .patch(`/api/organizer/events/${event.id}/proposals/1/messages/1`)
        .send({
          message: 'Hello world',
        })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 400 if no message given', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent
        .patch(`/api/organizer/events/${event.id}/proposals/1/messages/1`)
        .send()

      // then
      expect(res.status).toEqual(400)
    })

    test('should return 404 if message not found or doesnt belong to user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const message = await buildMessage(
        user2.id,
        proposal.id,
        'Hello world',
        MessageChannel.ORGANIZER,
      )

      // when
      const res = await agent
        .patch(`/api/organizer/events/${event.id}/proposals/1/messages/${message.id}`)
        .send({
          message: 'Goodbye world',
        })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Message not found')
    })

    test('should update a message on the proposals', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const message = await buildMessage(
        user.id,
        proposal.id,
        'Hello world',
        MessageChannel.ORGANIZER,
      )

      // when
      const res = await agent
        .patch(`/api/organizer/events/${event.id}/proposals/${proposal.id}/messages/${message.id}`)
        .send({
          message: 'Goodbye world',
        })

      // then
      const result = await prisma.message.findUnique({ where: { id: message.id } })
      expect(res.status).toEqual(204)
      expect(result?.message).toEqual('Goodbye world')
    })
  })

  describe('DELETE /api/organizer/events/:id/proposals/:id/messages/:id', () => {
    test('should return 404 if user not found', async () => {
      // when
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const res = await agent.delete('/api/organizer/events/1/proposals/1/messages/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not the owner of the event', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user2)

      // when
      const res = await agent.delete(`/api/organizer/events/${event.id}/proposals/1/messages/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 403 if event linked to an organization which user not member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user2, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })

      // when
      const res = await agent.delete(`/api/organizer/events/${event.id}/proposals/1/messages/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 404 if message not found or doesnt belong to user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const user2 = await buildUser({ uid: 'other' })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const message = await buildMessage(
        user2.id,
        proposal.id,
        'Hello world',
        MessageChannel.ORGANIZER,
      )

      // when
      const res = await agent.delete(
        `/api/organizer/events/${event.id}/proposals/1/messages/${message.id}`,
      )

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Message not found')
    })

    test('should delete the message', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const message = await buildMessage(
        user.id,
        proposal.id,
        'Hello world',
        MessageChannel.ORGANIZER,
      )

      // when
      const res = await agent.delete(
        `/api/organizer/events/${event.id}/proposals/${proposal.id}/messages/${message.id}`,
      )

      // then
      const result = await prisma.message.findUnique({ where: { id: message.id } })
      expect(res.status).toEqual(204)
      expect(result).toBeNull()
    })
  })
})
