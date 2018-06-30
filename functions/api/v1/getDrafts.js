/* eslint-disable comma-dangle,no-console */
const {
  flow,
  pick,
  map,
  assign,
  differenceBy,
  flatMap,
  uniq
} = require('lodash/fp')

const { getEventProposals } = require('../../firestore/event')
const { getAllTalks } = require('../../firestore/talk')
const { getUsers } = require('../../firestore/user')

const sanitizeTalk = flow(
  map(pick(['id', 'title', 'speakers'])),
  map(talk => assign(talk, { speakers: Object.keys(talk.speakers) }))
)

const sanitizeSpeakers = map(pick(['uid', 'displayName', 'email', 'twitter', 'github', 'company']))

const getUids = flow(flatMap('speakers'), uniq)

const getSpeakersById = (ids, speakers) => {
  console.log(ids, speakers)
  return speakers.filter(s => ids.includes(s.uid))
}

module.exports = (req, res) => {
  const { eventId } = req.params
  const proposals = getEventProposals(eventId).then(sanitizeTalk)
  const talks = getAllTalks().then(sanitizeTalk)

  const drafts = Promise.all([proposals, talks])
    .then(all => differenceBy('id', all[1], all[0]))

  const speakers = drafts.then(getUids).then(getUsers).then(sanitizeSpeakers)

  Promise.all([drafts, speakers])
    .then(([dr, sp]) => dr.map(d => Object.assign(
      d,
      { speakers: getSpeakersById(d.speakers, sp) }
    )))
    .then(result => res.send(result))
    .catch((error) => {
      console.error(error)
      res.status(500).end()
    })
}
