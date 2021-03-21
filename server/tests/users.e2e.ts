import { setupServer } from './helpers/setup-test'
import { getAuthUser } from './helpers/firebase-auth'
import { buildUser } from './builder/user'
import { prisma } from '../src/db/db'
import { buildBetaKey } from './builder/betaKey'
import { buildOrganization, buildOrganizationMember } from './builder/organization'
import { OrganizationRole } from '@prisma/client'

describe('/api/users', () => {
  const getAgent = setupServer()

  describe('GET /api/users/me', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/users/me')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.get('/api/users/me')

      // then
      expect(res.status).toEqual(404)
    })

    test('should return info of the authenticated user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid, email: 'ben@example.net' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.OWNER)

      // when
      const res = await agent.get('/api/users/me')

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        id: user.id,
        uid,
        name: user.name,
        email: user.email,
        bio: user.bio,
        betaAccess: user.betaAccess,
        company: user.company,
        photoURL: user.photoURL,
        language: user.language,
        github: user.github,
        twitter: user.twitter,
        address: user.address,
        lat: user.lat,
        lng: user.lng,
        timezone: user.timezone,
        references: user.references,
        organizations: [
          {
            organizationId: orga.id,
            role: OrganizationRole.OWNER,
          },
        ],
      })
    })
  })

  describe('POST /api/users/me', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/users/me').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 409 if user already exists', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid, email: 'ben@example.net' })

      // when
      const res = await agent.post('/api/users/me').send()

      // then
      expect(res.status).toEqual(409)
    })

    test('should create the authenticated user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.post('/api/users/me').send()

      // then
      expect(res.status).toEqual(200)
      expect(res.body.uid).toEqual(uid)
      expect(res.body.email).toEqual('ben@example.net')
    })
  })

  describe('PATCH /api/users/me', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/users/me').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.patch('/api/users/me').send({ email: 'ben@example.net' })

      // then
      expect(res.status).toEqual(404)
    })

    test('should return 400 if user data are not valid', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.patch('/api/users/me').send({ email: 'hello world' })

      // then
      expect(res.status).toEqual(400)
    })

    test('should update the authenticated user data', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid, email: 'ben@example.net', name: 'ben' })

      // when
      const res = await agent.patch('/api/users/me').send({ email: 'bob@example.net' })

      // then
      const user = await prisma.user.findUnique({ where: { uid } })
      expect(res.status).toEqual(204)
      expect(user?.email).toEqual('bob@example.net')
      expect(user?.name).toEqual('ben')
    })
  })

  describe('GET /api/users', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/users')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 400 if criterias are invalid', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.get('/api/users?name=ben')

      // then
      expect(res.status).toEqual(400)
    })

    test('should users corresponding to email criteria', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid: 'user1', email: 'user1@example.net' })
      const userToFind = await buildUser({
        uid: 'user2',
        name: 'user 2',
        email: 'user2@example.net',
        photoURL: 'url',
      })

      // when
      const res = await agent.get('/api/users?email=user2@example.net')

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual([
        {
          id: userToFind.id,
          name: userToFind.name,
          photoURL: userToFind.photoURL,
        },
      ])
    })
  })

  describe('PATCH /api/users/me/beta', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/users/me/beta').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.patch('/api/users/me/beta').send({ key: 'key1' })

      // then
      expect(res.status).toEqual(404)
    })

    test('should return 400 if key not sent', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.patch('/api/users/me/beta').send()

      // then
      expect(res.status).toEqual(400)
    })

    test('should return 404 if key not found', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.patch('/api/users/me/beta').send({ key: 'key1' })

      // then
      expect(res.status).toEqual(404)
    })

    test('should update the user with beta key', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const key = await buildBetaKey()

      // when
      const res = await agent.patch('/api/users/me/beta').send({ key: key.uuid })

      // then
      const user = await prisma.user.findUnique({ where: { uid } })
      expect(res.status).toEqual(204)
      expect(user?.betaAccess).toEqual(key.uuid)
    })
  })
})
