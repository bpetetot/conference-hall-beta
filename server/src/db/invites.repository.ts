import { InviteType } from '@prisma/client'
import { prisma } from './db'

export async function getInvite(inviteUuid: string) {
  return prisma.invite.findUnique({
    where: { uuid: inviteUuid },
    include: { invitedBy: true },
  })
}

export async function getInviteForEntity(type: InviteType, entityId: number) {
  return prisma.invite.findFirst({ where: { type, entityId } })
}

export async function createInvite(type: InviteType, entityId: number, userId: number) {
  return prisma.invite.create({ data: { type, entityId, userId } })
}

export async function deleteInvite(type: InviteType, entityId: number) {
  return prisma.invite.delete({ where: { type_entityId: { type, entityId } } })
}
