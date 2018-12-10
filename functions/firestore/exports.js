const {
  flow, pick, map, assign, flatMap, uniq, zipObject,
} = require('lodash/fp')

const { getUsers } = require('./user')
const { getEventProposals } = require('./event')

const pickEventAttrs = (attributes = []) => pick(attributes)

const pickProposalAttrs = (attributes = []) => flow(
  map(pick(attributes)),
  map(talk => assign(talk, { speakers: Object.keys(talk.speakers) })),
)

const pickSpeakerAttrs = (attributes = []) => map(pick(attributes))

const getUids = flow(
  flatMap('speakers'),
  uniq,
)

const exportEventData = (event, filters = {}, attributes = {}) => {
  const eventAttributes = pickEventAttrs(attributes.event)
  const proposalAttributes = pickProposalAttrs(attributes.proposal)
  const speakerAttributes = pickSpeakerAttrs(attributes.speaker)

  const talks = getEventProposals(event.id, filters.state).then(proposalAttributes)

  const speakers = talks
    .then(getUids)
    .then(getUsers)
    .then(speakerAttributes)

  return Promise.all([talks, speakers])
    .then(zipObject(['talks', 'speakers']))
    .then(assign(eventAttributes(event)))
}

module.exports = {
  exportEventData,
}
