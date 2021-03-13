import * as express from 'express'
import { body, param } from 'express-validator'
import { validate } from '../middleware/validation'
import { checkIfAuthenticated } from '../middleware/firebase-auth'
import { handler, rawHandler } from '../middleware/handler'
import * as eventsController from './events.controller'
import { EventPost } from './validation/EventPost'
import { EventPatch } from './validation/EventPatch'
import { FormatPost } from './validation/FormatPost'
import { FormatPatch } from './validation/FormatPatch'
import { CategoryPost } from './validation/CategoryPost'
import { CategoryPatch } from './validation/CategoryPatch'
import { SearchProposalGet } from './validation/SearchProposalGet'
import { ProposalPatch } from './validation/ProposalPatch'
import { ProposalRatePut } from './validation/ProposalRatePut'
import { ExportProposalsPost } from './validation/ExportProposalsPost'
import { ProposalsPatch } from './validation/ProposalsPatch'

const router = express.Router()

router.get('/', checkIfAuthenticated, handler(eventsController.findUserEvents))

router.post('/', checkIfAuthenticated, validate(EventPost), handler(eventsController.createEvent))

router.get(
  '/:eventId',
  checkIfAuthenticated,
  validate([param('eventId').notEmpty().isNumeric().toInt()]),
  handler(eventsController.findUserEvent),
)

router.patch(
  '/:eventId',
  checkIfAuthenticated,
  validate(EventPatch),
  handler(eventsController.updateEvent),
)

router.post(
  '/:eventId/formats',
  checkIfAuthenticated,
  validate(FormatPost),
  handler(eventsController.addEventFormat),
)

router.patch(
  '/:eventId/formats/:formatId',
  checkIfAuthenticated,
  validate(FormatPatch),
  handler(eventsController.updateEventFormat),
)

router.delete(
  '/:eventId/formats/:formatId',
  checkIfAuthenticated,
  validate([
    param('eventId').notEmpty().isNumeric().toInt(),
    param('formatId').notEmpty().isNumeric().toInt(),
  ]),
  handler(eventsController.removeEventFormat),
)

router.post(
  '/:eventId/categories',
  checkIfAuthenticated,
  validate(CategoryPost),
  handler(eventsController.addEventCategory),
)

router.patch(
  '/:eventId/categories/:categoryId',
  checkIfAuthenticated,
  validate(CategoryPatch),
  handler(eventsController.updateEventCategory),
)

router.delete(
  '/:eventId/categories/:categoryId',
  checkIfAuthenticated,
  validate([
    param('eventId').notEmpty().isNumeric().toInt(),
    param('categoryId').notEmpty().isNumeric().toInt(),
  ]),
  handler(eventsController.removeEventCategory),
)

router.get(
  '/:eventId/proposals',
  checkIfAuthenticated,
  validate(SearchProposalGet),
  handler(eventsController.searchProposals),
)

router.patch(
  '/:eventId/proposals',
  checkIfAuthenticated,
  validate(ProposalsPatch),
  handler(eventsController.batchUpdateProposals),
)

router.post(
  '/:eventId/proposals/export',
  checkIfAuthenticated,
  validate(ExportProposalsPost),
  rawHandler(eventsController.exportProposals),
)

router.patch(
  '/:eventId/proposals/:proposalId',
  checkIfAuthenticated,
  validate(ProposalPatch),
  handler(eventsController.updateProposal),
)

router.put(
  '/:eventId/proposals/:proposalId/rate',
  checkIfAuthenticated,
  validate(ProposalRatePut),
  handler(eventsController.rateProposal),
)

router.get(
  '/:eventId/speakers/:speakerId/survey',
  checkIfAuthenticated,
  validate([
    param('eventId').notEmpty().isNumeric().toInt(),
    param('speakerId').notEmpty().isNumeric().toInt(),
  ]),
  handler(eventsController.getSpeakerSurvey),
)

router.get(
  '/:eventId/proposals/:proposalId/messages',
  checkIfAuthenticated,
  validate([
    param('eventId').notEmpty().isNumeric().toInt(),
    param('proposalId').notEmpty().isNumeric().toInt(),
  ]),
  handler(eventsController.findProposalMessages),
)

router.post(
  '/:eventId/proposals/:proposalId/messages',
  checkIfAuthenticated,
  validate([
    param('eventId').notEmpty().isNumeric().toInt(),
    param('proposalId').notEmpty().isNumeric().toInt(),
    body('message').notEmpty().isString(),
  ]),
  handler(eventsController.createProposalMessage),
)

router.patch(
  '/:eventId/proposals/:proposalId/messages/:messageId',
  checkIfAuthenticated,
  validate([
    param('eventId').notEmpty().isNumeric().toInt(),
    param('proposalId').notEmpty().isNumeric().toInt(),
    param('messageId').notEmpty().isNumeric().toInt(),
    body('message').notEmpty().isString(),
  ]),
  handler(eventsController.updateProposalMessage),
)

router.delete(
  '/:eventId/proposals/:proposalId/messages/:messageId',
  checkIfAuthenticated,
  validate([
    param('eventId').notEmpty().isNumeric().toInt(),
    param('proposalId').notEmpty().isNumeric().toInt(),
    param('messageId').notEmpty().isNumeric().toInt(),
  ]),
  handler(eventsController.deleteProposalMessage),
)

export default router
