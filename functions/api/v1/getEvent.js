/* eslint-disable comma-dangle,no-console */
const _ = require('lodash/fp')
const { getEventProposals } = require('../../firestore/event')
const { getUsers } = require('../../firestore/user')

const sanitizeEvent = _.pick(['id', 'name', 'categories', 'formats'])

const sanitizeProposals = _.flow(
  _.map(_.pick(['id', 'title', 'level', 'abstract', 'categories', 'formats', 'speakers'])),
  _.map(talk => _.assign(talk, { speakers: Object.keys(talk.speakers) }))
)

const sanitizeSpeakers = _.map(_.pick(['uid', 'displayName', 'bio', 'company', 'photoURL', 'twitter', 'github']))

const getUids = _.flow(_.flatMap('speakers'), _.uniq)

module.exports = (req, res) => {
  const { eventId } = req.params
  const event = sanitizeEvent(res.locals.event)

  getEventProposals(eventId)
    // talks
    .then(sanitizeProposals)
    .then((talks) => { event.talks = talks })
    // speakers
    .then(() => getUids(event.talks))
    .then(getUsers)
    .then(sanitizeSpeakers)
    .then((speakers) => { event.speakers = speakers })
    // response
    .then(() => res.send(event))
    // error
    .catch((error) => {
      console.error(error)
      res.status(500).end()
    })
}
