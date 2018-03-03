import firebase from 'firebase/app'
import { set } from 'immutadot'

import crud from './crud'
import userCrud from './user'

const organizationCrud = crud('organizations', 'id')

export const createOrganization = async (organization, uid) => {
  const db = firebase.firestore()
  const batch = db.batch()

  const { organizationId } = await organizationCrud.create(organization)

  // FIXME: https://github.com/bpetetot/conference-hall/issues/167
  const organizationRef = await organizationCrud.read(organizationId)
  const updatedOrganization = { id: organizationRef.id, ...organizationRef.data() }
  organizationCrud.update(updatedOrganization)

  const userRef = await userCrud.read(uid)
  const updatedUser = set(userRef.data(), `organizations.${organizationId}`, true)
  await userCrud.update(updatedUser)

  await batch.commit()

  return [updatedOrganization, updatedUser]
}

export default organizationCrud
