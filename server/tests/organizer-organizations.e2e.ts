import { setupServer } from './helpers/setup-test'
import { getAuthUser } from './helpers/firebase-auth'
import { buildUser } from './builder/user'
import { buildOrganization, buildOrganizationMember } from './builder/organization'
import { OrganizationRole } from '@prisma/client'
import { prisma } from '../src/db/db'

describe('/api/organizer/organizations', () => {
  const getAgent = setupServer()

  describe('GET /api/organizer/organizations', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/organizer/organizations')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.get('/api/organizer/organizations')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should list all organizations of authenticated organizer', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const organization = await buildOrganization()
      await buildOrganizationMember(user, organization)

      // when
      const res = await agent.get('/api/organizer/organizations')

      // then
      expect(res.status).toEqual(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0]).toEqual({
        id: organization.id,
        name: organization.name,
        createdAt: organization.createdAt.toISOString(),
      })
    })
  })

  describe('POST /api/organizer/organizations', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/organizer/organizations').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.post('/api/organizer/organizations').send({
        name: 'organization',
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 400 if organization data are not valid', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.post('/api/organizer/organizations').send()

      // then
      expect(res.status).toEqual(400)
    })

    test('should create the organization for the given user', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.post('/api/organizer/organizations').send({
        name: 'organization',
      })

      // then
      expect(res.status).toEqual(200)
      expect(res.body.name).toEqual('organization')
    })
  })

  describe('GET /api/organizer/organizations/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/organizer/organizations/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.get('/api/organizer/organizations/1')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not member of the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const orga = await buildOrganization()

      // when
      const res = await agent.get(`/api/organizer/organizations/${orga.id}`)

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('No sufficient permissions')
    })

    test('should return the organization if user is a member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.MEMBER)

      // when
      const res = await agent.get(`/api/organizer/organizations/${orga.id}`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        id: orga.id,
        name: orga.name,
        createdAt: orga.createdAt.toISOString(),
      })
    })
  })

  describe('PATCH /api/organizer/organizations/:id', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/organizer/organizations/1').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.patch('/api/organizer/organizations/1').send({
        name: 'organization',
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 400 if organization data are not valid', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.patch('/api/organizer/organizations/1').send()

      // then
      expect(res.status).toEqual(400)
    })

    test('should return 403 if user is not member of the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const orga = await buildOrganization()

      // when
      const res = await agent.patch(`/api/organizer/organizations/${orga.id}`).send({
        name: 'organization',
      })

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('No sufficient permissions')
    })

    test('should return 403 if user is not owner in the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.MEMBER)

      // when
      const res = await agent.patch(`/api/organizer/organizations/${orga.id}`).send({
        name: 'organization',
      })

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('No sufficient permissions')
    })

    test('should update if user is owner in the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.OWNER)

      // when
      const res = await agent.patch(`/api/organizer/organizations/${orga.id}`).send({
        name: 'organization-new-name',
      })

      // then
      const updated = await prisma.organization.findUnique({ where: { id: orga.id } })
      expect(res.status).toEqual(204)
      expect(updated?.name).toEqual('organization-new-name')
    })
  })

  describe('GET /api/organizer/organizations/:id/members', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.get('/api/organizer/organizations/1/members')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.get('/api/organizer/organizations/1/members')

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not member of the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })
      const orga = await buildOrganization()

      // when
      const res = await agent.get(`/api/organizer/organizations/${orga.id}/members`)

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('No sufficient permissions')
    })

    test('should return the organization members if user is a member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user1 = await buildUser({ uid, name: 'user1' })
      const user2 = await buildUser({ uid: 'user2', name: 'user2' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user1, orga, OrganizationRole.OWNER)
      await buildOrganizationMember(user2, orga, OrganizationRole.MEMBER)

      // when
      const res = await agent.get(`/api/organizer/organizations/${orga.id}/members`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual([
        {
          id: user1.id,
          name: user1.name,
          photoURL: user1.photoURL,
          role: OrganizationRole.OWNER,
        },
        {
          id: user2.id,
          name: user2.name,
          photoURL: user2.photoURL,
          role: OrganizationRole.MEMBER,
        },
      ])
    })
  })

  describe('POST /api/organizer/organizations/:id/members/:memberId', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/organizer/organizations/1/members/1').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.post('/api/organizer/organizations/1/members/1').send()

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not owner of the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.MEMBER)

      // when
      const res = await agent.post(`/api/organizer/organizations/${orga.id}/members/1`).send()

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('No sufficient permissions')
    })

    test('should add the member to the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user1 = await buildUser({ uid, name: 'user1' })
      const user2 = await buildUser({ uid: 'user2', name: 'user2' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user1, orga, OrganizationRole.OWNER)

      // when
      const res = await agent
        .post(`/api/organizer/organizations/${orga.id}/members/${user2.id}`)
        .send()

      // then
      const member = await prisma.organizationMember.findUnique({
        where: { memberId_organizationId: { organizationId: orga.id, memberId: user2.id } },
      })
      expect(res.status).toEqual(200)
      expect(member?.memberId).toEqual(user2.id)
      expect(member?.organizationId).toEqual(orga.id)
      expect(member?.role).toEqual(OrganizationRole.MEMBER)
    })
  })

  describe('PATCH /api/organizer/organizations/:id/members/:memberId', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.patch('/api/organizer/organizations/1/members/1').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.patch('/api/organizer/organizations/1/members/1').send({
        role: OrganizationRole.MEMBER,
      })

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 400 if role not in the request body', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      await buildUser({ uid })

      // when
      const res = await agent.patch('/api/organizer/organizations/1/members/1').send()

      // then
      expect(res.status).toEqual(400)
    })

    test('should return 403 if user is not owner of the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.MEMBER)

      // when
      const res = await agent.patch(`/api/organizer/organizations/${orga.id}/members/1`).send({
        role: OrganizationRole.MEMBER,
      })

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('No sufficient permissions')
    })

    test('should update the role member in the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user1 = await buildUser({ uid, name: 'user1' })
      const user2 = await buildUser({ uid: 'user2', name: 'user2' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user1, orga, OrganizationRole.OWNER)
      await buildOrganizationMember(user2, orga, OrganizationRole.OWNER)

      // when
      const res = await agent
        .patch(`/api/organizer/organizations/${orga.id}/members/${user2.id}`)
        .send({
          role: OrganizationRole.MEMBER,
        })

      // then
      const member = await prisma.organizationMember.findUnique({
        where: { memberId_organizationId: { organizationId: orga.id, memberId: user2.id } },
      })
      expect(res.status).toEqual(204)
      expect(member?.memberId).toEqual(user2.id)
      expect(member?.organizationId).toEqual(orga.id)
      expect(member?.role).toEqual(OrganizationRole.MEMBER)
    })
  })

  describe('DELETE /api/organizer/organizations/:id/members/:memberId', () => {
    test('should return 401 if not authenticated', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.delete('/api/organizer/organizations/1/members/1').send()

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if user not found', async () => {
      // given
      const { token } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)

      // when
      const res = await agent.delete('/api/organizer/organizations/1/members/1').send()

      // then
      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('User not found')
    })

    test('should return 403 if user is not owner and delete another member', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.MEMBER)

      // when
      const res = await agent.delete(`/api/organizer/organizations/${orga.id}/members/1`).send()

      // then
      expect(res.status).toEqual(403)
      expect(res.body.message).toEqual('No sufficient permissions')
    })

    test('should delete itself if user is not owner from the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user = await buildUser({ uid, name: 'user1' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga, OrganizationRole.MEMBER)

      // when
      const res = await agent
        .delete(`/api/organizer/organizations/${orga.id}/members/${user.id}`)
        .send()

      // then
      const member = await prisma.organizationMember.findUnique({
        where: { memberId_organizationId: { organizationId: orga.id, memberId: user.id } },
      })
      expect(res.status).toEqual(204)
      expect(member).toBe(null)
    })

    test('should delete the member if user is owner from the organization', async () => {
      // given
      const { token, uid } = await getAuthUser('ben@example.net')
      const agent = await getAgent(token)
      const user1 = await buildUser({ uid, name: 'user1' })
      const user2 = await buildUser({ uid: 'user2', name: 'user2' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user1, orga, OrganizationRole.OWNER)
      await buildOrganizationMember(user2, orga, OrganizationRole.OWNER)

      // when
      const res = await agent
        .delete(`/api/organizer/organizations/${orga.id}/members/${user2.id}`)
        .send()

      // then
      const member = await prisma.organizationMember.findUnique({
        where: { memberId_organizationId: { organizationId: orga.id, memberId: user2.id } },
      })
      expect(res.status).toEqual(204)
      expect(member).toBe(null)
    })
  })
})
