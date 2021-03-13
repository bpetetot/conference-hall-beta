import { getAgent } from './helpers/setup-tests'
import { getAuthUser } from './helpers/firebase-auth'
import { buildUser } from './builder/user'
import { buildTalk } from './builder/talk'
import { prisma } from '../src/db/db'
import { buildCategory, buildEvent, buildFormat } from './builder/event'
import { buildProposal } from './builder/proposal'

describe('/api/speaker/talks', () => {
  describe('GET /api/speaker/talks', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/speaker/talks')

      // then
      expect(res.status).toEqual(401)
    })

    test('should list all talks of authenticated user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)

      // when
      const res = await agent.get('/api/speaker/talks')

      // then
      expect(res.status).toEqual(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0]).toEqual({
        id: talk.id,
        title: talk.title,
        abstract: talk.abstract,
        level: talk.level,
        language: talk.language,
        references: talk.references,
        ownerId: user.id,
        archived: false,
        updatedAt: talk.updatedAt.toISOString(),
        createdAt: talk.createdAt.toISOString(),
        speakers: [
          {
            id: user.id,
            name: user.name,
            photoURL: user.photoURL,
          },
        ],
        proposals: [],
      })
    })
  })

  describe('POST /api/speaker/talks', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/speaker/talks')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.post('/api/speaker/talks').send({
        title: 'talk1',
        abstract: 'abstract1',
      })

      // then
      expect(res.status).toEqual(404)
    })

    test('should return 400 if talk data are not valid', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.post('/api/speaker/talks').send({ title: 'title1' })

      // then
      expect(res.status).toEqual(400)
    })

    test('should create a talk for the authenticated user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.post('/api/speaker/talks').send({
        title: 'talk1',
        abstract: 'abstract1',
      })

      // then
      expect(res.status).toEqual(200)
      expect(res.body.title).toEqual('talk1')
      expect(res.body.abstract).toEqual('abstract1')
    })
  })

  describe('GET /api/speaker/talks/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/speaker/talks/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if talk not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.get('/api/speaker/talks/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body).toEqual({ message: 'Talk not found' })
    })

    test('should return 403 if talk does not belong to user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const otherUser = await buildUser({ uid: 'other-user' })
      const talk = await buildTalk(otherUser)

      // when
      const res = await agent.get(`/api/speaker/talks/${talk.id}`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should get the talk for the given id', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(user)
      const proposal = await buildProposal(event.id, talk)

      // when
      const res = await agent.get(`/api/speaker/talks/${talk.id}`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        id: talk.id,
        title: talk.title,
        abstract: talk.abstract,
        level: talk.level,
        language: talk.language,
        references: talk.references,
        ownerId: user.id,
        archived: false,
        updatedAt: talk.updatedAt.toISOString(),
        createdAt: talk.createdAt.toISOString(),
        speakers: [
          {
            id: user.id,
            name: user.name,
            photoURL: user.photoURL,
          },
        ],
        proposals: [
          {
            eventId: event.id,
            talkId: talk.id,
            title: proposal.title,
            abstract: proposal.abstract,
            language: proposal.language,
            level: proposal.level,
            references: proposal.references,
            status: 'SUBMITTED',
            createdAt: proposal.createdAt.toISOString(),
            categories: [],
            formats: [],
            comments: proposal.comments,
          },
        ],
      })
    })
  })

  describe('PATCH /api/speaker/talks/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/speaker/talks/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if talk not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.patch('/api/speaker/talks/1').send({
        title: 'talk1',
        abstract: 'abstract1',
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body).toEqual({ message: 'Talk not found' })
    })

    test('should return 403 if talk does not belong to user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const otherUser = await buildUser({ uid: 'other-user' })
      const talk = await buildTalk(otherUser)

      // when
      const res = await agent.patch(`/api/speaker/talks/${talk.id}`).send({
        title: 'talk-updated',
        abstract: 'abstract-updated',
      })

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 400 if talk data are not valid', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)

      // when
      const res = await agent.patch(`/api/speaker/talks/${talk.id}`).send({ foo: 'bar' })

      // then
      expect(res.status).toEqual(400)
    })

    test('should update the talk for the authenticated user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user, { title: 'title1', abstract: 'abstract1' })

      // when
      const res = await agent.patch(`/api/speaker/talks/${talk.id}`).send({
        title: 'talk-updated',
        abstract: 'abstract-updated',
      })

      // then
      const updated = await prisma.talk.findUnique({ where: { id: talk.id } })
      expect(res.status).toEqual(204)
      expect(updated?.title).toEqual('talk-updated')
      expect(updated?.abstract).toEqual('abstract-updated')
    })
  })

  describe('DELETE /api/speaker/talks/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.delete('/api/speaker/talks/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if talk not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.delete('/api/speaker/talks/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Talk not found')
    })

    test('should return 403 if talk does not belong to user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const otherUser = await buildUser({ uid: 'other-user' })
      const talk = await buildTalk(otherUser)

      // when
      const res = await agent.delete(`/api/speaker/talks/${talk.id}`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should delete the talk for the authenticated user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user, { title: 'title1', abstract: 'abstract1' })

      // when
      const res = await agent.delete(`/api/speaker/talks/${talk.id}`)

      // then
      const updated = await prisma.talk.findUnique({ where: { id: talk.id } })
      expect(res.status).toEqual(204)
      expect(updated).toBeNull()
    })
  })

  describe('POST /api/speaker/talks/:id/speakers/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/speaker/talks/1/speakers/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if talk not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.post('/api/speaker/talks/1/speakers/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Talk not found')
    })

    test('should return 404 if added speaker not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)

      // when
      const res = await agent.post(`/api/speaker/talks/${talk.id}/speakers/1`)

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Speaker not found')
    })

    test('should return 403 if talk does not belong to the auth user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const speaker = await buildUser({ uid: 'speaker' })
      const otherUser = await buildUser({ uid: 'other-user' })
      const talk = await buildTalk(otherUser)

      // when
      const res = await agent.post(`/api/speaker/talks/${talk.id}/speakers/${speaker.id}`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 409 if speaker already added to the talk', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const speakerToAdd = await buildUser({ uid: 'speaker' })
      const talk = await buildTalk(user, {}, [speakerToAdd])

      // when
      const res = await agent.post(`/api/speaker/talks/${talk.id}/speakers/${speakerToAdd.id}`)

      // then
      expect(res.status).toEqual(409)
    })

    test('should add the speaker to the talk', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const speakerToAdd = await buildUser({ uid: 'speaker' })

      // when
      const res = await agent.post(`/api/speaker/talks/${talk.id}/speakers/${speakerToAdd.id}`)

      // then
      const updated = await prisma.talk.findUnique({
        where: { id: talk.id },
        include: { speakers: true },
      })
      expect(res.status).toEqual(204)
      expect(updated?.speakers).toEqual([user, speakerToAdd])
    })
  })

  describe('DELETE /api/speaker/talks/:id/speakers/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.delete('/api/speaker/talks/1/speakers/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if talk not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.delete('/api/speaker/talks/1/speakers/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Talk not found')
    })

    test('should return 403 if talk does not belong to the auth user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const speaker = await buildUser({ uid: 'speaker' })
      const otherUser = await buildUser({ uid: 'other-user' })
      const talk = await buildTalk(otherUser)

      // when
      const res = await agent.delete(`/api/speaker/talks/${talk.id}/speakers/${speaker.id}`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 409 if speaker to delete does not belong to the talk', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const speakerToDelete = await buildUser({ uid: 'speaker' })
      const talk = await buildTalk(user)

      // when
      const res = await agent.delete(`/api/speaker/talks/${talk.id}/speakers/${speakerToDelete.id}`)

      // then
      expect(res.status).toEqual(409)
    })

    test('should delete the speaker from the talk', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const speakerToDelete = await buildUser({ uid: 'speaker' })
      const talk = await buildTalk(user, {}, [speakerToDelete])

      // when
      const res = await agent.delete(`/api/speaker/talks/${talk.id}/speakers/${speakerToDelete.id}`)

      // then
      const updated = await prisma.talk.findUnique({
        where: { id: talk.id },
        include: { speakers: true },
      })
      expect(res.status).toEqual(204)
      expect(updated?.speakers).toEqual([user])
    })
  })

  describe('PUT /api/speaker/talks/:id/submit/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.put('/api/speaker/talks/1/submit/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if talk not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      await buildUser({ uid })
      const agent = await getAgent(token)

      // when
      const res = await agent.put('/api/speaker/talks/1/submit/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Talk not found')
    })

    test('should return 403 if talk doesnt belongs to the user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      await buildUser({ uid })
      const agent = await getAgent(token)
      const user2 = await buildUser({ uid: 'user2' })
      const talk = await buildTalk(user2)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/submit/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 404 if event not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/submit/1`)

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Event not found')
    })

    test('should return 403 if CFP event is not opened', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'CONFERENCE',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
        cfpEnd: new Date('2001-02-28T23:59:59.000Z'),
      })

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/submit/${event.id}`)

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('CFP is closed')
    })

    test('should return 400 if formats required and no formats are sent', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
        formatsRequired: true,
      })

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/submit/${event.id}`)

      // then
      expect(res.status).toEqual(400)
      expect(res.body.message).toEqual('Formats are required for the event')
    })

    test('should return 400 if categories required and no categories are sent', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
        categoriesRequired: true,
      })

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/submit/${event.id}`)

      // then
      expect(res.status).toEqual(400)
      expect(res.body.message).toEqual('Categories are required for the event')
    })

    test('should return 403 if event max proposals reached', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
        maxProposals: 1,
      })
      await buildProposal(event.id, talk1)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk2.id}/submit/${event.id}`)

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('Max proposals reached')
    })

    test('should create the proposal', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })
      const format = await buildFormat(event.id)
      const category = await buildCategory(event.id)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/submit/${event.id}`).send({
        comments: 'hello',
        formats: [format.id],
        categories: [category.id],
      })

      // then
      const result = await prisma.proposal.findUnique({
        where: { talkId_eventId: { talkId: talk.id, eventId: event.id } },
        include: { formats: true, categories: true },
      })
      expect(res.status).toEqual(204)
      expect(result?.id).toBeDefined()
      expect(result?.comments).toEqual('hello')
      expect(result?.formats[0].id).toEqual(format.id)
      expect(result?.categories[0].id).toEqual(category.id)
    })

    test('should update the proposal if exists', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user, {
        title: 'title-updated',
        abstract: 'abstract-updated',
      })
      const event = await buildEvent(null, {
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })
      const format = await buildFormat(event.id)
      const category = await buildCategory(event.id)
      await buildProposal(event.id, talk)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/submit/${event.id}`).send({
        comments: 'hello',
        formats: [format.id],
        categories: [category.id],
      })

      // then
      const result = await prisma.proposal.findUnique({
        where: { talkId_eventId: { talkId: talk.id, eventId: event.id } },
        include: { formats: true, categories: true },
      })
      expect(res.status).toEqual(204)
      expect(result?.title).toEqual('title-updated')
      expect(result?.abstract).toEqual('abstract-updated')
      expect(result?.comments).toEqual('hello')
      expect(result?.formats[0].id).toEqual(format.id)
      expect(result?.categories[0].id).toEqual(category.id)
    })
  })

  describe('PUT /api/speaker/talks/:id/unsubmit/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.put('/api/speaker/talks/1/unsubmit/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if talk not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      await buildUser({ uid })
      const agent = await getAgent(token)

      // when
      const res = await agent.put('/api/speaker/talks/1/unsubmit/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Talk not found')
    })

    test('should return 403 if talk doesnt belongs to the user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      await buildUser({ uid })
      const agent = await getAgent(token)
      const user2 = await buildUser({ uid: 'user2' })
      const talk = await buildTalk(user2)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/unsubmit/1`)

      // then
      expect(res.status).toEqual(403)
    })

    test('should return 404 if event not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/unsubmit/1`)

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Event not found')
    })

    test('should return 403 if CFP conference is not opened', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'CONFERENCE',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
        cfpEnd: new Date('2001-02-28T23:59:59.000Z'),
      })

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/unsubmit/${event.id}`)

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('CFP is closed')
    })

    test('should return 404 if proposal not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/unsubmit/${event.id}`)

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('Proposal not found')
    })

    test('should remove the proposal', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const talk = await buildTalk(user)
      const event = await buildEvent(null, {
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })
      const proposal = await buildProposal(event.id, talk)

      // when
      const res = await agent.put(`/api/speaker/talks/${talk.id}/unsubmit/${event.id}`)

      // then
      const result = await prisma.proposal.findUnique({
        where: { id: proposal.id },
      })
      expect(res.status).toEqual(204)
      expect(result).toBe(null)
    })
  })
})
