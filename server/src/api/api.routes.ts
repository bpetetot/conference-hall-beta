import * as express from 'express'
import { param, query } from 'express-validator'
import { validate } from '../middleware/validation'
import { handler } from '../middleware/handler'
import * as apiController from './api.controller'

const router = express.Router()

router.get(
  '/event/:id',
  validate([param('id').notEmpty().isNumeric(), query('key').notEmpty().isString()]),
  handler(apiController.exportEventData),
)

export default router
