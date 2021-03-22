import * as express from 'express'
import { handler } from '../middleware/handler'
import * as emailController from './email.controller'

const router = express.Router()

router.post('/delivered', handler(emailController.onEmailDelivered))

export default router
