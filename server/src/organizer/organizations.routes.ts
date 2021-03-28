import * as express from 'express'
import { validate } from '../middleware/validation'
import { checkIfAuthenticated } from '../middleware/firebase-auth'
import { handler } from '../middleware/handler'
import * as organizationsController from './organizations.controller'
import { body, param } from 'express-validator'

const router = express.Router()

router.get('/', checkIfAuthenticated, handler(organizationsController.findOrganizations))

router.post(
  '/',
  checkIfAuthenticated,
  validate([body('name').trim().notEmpty().isString()]),
  handler(organizationsController.createOrganization),
)

router.get(
  '/:id',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric()]),
  handler(organizationsController.getOrganization),
)

router.patch(
  '/:id',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric(), body('name').trim().notEmpty().isString()]),
  handler(organizationsController.updateOrganization),
)

router.get(
  '/:id/members',
  checkIfAuthenticated,
  handler(organizationsController.findOrganizationMembers),
)

router.post(
  '/:id/members/:memberId',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric(), param('memberId').notEmpty().isNumeric()]),
  handler(organizationsController.addMember),
)

router.patch(
  '/:id/members/:memberId',
  checkIfAuthenticated,
  validate([
    param('id').notEmpty().isNumeric(),
    param('memberId').notEmpty().isNumeric(),
    body('role').trim().notEmpty().isIn(['OWNER', 'MEMBER', 'REVIEWER']),
  ]),
  handler(organizationsController.updateMember),
)

router.delete(
  '/:id/members/:memberId',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric(), param('memberId').notEmpty().isNumeric()]),
  handler(organizationsController.deleteMember),
)

router.get(
  '/:id/invite',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric()]),
  handler(organizationsController.getTalkInvitation),
)

router.post(
  '/:id/invite',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric()]),
  handler(organizationsController.createInvitationLink),
)

router.delete(
  '/:id/invite',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric()]),
  handler(organizationsController.revokeInvitationLink),
)

export default router
