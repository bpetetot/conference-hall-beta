import { setupDatabase } from '../../tests/helpers/setup-services'
import { buildUser } from '../../tests/builder/user'
import { buildTalk } from '../../tests/builder/talk'
import { getTalk, findUserTalks, createTalk, updateTalk, deleteTalk } from './talks.repository'
import { prisma } from './db'
import { buildEvent } from '../../tests/builder/event'
import { buildProposal } from '../../tests/builder/proposal'

describe('Talks repository', () => {
  setupDatabase()

  describe('#getTalk', () => {
    test('should return the talk for the given id', async () => {
      // given
      const user = await buildUser()
      const talk = await buildTalk(user)
      // when
      const result = await getTalk(talk.id)
      //then
      expect(result?.id).toEqual(talk.id)
      expect(result?.title).toEqual(talk.title)
      expect(result?.speakers).toBeUndefined()
      expect(result?.proposals).toBeUndefined()
    })

    test('should return the talk and speakers for the given id', async () => {
      // given
      const user = await buildUser()
      const talk = await buildTalk(user)
      // when
      const result = await getTalk(talk.id, { withSpeakers: true })
      //then
      expect(result?.id).toEqual(talk.id)
      expect(result?.title).toEqual(talk.title)
      expect(result?.speakers).toEqual([user])
    })

    test('should return the talk and proposals for the given id', async () => {
      // given
      const user = await buildUser()
      const talk = await buildTalk(user)
      const event = await buildEvent(user)
      const proposal = await buildProposal(event.id, talk)
      // when
      const result = await getTalk(talk.id, { withProposals: true })
      //then
      expect(result?.id).toEqual(talk.id)
      expect(result?.title).toEqual(talk.title)
      expect(result?.proposals[0].id).toEqual(proposal.id)
    })
  })

  describe('#findUserTalks', () => {
    test('should return the users talks for given uid', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1' })
      const user2 = await buildUser({ uid: 'user2' })
      await buildTalk(user1, { title: 'talk1' })
      await buildTalk(user2, { title: 'talk2' })
      // when
      const talks = await findUserTalks(user1.uid)
      //then
      expect(talks.length).toBe(1)
      expect(talks[0].title).toEqual('talk1')
    })
  })

  describe('#createTalk', () => {
    test('should create a talk for the given user', async () => {
      // given
      const user = await buildUser()
      // when
      const talk = await createTalk(user.id, {
        title: 'title1',
        abstract: 'abstract1',
      })
      //then
      const result = await prisma.talk.findUnique({
        where: { id: talk.id },
        include: { speakers: true },
      })
      expect(result?.title).toEqual('title1')
      expect(result?.abstract).toEqual('abstract1')
      expect(result?.ownerId).toEqual(user.id)
      expect(result?.speakers[0].uid).toEqual(user.uid)
    })
  })

  describe('#updateTalk', () => {
    test('should update the talk', async () => {
      // given
      const user = await buildUser()
      const talk = await buildTalk(user)
      // when
      await updateTalk(talk.id, {
        title: 'updated-title',
        abstract: 'updated-abstract',
      })
      //then
      const result = await prisma.talk.findUnique({ where: { id: talk.id } })
      expect(result?.title).toEqual('updated-title')
      expect(result?.abstract).toEqual('updated-abstract')
    })
  })

  describe('#deleteTalk', () => {
    test('should delete the talk', async () => {
      // given
      const user = await buildUser()
      const talk = await buildTalk(user)
      // when
      await deleteTalk(talk.id)
      //then
      const result = await prisma.talk.findUnique({
        where: { id: talk.id },
      })
      expect(result).toBeNull()
    })
  })
})
