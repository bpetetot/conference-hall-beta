import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

export const ProposalRatePut = [
  param('eventId').notEmpty().isNumeric().toInt(),
  param('proposalId').notEmpty().isNumeric().toInt(),
  body('rating').optional(falsy).isNumeric().toInt(),
  body('feeling').optional(falsy).isIn(['LOVE', 'HATE', 'NEUTRAL', 'NO_OPINION']),
]
