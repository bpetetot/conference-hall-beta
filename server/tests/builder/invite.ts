import { InviteType } from '@prisma/client'
import { prisma } from '../../src/db/db'

export async function buildInvite(type: InviteType, entityId: number, userId: number) {
  return prisma.invite.create({ data: { type, entityId, userId } })
}
