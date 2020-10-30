import firebase from 'firebase/app'
import { organizationConverter } from 'models/Organization'

import { ROLES } from './constants'
import crud from './crud'

const organizationCrud = crud('organizations', 'id', organizationConverter)

export const fetchUserOrganizations = async (uid) => {
  const result = await firebase
    .firestore()
    .collection('organizations')
    .where(`members.${uid}`, 'in', Object.values(ROLES))
    .withConverter(organizationConverter)
    .get()
  return result.docs.map((doc) => doc.data())
}

export default organizationCrud
