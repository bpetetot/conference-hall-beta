import { setupDatabase } from '../../tests/helpers/setup-services'
import { InviteType } from '@prisma/client'
import { createInvite, deleteInvite, getInvite, getInviteForEntity } from './invites.repository'
import { buildUser } from '../../tests/builder/user'
import { buildInvite } from '../../tests/builder/invite'
import { prisma } from './db'

describe('Invites repository', () => {
  setupDatabase()

  describe('#getInvite', () => {
    test('should return an existing invite', async () => {
      // given
      const user = await buildUser()
      const invite = await buildInvite(InviteType.ORGANIZATION, 1, user.id)
      // when
      const result = await getInvite(invite.uuid)
      //then
      expect(result?.type).toEqual(InviteType.ORGANIZATION)
      expect(result?.entityId).toEqual(1)
      expect(result?.invitedBy).toEqual(user)
    })
  })

  describe('#getInviteForEntity', () => {
    test('should return an existing invite for the entity', async () => {
      // given
      const user = await buildUser()
      const invite = await buildInvite(InviteType.ORGANIZATION, 1, user.id)
      // when
      const result = await getInviteForEntity(InviteType.ORGANIZATION, 1)
      //then
      expect(result?.uuid).toEqual(invite.uuid)
      expect(result?.type).toEqual(InviteType.ORGANIZATION)
      expect(result?.entityId).toEqual(1)
    })
  })

  describe('#createInvite', () => {
    test('should create a new invite', async () => {
      // given
      const user = await buildUser()
      // when
      const result = await createInvite(InviteType.ORGANIZATION, 1, user.id)
      //then
      expect(result?.type).toEqual(InviteType.ORGANIZATION)
      expect(result?.entityId).toEqual(1)
      expect(result?.userId).toEqual(user.id)
    })
  })

  describe('#deleteInvite', () => {
    test('should delete an invite', async () => {
      // given
      const user = await buildUser()
      const invite = await buildInvite(InviteType.ORGANIZATION, 1, user.id)
      // when
      await deleteInvite(InviteType.ORGANIZATION, 1)
      //then
      const result = await prisma.invite.findUnique({ where: { uuid: invite.uuid } })
      expect(result).toBe(null)
    })
  })
})
