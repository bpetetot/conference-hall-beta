import * as express from 'express'
import { validate } from '../middleware/validation'
import { checkIfAuthenticated } from '../middleware/firebase-auth'
import { handler } from '../middleware/handler'
import * as invitesController from './invites.controller'
import { param } from 'express-validator'

const router = express.Router()

router.get(
  '/:inviteUuid',
  checkIfAuthenticated,
  validate([param('inviteUuid').trim().notEmpty().isString()]),
  handler(invitesController.getInvitationInfo),
)

router.put(
  '/:inviteUuid/validate',
  checkIfAuthenticated,
  validate([param('inviteUuid').trim().notEmpty().isString()]),
  handler(invitesController.validateInvitation),
)

export default router
