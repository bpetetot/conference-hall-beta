import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

export const TalkPatch = [
  param('id').notEmpty().isNumeric().toInt(),
  body('title').trim().optional(falsy).isString(),
  body('abstract').trim().optional(falsy).isString(),
  body('level').trim().optional(falsy).isString(),
  body('language').trim().optional(falsy).isString(),
  body('references').trim().optional(falsy).isString(),
  body('archived').trim().optional().isBoolean().toBoolean(),
]
