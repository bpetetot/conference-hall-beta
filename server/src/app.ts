import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import config from './config'
import users from './users/users.routes'
import events from './events/events.routes'
import speakerTalks from './speaker/talks.routes'
import speakerEvents from './speaker/events.routes'
import organizerEvents from './organizer/events.routes'
import organizerOrganizations from './organizer/organizations.routes'
import { errorHandler } from './middleware/error'

const app = express()

if (config.ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', users)
app.use('/api/events', events)
app.use('/api/speaker/talks', speakerTalks)
app.use('/api/speaker/events', speakerEvents)
app.use('/api/organizer/events', organizerEvents)
app.use('/api/organizer/organizations', organizerOrganizations)

app.use(errorHandler)

export default app
