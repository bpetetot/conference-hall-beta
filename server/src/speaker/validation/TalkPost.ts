import { body } from 'express-validator'

const falsy = { checkFalsy: true }

function isArrayOfString(value: Array<string>) {
  if (!value.every((val) => typeof val === 'string')) {
    throw new Error('Not an array of string')
  }
  return true
}

export const TalkPost = [
  body('title').trim().notEmpty().isString(),
  body('abstract').trim().notEmpty().isString(),
  body('level').trim().optional(falsy).isString(),
  body('languages').isArray().custom(isArrayOfString).optional(falsy),
  body('references').trim().optional(falsy).isString(),
]
