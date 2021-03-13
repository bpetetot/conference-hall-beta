import { Rating, RatingFeeling } from '@prisma/client'
import { averageRatings, countFeelings, checkRating } from './ratings'

function buildRatings(ratings: { rating: number | null; feeling: RatingFeeling }[]): Rating[] {
  return ratings.map(({ rating, feeling }) => ({
    id: 1,
    userId: 1,
    proposalId: 1,
    rating,
    feeling,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
}

describe('#averageRatings', () => {
  test('average of the number of ratings (excluding null ratings)', () => {
    // given
    const ratings = buildRatings([
      { rating: 0, feeling: RatingFeeling.HATE },
      { rating: 4, feeling: RatingFeeling.NEUTRAL },
      { rating: null, feeling: RatingFeeling.NEUTRAL },
      { rating: 5, feeling: RatingFeeling.LOVE },
      { rating: null, feeling: RatingFeeling.NO_OPINION },
    ])
    // when
    const average = averageRatings(ratings)
    // then
    expect(average).toBe(3)
  })
})

describe('#countFeelings', () => {
  test('counts love feelings', () => {
    // given
    const ratings = buildRatings([
      { rating: 0, feeling: RatingFeeling.HATE },
      { rating: 4, feeling: RatingFeeling.NEUTRAL },
      { rating: 5, feeling: RatingFeeling.LOVE },
      { rating: 5, feeling: RatingFeeling.LOVE },
      { rating: null, feeling: RatingFeeling.NO_OPINION },
    ])
    // when
    const feelings = countFeelings(ratings, RatingFeeling.LOVE)
    // then
    expect(feelings).toBe(2)
  })
})

describe('#checkRating', () => {
  test('return null if no feeling', () => {
    // when
    const rating = checkRating(null)
    // then
    expect(rating).toBeNull()
  })
  test('return null if no opinion feeling', () => {
    // when
    const rating = checkRating(RatingFeeling.NO_OPINION)
    // then
    expect(rating).toBeNull()
  })
  test('return 5 if love feeling', () => {
    // when
    const rating = checkRating(RatingFeeling.LOVE)
    // then
    expect(rating).toBe(5)
  })
  test('return 0 if hate feeling', () => {
    // when
    const rating = checkRating(RatingFeeling.HATE)
    // then
    expect(rating).toBe(0)
  })
  test('return rating value if neutral', () => {
    // when
    const rating = checkRating(RatingFeeling.NEUTRAL, 2)
    // then
    expect(rating).toBe(2)
  })
  test('return 5 if neutral and rating value > 5', () => {
    // when
    const rating = checkRating(RatingFeeling.NEUTRAL, 8)
    // then
    expect(rating).toBe(5)
  })
  test('return 1 if neutral and rating value <= 0', () => {
    // when
    const rating = checkRating(RatingFeeling.NEUTRAL, 0)
    // then
    expect(rating).toBe(1)
  })
  test('return 1 if neutral and rating is null', () => {
    // when
    const rating = checkRating(RatingFeeling.NEUTRAL, null)
    // then
    expect(rating).toBe(1)
  })
})
