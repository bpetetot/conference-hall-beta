import { body } from 'express-validator'

const falsy = { checkFalsy: true }

export const EventPost = [
  body('name').trim().notEmpty().isString(),
  body('description').trim().notEmpty().isString(),
  body('type').trim().notEmpty().isIn(['CONFERENCE', 'MEETUP']),
  body('visibility').trim().notEmpty().isIn(['PUBLIC', 'PRIVATE']),
  body('address').trim().optional(falsy).isString(),
  body('lat').trim().optional(falsy).toFloat().isNumeric(),
  body('lng').trim().optional(falsy).toFloat().isNumeric(),
  body('timezone').trim().optional(falsy).isString(),
  body('contact').trim().optional(falsy).isEmail(),
  body('website').trim().optional(falsy).isURL(),
  body('conferenceStart').trim().optional(falsy).toDate(),
  body('conferenceEnd').trim().optional(falsy).toDate(),
  body('organizationId').trim().optional(falsy).toInt().isNumeric(),
]
