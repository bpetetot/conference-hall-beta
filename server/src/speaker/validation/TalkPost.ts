import { body } from 'express-validator'

const falsy = { checkFalsy: true }

export const TalkPost = [
  body('title').trim().notEmpty().isString(),
  body('abstract').trim().notEmpty().isString(),
  body('level').trim().optional(falsy).isString(),
  body('language').trim().optional(falsy).isString(),
  body('references').trim().optional(falsy).isString(),
]
