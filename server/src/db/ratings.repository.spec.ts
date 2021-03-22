import { setupDatabase } from '../../tests/helpers/setup-services'
import { saveRating, deleteRating } from './ratings.repository'
import { buildUser } from '../../tests/builder/user'
import { buildEvent } from '../../tests/builder/event'
import { RatingFeeling } from '@prisma/client'
import { buildProposal } from '../../tests/builder/proposal'
import { buildTalk } from '../../tests/builder/talk'
import { buildRating } from '../../tests/builder/rating'
import { prisma } from './db'

describe('Ratings repository', () => {
  setupDatabase()

  describe('#saveRating', () => {
    test('should create a proposal rating for the user', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      // when
      const rating = await saveRating(user.id, proposal.id, {
        rating: 1,
        feeling: RatingFeeling.NEUTRAL,
      })
      //then
      expect(rating?.rating).toEqual(1)
      expect(rating?.feeling).toEqual(RatingFeeling.NEUTRAL)
    })

    test('should update the proposal rating of the user', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      await buildRating(user.id, proposal.id, 1, RatingFeeling.NEUTRAL)
      // when
      const rating = await saveRating(user.id, proposal.id, {
        rating: 5,
        feeling: RatingFeeling.LOVE,
      })
      //then
      expect(rating?.rating).toEqual(5)
      expect(rating?.feeling).toEqual(RatingFeeling.LOVE)
    })
  })

  describe('#deleteRating', () => {
    test('should delete the proposal rating of the user', async () => {
      // given
      const user = await buildUser()
      const event = await buildEvent(user)
      const talk = await buildTalk(user)
      const proposal = await buildProposal(event.id, talk)
      await buildRating(user.id, proposal.id, 1, RatingFeeling.NEUTRAL)
      // when
      await deleteRating(user.id, proposal.id)
      //then
      const result = await prisma.rating.findUnique({
        where: {
          userId_proposalId: { userId: user.id, proposalId: proposal.id },
        },
      })
      expect(result).toBeNull()
    })
  })
})
