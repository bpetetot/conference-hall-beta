import { setupServer } from './helpers/setup-services'
import { buildEvent } from './builder/event'
import { buildTalk } from './builder/talk'
import { buildProposal } from './builder/proposal'
import { buildUser } from './builder/user'

describe('/api/v1/event/:id', () => {
  const getAgent = setupServer()

  describe('GET /api/v1/event/:id', () => {
    test('should return 404 if event not found', async () => {
      // when
      const agent = await getAgent()
      const res = await agent.get('/api/v1/event/1?key=valid')

      // then
      expect(res.status).toEqual(404)
    })

    test('should return 401 if api key is invalid', async () => {
      // given
      const event = await buildEvent(null, { apiKey: 'valid' })

      // when
      const agent = await getAgent()
      const res = await agent.get(`/api/v1/event/${event.id}?key=invalid`)

      // then
      expect(res.status).toEqual(401)
    })

    test('should return the event', async () => {
      // given
      const speaker = await buildUser()
      const event = await buildEvent(null, { apiKey: 'valid' })
      const talk = await buildTalk(speaker)
      const proposal = await buildProposal(event.id, talk)

      // when
      const agent = await getAgent()
      const res = await agent.get(`/api/v1/event/${event.id}?key=valid`)

      // then
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({
        name: event.name,
        type: event.type,
        description: event.description,
        address: event.address,
        timezone: event.timezone,
        conferenceStart: event.conferenceStart,
        conferenceEnd: event.conferenceEnd,
        website: event.website,
        contact: event.contact,
        cfpStart: event.cfpStart,
        cfpEnd: event.cfpEnd,
        isCfpOpened: false,
        isCfpFinished: false,
        maxProposals: event.maxProposals,
        formats: [],
        categories: [],
        proposals: [
          {
            title: proposal.title,
            abstract: proposal.abstract,
            level: proposal.level,
            languages: proposal.languages,
            formats: [],
            categories: [],
            createdAt: proposal.createdAt.toISOString(),
            speakers: [
              {
                name: speaker.name,
                photoURL: speaker.photoURL,
                bio: speaker.bio,
                company: speaker.company,
                github: speaker.github,
                twitter: speaker.twitter,
              },
            ],
          },
        ],
      })
    })
  })
})
