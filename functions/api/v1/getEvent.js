/* eslint-disable comma-dangle,no-console */
const {
  flow,
  pick,
  map,
  assign,
  flatMap,
  uniq
} = require('lodash/fp')

const { getEventProposals } = require('../../firestore/event')
const { getUsers } = require('../../firestore/user')

const sanitizeEvent = pick(['id', 'name', 'categories', 'formats'])

const sanitizeProposals = flow(
  map(pick(['id', 'title', 'level', 'abstract', 'categories', 'formats', 'speakers'])),
  map(talk => assign(talk, { speakers: Object.keys(talk.speakers) }))
)

const sanitizeSpeakers = map(pick(['uid', 'displayName', 'bio', 'company', 'photoURL', 'twitter', 'github']))

const getUids = flow(flatMap('speakers'), uniq)

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
