import { param, query } from 'express-validator'

const falsy = { checkFalsy: true }

export const SearchProposalGet = [
  param('eventId').notEmpty().isNumeric().toInt(),
  query('search').optional(falsy).isString(),
  query('status')
    .optional(falsy)
    .isIn(['SUBMITTED', 'ACCEPTED', 'REJECTED', 'CONFIRMED', 'DECLINED']),
  query('ratings').optional(falsy).isIn(['rated', 'not-rated']),
  query('format').optional(falsy).isNumeric().toInt(),
  query('category').optional(falsy).isNumeric().toInt(),
  query('sort').optional(falsy).isIn(['newest', 'oldest', 'highestRating', 'lowestRating']),
  query('page').optional(falsy).isNumeric().toInt(),
  query('pageSize').optional(falsy).isNumeric().toInt(),
]
