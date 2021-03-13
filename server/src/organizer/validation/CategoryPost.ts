import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

export const CategoryPost = [
  param('eventId').notEmpty().isNumeric().toInt(),
  body('name').trim().notEmpty().isString(),
  body('description').trim().optional(falsy).isString(),
]
