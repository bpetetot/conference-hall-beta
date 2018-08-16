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
const { getSurveys } = require('../../firestore/survey')

const sanitizeEvent = pick(['id', 'name', 'categories', 'formats'])

const sanitizeProposals = flow(
  map(pick(['id', 'title', 'level', 'abstract', 'categories', 'formats', 'speakers', 'comments'])),
  map(talk => assign(talk, { speakers: Object.keys(talk.speakers) }))
)

const sanitizeSpeakers = map(pick(['uid', 'displayName', 'bio', 'company', 'photoURL', 'twitter', 'github', 'email', 'phone']))

const getUids = flow(flatMap('speakers'), uniq)

module.exports = (req, res) => {
  const { state = 'accepted' } = req.query
  const { eventId } = req.params

  const event = sanitizeEvent(res.locals.event)
  const talks = getEventProposals(eventId, state).then(sanitizeProposals)
  const speakers = talks.then(getUids).then(getUsers).then(sanitizeSpeakers)
  const surveys = getSurveys(eventId)

  Promise.all([talks, speakers, surveys])
    .then(zipObject(['talks', 'speakers', 'surveys']))
    .then(assign(event))
    .then(result => res.send(result))
    .catch((error) => {
      console.error(error)
      res.status(500).end()
    })
}
