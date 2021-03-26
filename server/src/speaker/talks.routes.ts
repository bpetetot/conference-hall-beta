import * as express from 'express'
import { validate } from '../middleware/validation'
import { checkIfAuthenticated } from '../middleware/firebase-auth'
import { handler } from '../middleware/handler'
import * as talksController from './talks.controller'
import { TalkPost } from './validation/TalkPost'
import { TalkPatch } from './validation/TalkPatch'
import { body, param } from 'express-validator'
import { TalkSubmitPut } from './validation/TalkSubmitPut'

const router = express.Router()

router.get('/', checkIfAuthenticated, handler(talksController.findUserTalks))

router.post('/', checkIfAuthenticated, validate(TalkPost), handler(talksController.createTalk))

router.get(
  '/:id',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric()]),
  handler(talksController.getTalk),
)

router.patch('/:id', checkIfAuthenticated, validate(TalkPatch), handler(talksController.updateTalk))

router.delete(
  '/:id',
  checkIfAuthenticated,
  validate([param('id').notEmpty().isNumeric()]),
  handler(talksController.deleteTalk),
)

router.post(
  '/:talkId/speakers/:speakerId',
  checkIfAuthenticated,
  validate([param('talkId').notEmpty().isNumeric(), param('speakerId').notEmpty().isNumeric()]),
  handler(talksController.addSpeakerToTalk),
)

router.delete(
  '/:talkId/speakers/:speakerId',
  checkIfAuthenticated,
  validate([param('talkId').notEmpty().isNumeric(), param('speakerId').notEmpty().isNumeric()]),
  handler(talksController.removeSpeakerFromTalk),
)

router.put(
  '/:talkId/submit/:eventId',
  checkIfAuthenticated,
  validate(TalkSubmitPut),
  handler(talksController.submitTalk),
)

router.put(
  '/:talkId/unsubmit/:eventId',
  checkIfAuthenticated,
  validate([param('talkId').notEmpty().isNumeric(), param('eventId').notEmpty().isNumeric()]),
  handler(talksController.unsubmitTalk),
)

router.put(
  '/:talkId/confirm/:eventId',
  checkIfAuthenticated,
  validate([
    param('talkId').notEmpty().isNumeric(),
    param('eventId').notEmpty().isNumeric(),
    body('confirmed').notEmpty().isBoolean().toBoolean(),
  ]),
  handler(talksController.confirmTalk),
)

export default router
