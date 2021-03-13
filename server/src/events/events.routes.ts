import * as express from 'express'
import { param } from 'express-validator'
import { validate } from '../middleware/validation'
import { handler } from '../middleware/handler'
import * as eventsController from './events.controller'

const router = express.Router()

router.get(
  '/:id',
  validate([param('id').notEmpty().isNumeric()]),
  handler(eventsController.getEvent),
)

export default router
