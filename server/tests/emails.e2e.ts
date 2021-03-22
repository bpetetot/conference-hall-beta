import { setupServer } from './helpers/setup-services'
import { buildUser } from './builder/user'
import { buildEvent } from './builder/event'
import { buildTalk } from './builder/talk'
import { buildProposal } from './builder/proposal'
import { prisma } from '../src/db/db'

describe('/api/emails', () => {
  const getAgent = setupServer()

  describe('POST /api/emails/delivered', () => {
    test('should return 400 if user-variables are not defined', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/emails/delivered').send({
        'event-data': {},
      })

      // then
      expect(res.status).toEqual(400)
      expect(res.body.message).toEqual('Bad request')
    })

    test('should return 400 if proposal id not defined', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/emails/delivered').send({
        'event-data': { 'user-variables': {} },
      })

      // then
      expect(res.status).toEqual(400)
      expect(res.body.message).toEqual('Bad request')
    })

    test('should return 400 if proposal is not found', async () => {
      // given
      const agent = await getAgent()

      // when
      const res = await agent.post('/api/emails/delivered').send({
        'event-data': { 'user-variables': { proposalId: 1 } },
      })

      // then
      expect(res.status).toEqual(400)
    })

    test('should update proposal email status when email delivered', async () => {
      // given
      const agent = await getAgent()
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)

      // when
      const res = await agent.post('/api/emails/delivered').send({
        'event-data': { 'user-variables': { proposalId: proposal.id } },
      })

      // then
      const result = await prisma.proposal.findUnique({ where: { id: proposal.id } })
      expect(res.status).toEqual(204)
      expect(result?.emailStatus).toEqual('DELIVERED')
    })
  })
})
