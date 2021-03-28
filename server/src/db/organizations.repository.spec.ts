import { setupDatabase } from '../../tests/helpers/setup-services'
import { OrganizationRole } from '@prisma/client'
import { buildOrganization, buildOrganizationMember } from '../../tests/builder/organization'
import { buildUser } from '../../tests/builder/user'
import { prisma } from './db'
import {
  getOrganizationById,
  findOrganizationsByUser,
  createOrganization,
  updateOrganization,
  getOrganizationForUserRole,
  findOrganizationMembers,
  addMember,
  updateMemberRole,
  deleteMember,
} from './organizations.repository'

describe('Organizations repository', () => {
  setupDatabase()

  describe('#getOrganizationById', () => {
    test('should organization for the given id', async () => {
      // given
      const organization = await buildOrganization()
      // when
      const result = await getOrganizationById(organization.id)
      //then
      expect(result).toEqual(organization)
    })
  })

  describe('#findOrganizationsByUser', () => {
    test('should organizations of the given user', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1' })
      const user2 = await buildUser({ uid: 'user2' })
      const organization1 = await buildOrganization({ name: 'A' })
      const organization2 = await buildOrganization({ name: 'B' })
      const organization3 = await buildOrganization({ name: 'C' })
      await buildOrganizationMember(user1, organization1)
      await buildOrganizationMember(user1, organization2)
      await buildOrganizationMember(user2, organization3)
      // when
      const result = await findOrganizationsByUser(user1.id)
      //then
      expect(result.map((o) => o.id)).toEqual([organization1.id, organization2.id])
    })
  })

  describe('#createOrganization', () => {
    test('should create an organization for user as owner', async () => {
      // given
      const user = await buildUser({ uid: 'user' })
      // when
      const organization = await createOrganization(user.id, {
        name: 'organization',
      })
      //then
      const result = await prisma.organization.findUnique({
        where: { id: organization.id },
        include: { members: true },
      })
      expect(result?.name).toEqual('organization')
      expect(result?.members[0].memberId).toEqual(user.id)
      expect(result?.members[0].role).toEqual('OWNER')
    })
  })

  describe('#updateOrganization', () => {
    test('should update an organization', async () => {
      // given
      const organization = await buildOrganization({ name: 'name-before' })
      // when
      await updateOrganization(organization.id, {
        name: 'name-after',
      })
      //then
      const result = await prisma.organization.findUnique({
        where: { id: organization.id },
      })
      expect(result?.name).toEqual('name-after')
    })
  })

  describe('#getOrganizationForUserRole', () => {
    test('return null if the organization doesnt exists', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1' })
      // when
      const result = await getOrganizationForUserRole(1, user1.id, [OrganizationRole.OWNER])
      //then
      expect(result).toBe(null)
    })

    test('return null if the user is not member of the organization', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1' })
      const user2 = await buildUser({ uid: 'user2' })
      const organization1 = await buildOrganization()
      const organization2 = await buildOrganization()
      await buildOrganizationMember(user1, organization1, OrganizationRole.OWNER)
      await buildOrganizationMember(user2, organization1, OrganizationRole.OWNER)
      // when
      const result = await getOrganizationForUserRole(organization2.id, user2.id, [
        OrganizationRole.OWNER,
      ])
      //then
      expect(result).toBe(null)
    })

    test('return null if the user has not the correct role in the organization', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1' })
      const organization = await buildOrganization()
      await buildOrganizationMember(user1, organization, OrganizationRole.MEMBER)
      // when
      const result = await getOrganizationForUserRole(organization.id, user1.id, [
        OrganizationRole.OWNER,
      ])
      //then
      expect(result).toBe(null)
    })

    test('return organization if the user has the correct role in the organization', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1' })
      const organization = await buildOrganization()
      await buildOrganizationMember(user1, organization, OrganizationRole.MEMBER)
      // when
      const result = await getOrganizationForUserRole(organization.id, user1.id, [
        OrganizationRole.OWNER,
        OrganizationRole.MEMBER,
      ])
      //then
      expect(result?.id).toEqual(organization.id)
    })
  })

  describe('#findOrganizationMembers', () => {
    test('should return all members of the given organization', async () => {
      // given
      const user1 = await buildUser({ uid: 'user1', name: 'user1' })
      const user2 = await buildUser({ uid: 'user2', name: 'user2' })
      const user3 = await buildUser({ uid: 'user3', name: 'user3' })
      const organization1 = await buildOrganization({ name: 'A' })
      const organization2 = await buildOrganization({ name: 'B' })
      await buildOrganizationMember(user1, organization1)
      await buildOrganizationMember(user2, organization1)
      await buildOrganizationMember(user3, organization2)
      // when
      const result = await findOrganizationMembers(organization1.id)
      //then
      expect(result.map((m) => m.member.name)).toEqual(['user1', 'user2'])
    })
  })

  describe('#addMember', () => {
    test('should add a member in the organization', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const organization = await buildOrganization()
      // when
      await addMember(organization.id, user.id)
      //then
      const result = await prisma.organizationMember.findFirst({
        where: { memberId: user.id, organizationId: organization.id },
      })
      expect(result?.role).toEqual(OrganizationRole.REVIEWER)
    })
  })

  describe('#updateMemberRole', () => {
    test('should update the role member in the organization', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const organization = await buildOrganization()
      await buildOrganizationMember(user, organization, OrganizationRole.OWNER)
      // when
      await updateMemberRole(organization.id, user.id, OrganizationRole.MEMBER)
      //then
      const result = await prisma.organizationMember.findFirst({
        where: { memberId: user.id, organizationId: organization.id },
      })
      expect(result?.role).toEqual(OrganizationRole.MEMBER)
    })
  })

  describe('#deleteMember', () => {
    test('should delete the member from the organization', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      const organization = await buildOrganization()
      await buildOrganizationMember(user, organization, OrganizationRole.MEMBER)
      // when
      await deleteMember(organization.id, user.id)
      //then
      const result = await prisma.organizationMember.findFirst({
        where: { memberId: user.id, organizationId: organization.id },
      })
      expect(result).toBe(null)
    })
  })
})
