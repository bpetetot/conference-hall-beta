import express from 'express'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import config from './config'
import users from './users/users.routes'
import emails from './emails/email.routes'
import invites from './invites/invites.routes'
import events from './events/events.routes'
import speakerTalks from './speaker/talks.routes'
import speakerEvents from './speaker/events.routes'
import organizerEvents from './organizer/events.routes'
import organizerOrganizations from './organizer/organizations.routes'
import { errorHandler } from './middleware/error'

const app = express()

if (!config.isTest) {
  app.use(morgan('dev'))
}

app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', users)
app.use('/api/events', events)
app.use('/api/emails', emails)
app.use('/api/invites', invites)
app.use('/api/speaker/talks', speakerTalks)
app.use('/api/speaker/events', speakerEvents)
app.use('/api/organizer/events', organizerEvents)
app.use('/api/organizer/organizations', organizerOrganizations)

app.use(errorHandler)

if (config.isProduction) {
  const client = path.resolve(__dirname, '../../webapp/build')
  app.use(express.static(client))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(client, 'index.html'))
  })
}

export default app
