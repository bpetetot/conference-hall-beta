import { setupDatabase } from '../../tests/helpers/setup-services'
import { buildUser } from '../../tests/builder/user'
import {
  createUser,
  getUserByUid,
  getAuthUserByUid,
  updateUser,
  getUser,
  findUsersBy,
} from './users.repository'
import { prisma } from './db'
import { buildOrganization, buildOrganizationMember } from '../../tests/builder/organization'

describe('Users repository', () => {
  setupDatabase()

  describe('#getUser', () => {
    test('should return the user for the given id', async () => {
      // given
      const user = await buildUser({ uid: 'user1' })
      // when
      const result = await getUser(user.id)
      //then
      expect(result?.uid).toEqual('user1')
    })
  })

  describe('#findUsersBy', () => {
    test('should return empty array if no criterias', async () => {
      // given
      await buildUser({ uid: 'user1', email: 'user1@example.net' })
      // when
      const result = await findUsersBy({})
      //then
      expect(result).toEqual([])
    })

    test('should find users by email (insensitive)', async () => {
      // given
      const user = await buildUser({ uid: 'user1', email: 'user1@example.net' })
      await buildUser({ uid: 'user2', email: 'user2@example.net' })
      // when
      const result = await findUsersBy({ email: 'USER1@example.net' })
      //then
      expect(result[0].id).toEqual(user.id)
    })
  })

  describe('#getAuthUserByUid', () => {
    test('should return the user and organizations role for the given uid', async () => {
      // given
      const user = await buildUser({ uid: 'user1', name: 'ben' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga)
      // when
      const result = await getAuthUserByUid('user1')
      //then
      expect(result?.uid).toEqual('user1')
      expect(result?.name).toEqual('ben')
      expect(result?.organizations.length).toBe(1)
    })
  })

  describe('#getUserByUid', () => {
    test('should return the user for the given uid', async () => {
      // given
      await buildUser({ uid: 'user1', name: 'ben' })
      // when
      const result = await getUserByUid('user1')
      //then
      expect(result?.uid).toEqual('user1')
      expect(result?.name).toEqual('ben')
    })
  })

  describe('#createUser', () => {
    test('should create the given user', async () => {
      // when
      const user = await createUser('user1', 'ben', 'ben@example.net')
      //then
      const result = await prisma.user.findUnique({
        where: { id: user.id },
      })
      expect(result?.uid).toEqual('user1')
      expect(result?.name).toEqual('ben')
      expect(result?.email).toEqual('ben@example.net')
    })
  })

  describe('#updateUser', () => {
    test('should update the given user', async () => {
      // given
      await buildUser({ uid: 'user1', name: 'ben' })
      // when
      const user = await updateUser('user1', { name: 'bob' })
      //then
      const result = await prisma.user.findUnique({
        where: { id: user.id },
      })
      expect(result?.name).toEqual('bob')
    })
  })
})
