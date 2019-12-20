import firebase from 'firebase/app'

import crud from './crud'

const organizationCrud = crud('organizations', 'id')

export const ROLES = {
  OWNER: 'owner',
  MEMBER: 'member',
  REVIEWER: 'reviewer',
}

export const fetchUserOrganizations = uid =>
  firebase
    .firestore()
    .collection('organizations')
    .where(`members.${uid}`, 'in', Object.values(ROLES))
    .get()
    .then(result => result.docs.map(ref => ({ id: ref.id, ...ref.data() })))

export const fetchOrganizationEvents = organizationId =>
  firebase
    .firestore()
    .collection('events')
    .where('organization', '==', organizationId)
    .get()

export default organizationCrud
