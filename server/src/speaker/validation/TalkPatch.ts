import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

function isArrayOfString(value: Array<string>) {
  if (!value.every((val) => typeof val === 'string')) {
    throw new Error('Not an array of string')
  }
  return true
}

export const TalkPatch = [
  param('id').notEmpty().isNumeric().toInt(),
  body('title').trim().optional(falsy).isString(),
  body('abstract').trim().optional(falsy).isString(),
  body('level').trim().optional(falsy).isString(),
  body('languages').isArray().custom(isArrayOfString).optional(falsy),
  body('references').trim().optional(falsy).isString(),
  body('archived').trim().optional().isBoolean().toBoolean(),
]
