import firebase from 'firebase/app'

import crud from './crud'

const organizationCrud = crud('organizations', 'id')

export const fetchUserOrganizations = (uid) => firebase
  .firestore()
  .collection('organizations')
  .where(`members.${uid}`, '==', true)
  .get()

export const fetchOrganizationEvents = (organizationId) => firebase
  .firestore()
  .collection('events')
  .where('organization', '==', organizationId)
  .get()

export default organizationCrud
