const {
  flow, pick, map, assign, flatMap, uniq, zipObject,
} = require('lodash/fp')

const { getUsers } = require('./user')
const { getEventProposals } = require('./proposal')

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

const exportEventData = async (event, uid, filters = {}, attributes = {}) => {
  const eventAttributes = pickEventAttrs(attributes.event)
  const proposalAttributes = pickProposalAttrs(attributes.proposal)
  const speakerAttributes = pickSpeakerAttrs(attributes.speaker)

  const talks = await getEventProposals(event.id, uid, filters).then(proposalAttributes)

  const speakerUids = getUids(talks)
  const speakers = await getUsers(speakerUids).then(speakerAttributes)

  return flow(
    zipObject(['talks', 'speakers']),
    assign(eventAttributes(event)),
  )([talks, speakers])
}

module.exports = {
  exportEventData,
}
