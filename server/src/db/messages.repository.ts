import { MessageChannel } from '@prisma/client'
import { prisma } from './db'

export async function findProposalMessages(proposalId: number, channel: MessageChannel) {
  return prisma.message.findMany({
    where: { proposalId, channel },
    orderBy: { createdAt: 'asc' },
    include: { user: true },
  })
}

export async function countProposalMessages(proposalId: number, channel: MessageChannel) {
  return prisma.message.count({ where: { proposalId, channel } })
}

export async function addMessage(
  userId: number,
  proposalId: number,
  channel: MessageChannel,
  message: string,
) {
  return prisma.message.create({
    data: {
      user: { connect: { id: userId } },
      proposal: { connect: { id: proposalId } },
      channel,
      message,
    },
    include: { user: true },
  })
}

export async function updateMessage(messageId: number, userId: number, message: string) {
  return prisma.message.updateMany({
    where: { id: messageId, userId },
    data: { message },
  })
}

export async function deleteMessage(messageId: number, userId: number) {
  return prisma.message.deleteMany({ where: { id: messageId, userId } })
}
