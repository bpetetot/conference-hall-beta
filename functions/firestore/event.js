const admin = require('firebase-admin')
const { union } = require('lodash')

const { getUsers } = require('./user')
const { getOrganization } = require('./organization')

const getEvent = eventId => admin
  .firestore()
  .collection('events')
  .doc(eventId)
  .get()
  .then(doc => doc.data())

const getEventSettings = eventId => admin
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('settings')
  .doc(eventId)
  .get()
  .then(doc => doc.data())

const getEventProposals = (eventId, state) => {
  let query = admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')

  if (state) {
    query = query.where('state', '==', state)
  }

  return query
    .get()
    .then(result => result.docs.map(ref => Object.assign({ id: ref.id }, ref.data())))
}

const getEventOrganizers = async (event) => {
  const { owner, organization } = event
  let organizerUids = [owner]
  if (organization) {
    const { members } = await getOrganization(organization)
    organizerUids = union(Object.keys(members), organizerUids)
  }
  return getUsers(organizerUids)
}

module.exports = {
  getEvent,
  getEventSettings,
  getEventProposals,
  getEventOrganizers,
}
