import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

function isArrayOfInt(value: Array<string | number>) {
  if (!value.every(Number.isInteger)) {
    throw new Error('Not an array of integer')
  }
  return true
}

export const ProposalPatch = [
  param('eventId').notEmpty().isNumeric().toInt(),
  param('proposalId').notEmpty().isNumeric().toInt(),
  body('title').trim().optional(falsy).isString(),
  body('abstract').trim().optional(falsy).isString(),
  body('level').trim().optional(falsy).isString(),
  body('language').trim().optional(falsy).isString(),
  body('status').trim().optional(falsy).isIn(['SUBMITTED', 'ACCEPTED', 'REJECTED']),
  body('formats').isArray().custom(isArrayOfInt).optional(falsy),
  body('categories').isArray().custom(isArrayOfInt).optional(falsy),
]
