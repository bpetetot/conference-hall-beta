import { body, param } from 'express-validator'

const falsy = { checkFalsy: true }

export const CategoryPatch = [
  param('eventId').notEmpty().isNumeric().toInt(),
  param('categoryId').notEmpty().isNumeric().toInt(),
  body('name').trim().optional(falsy).isString(),
  body('description').trim().optional(falsy).isString(),
]
