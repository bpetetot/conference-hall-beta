import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

export const FormatPatch = [
  param('eventId').notEmpty().isNumeric().toInt(),
  param('formatId').notEmpty().isNumeric().toInt(),
  body('name').trim().optional(falsy).isString(),
  body('description').trim().optional(falsy).isString(),
]
