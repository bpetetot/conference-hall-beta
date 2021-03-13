import { MessageChannel } from '@prisma/client'
import { prisma } from '../../src/db/db'

export async function buildMessage(
  userId: number,
  proposalId: number,
  message: string,
  channel: MessageChannel = MessageChannel.ORGANIZER,
) {
  return prisma.message.create({
    data: {
      user: { connect: { id: userId } },
      proposal: { connect: { id: proposalId } },
      channel,
      message,
    },
  })
}
