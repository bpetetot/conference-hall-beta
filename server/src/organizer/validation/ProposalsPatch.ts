import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

export const ProposalsPatch = [
  param('eventId').notEmpty().isNumeric().toInt(),
  body('filters').notEmpty(),
  body('filters.search').optional(falsy).isString(),
  body('filters.status')
    .optional(falsy)
    .isIn(['SUBMITTED', 'ACCEPTED', 'REJECTED', 'CONFIRMED', 'DECLINED']),
  body('filters.ratings').optional(falsy).isIn(['rated', 'not-rated']),
  body('filters.format').optional(falsy).isNumeric().toInt(),
  body('filters.category').optional(falsy).isNumeric().toInt(),
  body('filters.exceptItems').optional(falsy).isArray(),
  body('filters.selectedItems').optional(falsy).isArray(),
  body('data').notEmpty(),
  body('data.status').optional(falsy).isIn(['ACCEPTED', 'REJECTED']),
]
