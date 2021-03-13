import * as express from 'express'
import { body, param } from 'express-validator'
import { handler } from '../middleware/handler'
import { checkIfAuthenticated } from '../middleware/firebase-auth'
import { validate } from '../middleware/validation'
import * as eventsController from './events.controller'

const router = express.Router()

router.get('/', checkIfAuthenticated, handler(eventsController.searchEvents))

router.get(
  '/:eventId/proposals',
  checkIfAuthenticated,
  validate([param('eventId').notEmpty().isNumeric()]),
  handler(eventsController.getEventProposalsForSpeaker),
)

router.get(
  '/:eventId/survey',
  checkIfAuthenticated,
  validate([param('eventId').notEmpty().isNumeric()]),
  handler(eventsController.getEventSurvey),
)

router.post(
  '/:eventId/survey',
  checkIfAuthenticated,
  validate([param('eventId').notEmpty().isNumeric(), body('answers').notEmpty()]),
  handler(eventsController.saveEventSurvey),
)

export default router
