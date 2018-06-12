/* eslint-disable comma-dangle,no-console */
const {
  flow,
  pick,
  map,
  assign,
  flatMap,
  uniq,
  zipObject,
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
  const talks = getEventProposals(eventId).then(sanitizeProposals)
  const speakers = talks.then(getUids).then(getUsers).then(sanitizeSpeakers)

  Promise.all([talks, speakers])
    .then(zipObject(['talks', 'speakers']))
    .then(assign(event))
    .then(result => res.send(result))
    .catch((error) => {
      console.error(error)
      res.status(500).end()
    })
}
