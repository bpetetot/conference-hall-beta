import { setupDatabase } from '../../tests/helpers/setup-test'
import { buildUser } from '../../tests/builder/user'
import { buildTalk } from '../../tests/builder/talk'
import {
  createProposal,
  deleteProposal,
  findUserProposalsForEvent,
  getProposalForEvent,
  searchEventProposals,
  streamEventProposals,
  updateEventProposals,
  updateProposal,
} from './proposals.repository'
import { buildCategory, buildEvent, buildFormat } from '../../tests/builder/event'
import { buildProposal } from '../../tests/builder/proposal'
import { prisma } from './db'
import { ProposalStatus, RatingFeeling } from '@prisma/client'
import { buildRating } from '../../tests/builder/rating'

describe('Proposals repository', () => {
  setupDatabase()

  describe('#getProposalForEvent', () => {
    test('should return proposal for the given event Id and talk Id', async () => {
      // given
      const user = await buildUser({ uid: 'user' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent()
      const proposal = await buildProposal(event.id, talk1)
      await buildProposal(event.id, talk2)
      // when
      const result = await getProposalForEvent(talk1.id, event.id)
      //then
      expect(result?.id).toBe(proposal.id)
    })
  })

  describe('#findUserProposalsForEvent', () => {
    test('should return proposals of the user for the given event', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1' })
      const user2 = await buildUser({ uid: 'user2' })
      const talk1 = await buildTalk(user1)
      const talk2 = await buildTalk(user2)
      const event = await buildEvent()
      const proposal = await buildProposal(event.id, talk1)
      await buildProposal(event.id, talk2)
      // when
      const results = await findUserProposalsForEvent(event.id, user1.id)
      //then
      expect(results?.length).toBe(1)
      expect(results?.[0].id).toEqual(proposal.id)
    })
  })

  describe('#createProposal', () => {
    test('should create the proposal', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk = await buildTalk(user)
      const event = await buildEvent()
      // when
      const proposal = await createProposal(talk.id, event.id, {
        title: 'title-new',
        abstract: 'abstract-new',
      })
      //then
      expect(proposal.title).toEqual('title-new')
      expect(proposal.abstract).toEqual('abstract-new')
    })
  })

  describe('#updateProposal', () => {
    test('should update the proposal', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk = await buildTalk(user)
      const event = await buildEvent()
      const proposal = await buildProposal(event.id, talk, {
        title: 'title1',
        abstract: 'abstract1',
      })
      // when
      await updateProposal(proposal.id, {
        title: 'title-new',
        abstract: 'abstract-new',
      })
      //then
      const result = await prisma.proposal.findUnique({ where: { id: proposal.id } })
      expect(result?.title).toEqual('title-new')
      expect(result?.abstract).toEqual('abstract-new')
    })
  })

  describe('#deleteProposal', () => {
    test('should delete the proposal', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk = await buildTalk(user)
      const event = await buildEvent()
      const proposal = await buildProposal(event.id, talk)
      // when
      await deleteProposal(proposal.id)
      //then
      const result = await prisma.proposal.findUnique({ where: { id: proposal.id } })
      expect(result).toBeNull()
    })
  })

  describe('#searchEventProposals', () => {
    test('return event proposals when no results', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      await buildTalk(user)
      await buildTalk(user)
      const talk3 = await buildTalk(user)
      const event1 = await buildEvent(user)
      const event2 = await buildEvent(user)
      await buildProposal(event2.id, talk3)

      // when
      const results = await searchEventProposals(user.id, event1.id)

      // then
      expect(results.total).toBe(0)
      expect(results.pageCount).toBe(0)
      expect(results.pageSize).toBe(20)
      expect(results.previousPage).toBeNull()
      expect(results.nextPage).toBeNull()
      expect(results.proposals).toEqual([])
    })

    test('return event proposals without filters and default sort', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const talk3 = await buildTalk(user)
      const event1 = await buildEvent(user)
      const event2 = await buildEvent(user)
      const proposal1 = await buildProposal(event1.id, talk1, {
        createdAt: new Date('2020-02-20T13:00:00.000Z'),
      })
      const proposal2 = await buildProposal(event1.id, talk2, {
        createdAt: new Date('2020-02-27T13:00:00.000Z'),
      })
      await buildProposal(event2.id, talk3)

      // when
      const results = await searchEventProposals(user.id, event1.id)

      // then
      expect(results.total).toBe(2)
      expect(results.proposals[0].id).toEqual(proposal2.id)
      expect(results.proposals[0].formats).toEqual([])
      expect(results.proposals[0].categories).toEqual([])
      expect(results.proposals[0].speakers).toEqual([user])
      expect(results.proposals[0].ratings).toEqual([])
      expect(results.proposals[1].id).toEqual(proposal1.id)
    })

    test('paginate results', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const talk3 = await buildTalk(user)
      const event = await buildEvent(user)
      await buildProposal(event.id, talk1)
      const proposal = await buildProposal(event.id, talk2)
      await buildProposal(event.id, talk3)

      // when
      const results = await searchEventProposals(user.id, event.id, {}, 'newest', {
        page: 1,
        pageSize: 1,
      })

      // then
      expect(results.total).toBe(3)
      expect(results.pageCount).toBe(3)
      expect(results.pageSize).toBe(1)
      expect(results.previousPage).toBe(0)
      expect(results.nextPage).toBe(2)
      expect(results.proposals.length).toBe(1)
      expect(results.proposals[0].id).toEqual(proposal.id)
    })

    test('filter results by status', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(user)
      const proposal = await buildProposal(event.id, talk1, {
        status: ProposalStatus.ACCEPTED,
      })
      await buildProposal(event.id, talk2, { status: ProposalStatus.SUBMITTED })

      // when
      const results = await searchEventProposals(user.id, event.id, { status: 'ACCEPTED' })

      // then
      expect(results.total).toBe(1)
      expect(results.proposals[0].id).toBe(proposal.id)
    })

    test('filter results by format', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(user)
      const format1 = await buildFormat(event.id)
      const format2 = await buildFormat(event.id)
      const proposal1 = await buildProposal(event.id, talk1, {
        formats: { connect: { id: format1.id } },
      })
      await buildProposal(event.id, talk2, {
        formats: { connect: { id: format2.id } },
      })

      // when
      const results = await searchEventProposals(user.id, event.id, { format: format1.id })

      // then
      expect(results.total).toBe(1)
      expect(results.proposals[0].id).toBe(proposal1.id)
    })

    test('filter results by category', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(user)
      const category1 = await buildCategory(event.id)
      const category2 = await buildCategory(event.id)
      const proposal1 = await buildProposal(event.id, talk1, {
        categories: { connect: { id: category1.id } },
      })
      await buildProposal(event.id, talk2, {
        categories: { connect: { id: category2.id } },
      })

      // when
      const results = await searchEventProposals(user.id, event.id, { category: category1.id })

      // then
      expect(results.total).toBe(1)
      expect(results.proposals[0].id).toBe(proposal1.id)
    })

    test('filter results by rated proposals by user', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(user)
      const proposal1 = await buildProposal(event.id, talk1)
      await buildProposal(event.id, talk2)
      await buildRating(user.id, proposal1.id, 1, RatingFeeling.NEUTRAL)

      // when
      const results = await searchEventProposals(user.id, event.id, { ratings: 'rated' })

      // then
      expect(results.total).toBe(1)
      expect(results.proposals[0].id).toBe(proposal1.id)
    })

    test('filter results by not rated proposals by user', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(user)
      const proposal1 = await buildProposal(event.id, talk1)
      const proposal2 = await buildProposal(event.id, talk2)
      await buildRating(user.id, proposal1.id, 1, RatingFeeling.NEUTRAL)

      // when
      const results = await searchEventProposals(user.id, event.id, { ratings: 'not-rated' })

      // then
      expect(results.total).toBe(1)
      expect(results.proposals[0].id).toBe(proposal2.id)
    })

    test('sort proposals by newest ratings', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(user)
      const proposal1 = await buildProposal(event.id, talk1)
      const proposal2 = await buildProposal(event.id, talk2)

      // when
      const results = await searchEventProposals(user.id, event.id, {}, 'newest')

      // then
      expect(results.total).toBe(2)
      expect(results.proposals[0].id).toBe(proposal2.id)
      expect(results.proposals[1].id).toBe(proposal1.id)
    })

    test('sort proposals by oldest ratings', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const event = await buildEvent(user)
      const proposal1 = await buildProposal(event.id, talk1)
      const proposal2 = await buildProposal(event.id, talk2)

      // when
      const results = await searchEventProposals(user.id, event.id, {}, 'oldest')

      // then
      expect(results.total).toBe(2)
      expect(results.proposals[0].id).toBe(proposal1.id)
      expect(results.proposals[1].id).toBe(proposal2.id)
    })
  })

  describe('#streamEventProposals', () => {
    test('stream all event proposals', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const event = await buildEvent(user)
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const talk3 = await buildTalk(user)
      const proposal1 = await buildProposal(event.id, talk1)
      const proposal2 = await buildProposal(event.id, talk2)
      const proposal3 = await buildProposal(event.id, talk3)

      // when
      const stream = streamEventProposals(user.id, event.id, {}, { batchSize: 1 })

      // then
      const expectCallback = jest.fn()
      for await (const user of stream) {
        expectCallback(user)
      }
      expect(expectCallback).toHaveBeenCalledTimes(3)
      const firstCallArg = expectCallback.mock.calls[0]
      expect(firstCallArg[0].id).toEqual(proposal1.id)
      const secondCallArg = expectCallback.mock.calls[1]
      expect(secondCallArg[0].id).toEqual(proposal2.id)
      const thirdCallArg = expectCallback.mock.calls[2]
      expect(thirdCallArg[0].id).toEqual(proposal3.id)
    })

    test('stream event proposals with filters', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const event = await buildEvent(user)
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const talk3 = await buildTalk(user)
      const proposal1 = await buildProposal(event.id, talk1, { status: ProposalStatus.SUBMITTED })
      await buildProposal(event.id, talk2, { status: ProposalStatus.REJECTED })
      const proposal2 = await buildProposal(event.id, talk3, { status: ProposalStatus.SUBMITTED })

      // when
      const stream = streamEventProposals(
        user.id,
        event.id,
        { status: ProposalStatus.SUBMITTED },
        { batchSize: 1 },
      )

      // then
      const expectCallback = jest.fn()
      for await (const user of stream) {
        expectCallback(user)
      }
      expect(expectCallback).toHaveBeenCalledTimes(2)
      const firstCallArg = expectCallback.mock.calls[0]
      expect(firstCallArg[0].id).toEqual(proposal1.id)
      const secondCallArg = expectCallback.mock.calls[1]
      expect(secondCallArg[0].id).toEqual(proposal2.id)
    })

    test('stream event proposals with filters except some ids', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const event = await buildEvent(user)
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const talk3 = await buildTalk(user)
      const proposal1 = await buildProposal(event.id, talk1, { status: ProposalStatus.SUBMITTED })
      await buildProposal(event.id, talk2, { status: ProposalStatus.REJECTED })
      const proposal2 = await buildProposal(event.id, talk3, { status: ProposalStatus.SUBMITTED })

      // when
      const stream = streamEventProposals(
        user.id,
        event.id,
        { status: ProposalStatus.SUBMITTED, exceptItems: [proposal2.id] },
        { batchSize: 1 },
      )

      // then
      const expectCallback = jest.fn()
      for await (const user of stream) {
        expectCallback(user)
      }
      expect(expectCallback).toHaveBeenCalledTimes(1)
      const firstCallArg = expectCallback.mock.calls[0]
      expect(firstCallArg[0].id).toEqual(proposal1.id)
    })

    test('stream event proposals for selected ids', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const event = await buildEvent(user)
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const talk3 = await buildTalk(user)
      const proposal1 = await buildProposal(event.id, talk1, { status: ProposalStatus.SUBMITTED })
      const proposal2 = await buildProposal(event.id, talk2, { status: ProposalStatus.REJECTED })
      await buildProposal(event.id, talk3, { status: ProposalStatus.SUBMITTED })

      // when
      const stream = streamEventProposals(
        user.id,
        event.id,
        { status: ProposalStatus.SUBMITTED, selectedItems: [proposal1.id, proposal2.id] },
        { batchSize: 1 },
      )

      // then
      const expectCallback = jest.fn()
      for await (const user of stream) {
        expectCallback(user)
      }
      expect(expectCallback).toHaveBeenCalledTimes(2)
      const firstCallArg = expectCallback.mock.calls[0]
      expect(firstCallArg[0].id).toEqual(proposal1.id)
      const secondCallArg = expectCallback.mock.calls[1]
      expect(secondCallArg[0].id).toEqual(proposal2.id)
    })
  })

  describe('#updateEventProposals', () => {
    test('update all event proposals', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const event = await buildEvent(user)
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const proposal1 = await buildProposal(event.id, talk1)
      const proposal2 = await buildProposal(event.id, talk2)

      // when
      await updateEventProposals(user.id, event.id, {}, { status: 'ACCEPTED' })

      // then
      const proposals = await prisma.proposal.findMany({
        where: { id: { in: [proposal1.id, proposal2.id] } },
        orderBy: { id: 'asc' },
      })
      expect(proposals[0].status).toEqual('ACCEPTED')
      expect(proposals[1].status).toEqual('ACCEPTED')
    })

    test('update event proposals with filters', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const event = await buildEvent(user)
      const talk1 = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const proposal1 = await buildProposal(event.id, talk1, { status: ProposalStatus.REJECTED })
      const proposal2 = await buildProposal(event.id, talk2, { status: ProposalStatus.SUBMITTED })

      // when
      await updateEventProposals(
        user.id,
        event.id,
        { status: ProposalStatus.REJECTED },
        { status: ProposalStatus.ACCEPTED },
      )

      // then
      const proposals = await prisma.proposal.findMany({
        where: { id: { in: [proposal1.id, proposal2.id] } },
        orderBy: { id: 'asc' },
      })
      expect(proposals[0].status).toEqual('ACCEPTED')
      expect(proposals[1].status).toEqual('SUBMITTED')
    })
  })
})
