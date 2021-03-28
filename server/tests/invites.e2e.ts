import { InviteType } from '.prisma/client'
import { prisma } from '../src/db/db'
import { buildInvite } from './builder/invite'
import { buildOrganization, buildOrganizationMember } from './builder/organization'
import { buildTalk } from './builder/talk'
import { buildUser } from './builder/user'
import { getAuthUser } from './helpers/firebase-auth'
import { setupServer } from './helpers/setup-services'

describe('/api/invites', () => {
  const getAgent = setupServer()

  describe('GET /api/invites/:uuid', () => {
    test('should return 401 if user not authorized', async () => {
      // when
      const agent = await getAgent()
      const res = await agent.get('/api/invites/1')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if invite not found', async () => {
      // given
      const { uid, token } = await getAuthUser('ben@example.net')
      await buildUser({ uid })
      const agent = await getAgent(token)

      // when
      const res = await agent.get('/api/invites/1')

      // then
      expect(res.status).toEqual(404)
      expect(res?.body?.message).toEqual('Invitation not found')
    })

    describe('Organization invites', () => {
      test('should return 404 if organization not found', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const invite = await buildInvite(InviteType.ORGANIZATION, 1, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.get(`/api/invites/${invite.uuid}`)

        // then
        expect(res.status).toEqual(404)
        expect(res?.body?.message).toEqual('Organization not found')
      })

      test('should return invitation info', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const organization = await buildOrganization()
        const invite = await buildInvite(InviteType.ORGANIZATION, organization.id, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.get(`/api/invites/${invite.uuid}`)

        // then
        expect(res.status).toEqual(200)
        expect(res?.body).toEqual({
          type: 'ORGANIZATION',
          entityId: organization.id,
          label: organization.name,
        })
      })
    })

    describe('Speaker invites', () => {
      test('should return 404 if talk not found', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const invite = await buildInvite(InviteType.SPEAKER, 1, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.get(`/api/invites/${invite.uuid}`)

        // then
        expect(res.status).toEqual(404)
        expect(res?.body?.message).toEqual('Talk not found')
      })

      test('should return invitation info', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const talk = await buildTalk(user)
        const invite = await buildInvite(InviteType.SPEAKER, talk.id, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.get(`/api/invites/${invite.uuid}`)

        // then
        expect(res.status).toEqual(200)
        expect(res?.body).toEqual({
          type: 'SPEAKER',
          entityId: talk.id,
          label: talk.title,
        })
      })
    })
  })

  describe('PUT /api/invites/:uuid/validate', () => {
    test('should return 404 if user not found', async () => {
      // when
      const agent = await getAgent()
      const res = await agent.put('/api/invites/1/validate')

      // then
      expect(res.status).toEqual(401)
    })

    test('should return 404 if invite not found', async () => {
      // given
      const { uid, token } = await getAuthUser('ben@example.net')
      await buildUser({ uid })
      const agent = await getAgent(token)

      // when
      const res = await agent.put('/api/invites/1/validate')

      // then
      expect(res.status).toEqual(404)
      expect(res?.body?.message).toEqual('Invitation not found')
    })

    describe('Organization invites', () => {
      test('should return 404 if organization not found', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const invite = await buildInvite(InviteType.ORGANIZATION, 1, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.put(`/api/invites/${invite.uuid}/validate`)

        // then
        expect(res.status).toEqual(404)
        expect(res?.body?.message).toEqual('Organization not found')
      })

      test('should return 409 if already member of the organization', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const organization = await buildOrganization()
        await buildOrganizationMember(user, organization, 'MEMBER')
        const invite = await buildInvite(InviteType.ORGANIZATION, organization.id, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.put(`/api/invites/${invite.uuid}/validate`)

        // then
        expect(res.status).toEqual(409)
        expect(res?.body?.message).toEqual('Already member of the organization')
      })

      test('should add member to organization if invitation validated', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const user2 = await buildUser({ uid: 'user2', betaAccess: 'access-key' })
        const organization = await buildOrganization()
        const invite = await buildInvite(InviteType.ORGANIZATION, organization.id, user2.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.put(`/api/invites/${invite.uuid}/validate`)

        // then
        const result = await prisma.organizationMember.findUnique({
          where: {
            memberId_organizationId: { organizationId: organization.id, memberId: user.id },
          },
          include: { member: true },
        })
        expect(res.status).toEqual(204)
        expect(result?.organizationId).toEqual(organization.id)
        expect(result?.role).toEqual('REVIEWER')
        expect(result?.member.id).toEqual(user.id)
        expect(result?.member.betaAccess).toEqual('access-key')
      })
    })

    describe('Speaker invites', () => {
      test('should return 404 if talk not found', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const invite = await buildInvite(InviteType.SPEAKER, 1, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.put(`/api/invites/${invite.uuid}/validate`)

        // then
        expect(res.status).toEqual(404)
        expect(res?.body?.message).toEqual('Talk not found')
      })

      test('should return a 409 if already speaker', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const talk = await buildTalk(user)
        const invite = await buildInvite(InviteType.SPEAKER, talk.id, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.put(`/api/invites/${invite.uuid}/validate`)

        // then
        expect(res.status).toEqual(409)
        expect(res?.body?.message).toEqual('Already speaker of the talk')
      })

      test('should add speaker to talk if invitation validated', async () => {
        // given
        const { uid, token } = await getAuthUser('ben@example.net')
        const user = await buildUser({ uid })
        const user2 = await buildUser({ uid: 'user2' })
        const talk = await buildTalk(user2)
        const invite = await buildInvite(InviteType.SPEAKER, talk.id, user.id)
        const agent = await getAgent(token)

        // when
        const res = await agent.put(`/api/invites/${invite.uuid}/validate`)

        // then
        const result = await prisma.talk.findUnique({
          where: { id: talk.id },
          include: { speakers: true },
        })
        expect(res.status).toEqual(204)
        expect(result?.speakers.find((s) => s.uid === uid)).toBeDefined()
      })
    })
  })
})
