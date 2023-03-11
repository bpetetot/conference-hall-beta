import firebase from 'firebase/compat/app'
import crud from './crud'

/**
 * Return the invite for a given entity type and id
 * @param {string} entity entity type (talk or organisation)
 * @param {string} entityId id of the talk or the organisation
 */
export const fetchInviteByType = (entity, entityId) =>
  firebase
    .firestore()
    .collection('invites')
    .where('entity', '==', entity)
    .where('entityId', '==', entityId)
    .get()

export default crud('invites', 'id')
