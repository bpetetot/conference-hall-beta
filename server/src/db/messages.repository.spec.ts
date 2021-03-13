import { MessageChannel } from '@prisma/client'
import { buildUser } from '../../tests/builder/user'
import { buildEvent } from '../../tests/builder/event'
import { buildProposal } from '../../tests/builder/proposal'
import { buildTalk } from '../../tests/builder/talk'
import { buildMessage } from '../../tests/builder/message'
import { prisma } from './db'
import {
  addMessage,
  deleteMessage,
  findProposalMessages,
  updateMessage,
} from './messages.repository'

describe('Messages repository', () => {
  describe('#findProposalMessages', () => {
    test('should find messages of a channel and proposal', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const talk2 = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const proposal2 = await buildProposal(event.id, talk2)
      await buildMessage(user.id, proposal.id, 'Hello 1', MessageChannel.ORGANIZER)
      await buildMessage(user.id, proposal.id, 'Hello 2', MessageChannel.ORGANIZER)
      await buildMessage(user.id, proposal.id, 'Not visible', MessageChannel.SPEAKER)
      await buildMessage(user.id, proposal2.id, 'Not visible', MessageChannel.ORGANIZER)
      // when
      const result = await findProposalMessages(proposal.id, MessageChannel.ORGANIZER)
      //then
      expect(result?.length).toBe(2)
      expect(result?.[0].message).toEqual('Hello 1')
      expect(result?.[1].message).toEqual('Hello 2')
    })
  })

  describe('#addMessage', () => {
    test('should create a message', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      // when
      const message = await addMessage(
        user.id,
        proposal.id,
        MessageChannel.ORGANIZER,
        'Hello world',
      )
      //then
      expect(message?.userId).toEqual(user.id)
      expect(message?.proposalId).toEqual(proposal.id)
      expect(message?.channel).toEqual(MessageChannel.ORGANIZER)
      expect(message?.message).toEqual('Hello world')
    })
  })

  describe('#updateMessage', () => {
    test('should update a message of the user', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const message = await buildMessage(user.id, proposal.id, 'Hello', MessageChannel.ORGANIZER)
      // when
      await updateMessage(message.id, user.id, 'Bye')
      //then
      const result = await prisma.message.findUnique({ where: { id: message.id } })
      expect(result?.message).toEqual('Bye')
    })
  })

  describe('#deleteMessage', () => {
    test('should delete a message', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      const message = await buildMessage(user.id, proposal.id, 'Hello', MessageChannel.ORGANIZER)
      // when
      await deleteMessage(message.id, user.id)
      //then
      const result = await prisma.message.findUnique({ where: { id: message.id } })
      expect(result).toBeNull()
    })
  })
})
