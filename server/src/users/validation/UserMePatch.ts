import { body } from 'express-validator'

const falsy = { checkFalsy: true }

export const UserMePatch = [
  body('email').trim().optional(falsy).isEmail().normalizeEmail(),
  body('name').trim().optional(falsy).isString(),
  body('bio').trim().optional(falsy).isString(),
  body('photoURL').trim().optional(falsy).isURL(),
  body('betaAccess').trim().optional(falsy).isString(),
  body('github').trim().optional(falsy).isString(),
  body('company').trim().optional(falsy).isString(),
  body('references').trim().optional(falsy).isString(),
  body('twitter').trim().optional(falsy).isString(),
  body('address').trim().optional(falsy).isString(),
  body('lat').trim().optional(falsy).toFloat().isNumeric(),
  body('lng').trim().optional(falsy).toFloat().isNumeric(),
  body('timezone').trim().optional(falsy).isString(),
]
