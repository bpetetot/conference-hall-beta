import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

function isArrayOfInt(value: Array<string | number>) {
  if (!value.every(Number.isInteger)) {
    throw new Error('Not an array of integer')
  }
  return true
}

export const TalkSubmitPut = [
  param('talkId').notEmpty().isNumeric(),
  param('eventId').notEmpty().isNumeric(),
  body('comments').trim().optional(falsy).isString(),
  body('formats').isArray().custom(isArrayOfInt).optional(falsy),
  body('categories').isArray().custom(isArrayOfInt).optional(falsy),
]
