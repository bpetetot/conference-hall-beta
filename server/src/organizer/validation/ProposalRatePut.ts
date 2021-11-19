import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

export const ProposalRatePut = [
  param('eventId').notEmpty().isNumeric().toInt(),
  param('proposalId').notEmpty().isNumeric().toInt(),
  body('rating').optional(falsy).isNumeric().toInt(),
  body('feeling').optional(falsy).isIn(['POSITIVE', 'NEGATIVE', 'NEUTRAL', 'NO_OPINION']),
]
