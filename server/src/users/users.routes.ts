import * as express from 'express'
import { validate } from '../middleware/validation'
import { checkIfAuthenticated } from '../middleware/firebase-auth'
import { handler } from '../middleware/handler'
import * as usersController from './users.controller'
import { UserMePatch } from './validation/UserMePatch'
import { SearchUsersCriterias } from './validation/SearchUsersCriterias'
import { body } from 'express-validator'

const router = express.Router()

router.get('/me', checkIfAuthenticated, handler(usersController.getAuthenticatedUser))

router.post('/me', checkIfAuthenticated, handler(usersController.createAuthenticatedUser))

router.patch(
  '/me',
  checkIfAuthenticated,
  validate(UserMePatch),
  handler(usersController.updateAuthenticatedUser),
)

router.patch(
  '/me/beta',
  checkIfAuthenticated,
  validate([body('key').isString()]),
  handler(usersController.validateBetaAccess),
)

router.get(
  '/',
  checkIfAuthenticated,
  validate(SearchUsersCriterias),
  handler(usersController.searchUsers),
)

export default router
