import { param, body } from 'express-validator'

const falsy = { checkFalsy: true }

export const ExportProposalsPost = [
  param('eventId').notEmpty().isNumeric().toInt(),
  body('search').optional(falsy).isString(),
  body('status')
    .optional(falsy)
    .isIn(['SUBMITTED', 'ACCEPTED', 'REJECTED', 'CONFIRMED', 'DECLINED']),
  body('ratings').optional(falsy).isIn(['rated', 'not-rated']),
  body('format').optional(falsy).isNumeric().toInt(),
  body('category').optional(falsy).isNumeric().toInt(),
  body('exceptItems').optional(falsy).isArray(),
  body('selectedItems').optional(falsy).isArray(),
]
